
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  CrossformsHeader,
  CrossformsDataInput,
  CrossformsActionButtons,
  CrossformsParsedDataDisplay,
  CrossformsProgressDisplay,
  CrossformsResultDisplay
} from './crossforms';

interface MySQLCrossformRecord {
  crossformid: string;
  form: number;
  aspect: string;
}

export const CrossformsImportSection: React.FC = () => {
  const [sqlData, setSqlData] = useState('');
  const [parsedRecords, setParsedRecords] = useState<MySQLCrossformRecord[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importResult, setImportResult] = useState<{
    success: number;
    errors: number;
    skipped: number;
    errorMessages: string[];
  } | null>(null);
  const { toast } = useToast();

  const parseCrossformsSQL = (sqlData: string): MySQLCrossformRecord[] => {
    const records: MySQLCrossformRecord[] = [];
    
    console.log('🔍 Starting to parse crossforms SQL data...');
    console.log('Raw SQL data preview:', sqlData.substring(0, 500));
    
    // Extract VALUES section more flexibly
    const valuesMatch = sqlData.match(/VALUES\s+([\s\S]*?)(?:;|\s*$)/i);
    
    if (!valuesMatch) {
      console.error('❌ No VALUES section found in SQL data');
      throw new Error('No VALUES section found in SQL data');
    }
    
    const valuesSection = valuesMatch[1];
    console.log('✅ Found VALUES section, length:', valuesSection.length);
    
    // More robust regex to find all value tuples
    const tupleRegex = /\(\s*X'([A-F0-9]{32})'\s*,\s*(\d+)\s*,\s*'([^']+)'\s*\)/gi;
    let match;
    let recordCount = 0;
    
    while ((match = tupleRegex.exec(valuesSection)) !== null) {
      const [, hexCrossformId, formStr, aspect] = match;
      
      console.log(`📝 Processing record ${recordCount + 1}:`, {
        hexCrossformId: hexCrossformId.substring(0, 16) + '...',
        form: formStr,
        aspect
      });
      
      // Validate hex ID length (should be 32 hex chars = 16 bytes)
      if (hexCrossformId.length !== 32) {
        console.warn(`⚠️ Invalid hex ID length: ${hexCrossformId.length}, expected 32`);
        continue;
      }
      
      // Convert MySQL hex to PostgreSQL UUID format
      const crossformUuid = [
        hexCrossformId.substring(0, 8),
        hexCrossformId.substring(8, 12),
        hexCrossformId.substring(12, 16),
        hexCrossformId.substring(16, 20),
        hexCrossformId.substring(20, 32)
      ].join('-').toLowerCase();
      
      const form = parseInt(formStr, 10);
      
      // Validate form number
      if (isNaN(form) || form < 1) {
        console.warn(`⚠️ Invalid form number: ${formStr}`);
        continue;
      }
      
      // Validate aspect
      if (!aspect || aspect.trim().length === 0) {
        console.warn(`⚠️ Empty aspect`);
        continue;
      }
      
      records.push({
        crossformid: crossformUuid,
        form: form,
        aspect: aspect.trim()
      });
      
      recordCount++;
      console.log(`✅ Added record ${recordCount}: Form ${form}, Aspect "${aspect}" (${crossformUuid.substring(0, 8)}...)`);
    }
    
    console.log(`🎉 Successfully parsed ${records.length} crossform records`);
    
    if (records.length === 0) {
      throw new Error('No valid records found in the provided data. Please check the format.');
    }
    
    return records;
  };

  const importCrossformRecords = async (records: MySQLCrossformRecord[]): Promise<{
    success: number;
    errors: number;
    skipped: number;
    errorMessages: string[];
  }> => {
    console.log(`🚀 Starting import of ${records.length} crossform records...`);
    
    let success = 0;
    let errors = 0;
    let skipped = 0;
    const errorMessages: string[] = [];
    
    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      
      try {
        console.log(`📥 Processing crossform ${i + 1}/${records.length}: ${record.crossformid.substring(0, 8)}... - Form ${record.form}, Aspect "${record.aspect}"`);
        
        // Prepare crossform data for import
        const crossformData = {
          crossformid: record.crossformid,
          form: record.form,
          aspect: record.aspect
        };
        
        console.log(`💾 Inserting crossform:`, crossformData);
        
        // Insert into crossforms table
        const { data, error } = await supabase
          .from('crossforms')
          .insert(crossformData)
          .select();
        
        if (error) {
          console.error(`❌ Error inserting crossform:`, error);
          if (error.code === '23505') {
            skipped++;
            errorMessages.push(`Crossform "${record.crossformid.substring(0, 12)}...": Already exists (skipped)`);
            console.log(`⏭️ Skipped duplicate: ${record.crossformid.substring(0, 8)}...`);
          } else {
            errors++;
            errorMessages.push(`Crossform "${record.crossformid.substring(0, 12)}...": ${error.message}`);
            console.error(`💥 Error details:`, error);
          }
        } else {
          console.log(`✅ Successfully imported crossform: ${record.crossformid.substring(0, 8)}... - Form ${record.form}`);
          console.log(`📊 Inserted data:`, data);
          success++;
        }
        
        // Update progress
        const currentProgress = ((success + errors + skipped) / records.length) * 100;
        setImportProgress(currentProgress);
        
      } catch (error) {
        console.error(`💥 Exception processing crossform:`, error);
        errors++;
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        errorMessages.push(`Crossform "${record.crossformid.substring(0, 12)}...": ${errorMsg}`);
      }
    }
    
    console.log(`🏁 Import completed: ${success} successful, ${errors} errors, ${skipped} skipped`);
    
    return {
      success,
      errors,
      skipped,
      errorMessages
    };
  };

  const handleParseSql = () => {
    try {
      console.log('🎯 Starting SQL parsing...');
      const records = parseCrossformsSQL(sqlData);
      setParsedRecords(records);
      
      toast({
        title: "SQL parsad framgångsrikt",
        description: `Hittade ${records.length} korsformer att importera`,
      });
    } catch (error) {
      console.error('💥 Error parsing SQL:', error);
      toast({
        title: "Fel vid parsning av SQL",
        description: error instanceof Error ? error.message : 'Okänt fel',
        variant: "destructive"
      });
    }
  };

  const handleImportRecords = async () => {
    if (parsedRecords.length === 0) {
      toast({
        title: "Ingen data att importera",
        description: "Parsa SQL-data först",
        variant: "destructive"
      });
      return;
    }

    setIsImporting(true);
    setImportProgress(0);
    setImportResult(null);

    try {
      console.log('🚀 Starting import of crossforms data...');
      
      const result = await importCrossformRecords(parsedRecords);
      
      setImportResult(result);
      setImportProgress(100);

      toast({
        title: "Import slutförd",
        description: `${result.success} importerade, ${result.errors} fel, ${result.skipped} överhoppade`,
        variant: result.errors > 0 ? "destructive" : "default"
      });

    } catch (error) {
      console.error('💥 Import error:', error);
      toast({
        title: "Importfel",
        description: error instanceof Error ? error.message : 'Okänt fel',
        variant: "destructive"
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CrossformsHeader />
      
      <CardContent className="space-y-4">
        <CrossformsDataInput
          sqlData={sqlData}
          setSqlData={setSqlData}
          isImporting={isImporting}
        />

        <CrossformsActionButtons
          sqlData={sqlData}
          parsedRecordsLength={parsedRecords.length}
          isImporting={isImporting}
          onParseSql={handleParseSql}
          onImportRecords={handleImportRecords}
        />

        <CrossformsParsedDataDisplay parsedRecords={parsedRecords} />

        <CrossformsProgressDisplay
          isImporting={isImporting}
          importProgress={importProgress}
        />

        <CrossformsResultDisplay importResult={importResult} />
      </CardContent>
    </Card>
  );
};
