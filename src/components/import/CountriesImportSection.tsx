
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Globe, Upload, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface MySQLCountryRecord {
  countryid: string;
  country_code: string;
  country_sv: string;
  country_en: string;
}

export const CountriesImportSection: React.FC = () => {
  const [sqlData, setSqlData] = useState('');
  const [parsedRecords, setParsedRecords] = useState<MySQLCountryRecord[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importResult, setImportResult] = useState<{
    success: number;
    errors: number;
    skipped: number;
    errorMessages: string[];
  } | null>(null);
  const { toast } = useToast();

  const parseCountriesSQL = (sqlData: string): MySQLCountryRecord[] => {
    const records: MySQLCountryRecord[] = [];
    
    console.log('Parsing countries SQL data...');
    
    // Extract INSERT statements for countries table
    const insertMatch = sqlData.match(/INSERT INTO `countries`.*?VALUES\s*(.*?)(?:;|\n\n|$)/s);
    
    if (!insertMatch) {
      console.warn('No countries INSERT statement found in SQL data');
      return records;
    }
    
    const valuesSection = insertMatch[1];
    console.log('Found VALUES section:', valuesSection.substring(0, 200) + '...');
    
    // Parse individual value tuples for countries format: (X'hex', 'code', 'sv_name', 'en_name')
    const tupleRegex = /\(\s*X'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)'\s*\)/g;
    
    let match;
    while ((match = tupleRegex.exec(valuesSection)) !== null) {
      const [, countryid, country_code, country_sv, country_en] = match;
      
      records.push({
        countryid: `X'${countryid}'`,
        country_code,
        country_sv,
        country_en
      });
    }
    
    console.log(`Parsed ${records.length} country records from SQL data`);
    return records;
  };

  const importCountries = async (records: MySQLCountryRecord[]): Promise<{
    success: number;
    errors: number;
    skipped: number;
    errorMessages: string[];
  }> => {
    console.log(`Starting import of ${records.length} countries...`);
    
    let success = 0;
    let errors = 0;
    let skipped = 0;
    const errorMessages: string[] = [];
    
    for (const record of records) {
      try {
        console.log(`Processing country: ${record.country_sv} (${record.country_code})`);
        
        // Prepare country data for import
        const countryData = {
          countryid: `\\x${record.countryid.replace(/^X'/, '').replace(/'$/, '').toLowerCase()}`,
          country: record.country_sv // Use Swedish name as the primary country field
        };
        
        console.log(`Importing country:`, countryData);
        
        // Insert to countries table
        const { error } = await supabase
          .from('countries')
          .insert(countryData);
        
        if (error) {
          console.error(`Error inserting country:`, error);
          if (error.code === '23505') {
            skipped++;
            errorMessages.push(`Country "${record.country_sv}": Already exists (skipped)`);
          } else {
            errors++;
            errorMessages.push(`Country "${record.country_sv}": ${error.message}`);
          }
        } else {
          console.log(`Successfully imported country: ${record.country_sv}`);
          success++;
        }
        
        // Update progress
        const currentProgress = ((success + errors + skipped) / records.length) * 100;
        setImportProgress(currentProgress);
        
      } catch (error) {
        console.error(`Exception processing country:`, error);
        errors++;
        errorMessages.push(`Country "${record.country_sv}": ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
    
    console.log(`Import completed: ${success} successful, ${errors} errors, ${skipped} skipped`);
    
    return {
      success,
      errors,
      skipped,
      errorMessages
    };
  };

  const handleParseSql = () => {
    try {
      const records = parseCountriesSQL(sqlData);
      setParsedRecords(records);
      
      toast({
        title: "SQL parsad framgångsrikt",
        description: `Hittade ${records.length} länder att importera`,
      });
    } catch (error) {
      console.error('Error parsing SQL:', error);
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
      console.log('🚀 Starting direct import to countries table...');
      
      const result = await importCountries(parsedRecords);
      
      setImportResult(result);
      setImportProgress(100);

      toast({
        title: "Import slutförd",
        description: `${result.success} importerade, ${result.errors} fel, ${result.skipped} överhoppade`,
        variant: result.errors > 0 ? "destructive" : "default"
      });

    } catch (error) {
      console.error('Import error:', error);
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
      <CardHeader>
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-400" />
          <CardTitle className="text-white">Länder Import</CardTitle>
        </div>
        <CardDescription className="text-slate-300">
          Importera länder från MySQL-export
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            MySQL Export Data
          </label>
          <Textarea
            value={sqlData}
            onChange={(e) => setSqlData(e.target.value)}
            placeholder="Klistra in MySQL INSERT statement för countries-tabellen här..."
            className="min-h-[200px] bg-white/10 border-white/20 text-white placeholder-white/50 font-mono text-sm"
            disabled={isImporting}
          />
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleParseSql}
            disabled={!sqlData.trim() || isImporting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Info className="h-4 w-4 mr-2" />
            Parsa SQL
          </Button>

          <Button
            onClick={handleImportRecords}
            disabled={parsedRecords.length === 0 || isImporting}
            className="bg-green-600 hover:bg-green-700"
          >
            <Upload className="h-4 w-4 mr-2" />
            Importera till countries
          </Button>
        </div>

        {parsedRecords.length > 0 && (
          <div className="bg-black/20 rounded p-4">
            <h4 className="text-white font-semibold mb-2">📋 Parsad data:</h4>
            <Badge className="bg-blue-500 text-white border-0 mb-2">
              {parsedRecords.length} länder hittade
            </Badge>
            
            <div className="text-sm text-slate-300 space-y-1 max-h-32 overflow-y-auto">
              {parsedRecords.slice(0, 10).map((record, index) => (
                <div key={index} className="bg-black/30 rounded p-2">
                  <div className="text-blue-400 text-xs">
                    {record.country_code}: {record.country_sv}
                  </div>
                  <div className="text-green-400 text-xs">
                    English: {record.country_en}
                  </div>
                  <div className="text-slate-400 text-xs">
                    ID: {record.countryid.substring(0, 12)}...
                  </div>
                </div>
              ))}
              {parsedRecords.length > 10 && (
                <div className="text-slate-400 text-center">
                  ...och {parsedRecords.length - 10} till
                </div>
              )}
            </div>
          </div>
        )}

        {isImporting && (
          <div className="bg-black/20 rounded p-4">
            <h4 className="text-white font-semibold mb-2">Importerar till countries...</h4>
            <Progress value={importProgress} className="mb-2" />
            <div className="text-sm text-slate-300">
              {Math.round(importProgress)}% slutfört
            </div>
          </div>
        )}

        {importResult && (
          <div className="bg-black/20 rounded p-4">
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Importresultat - countries-tabellen
            </h4>
            
            <div className="grid grid-cols-3 gap-2 mb-3">
              <Badge className="bg-green-500 text-white border-0">
                {importResult.success} lyckade
              </Badge>
              <Badge className="bg-red-500 text-white border-0">
                {importResult.errors} fel
              </Badge>
              <Badge className="bg-yellow-500 text-white border-0">
                {importResult.skipped} överhoppade
              </Badge>
            </div>

            {importResult.errorMessages.length > 0 && (
              <div className="mt-3">
                <h5 className="text-red-400 font-semibold mb-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  Felmeddelanden:
                </h5>
                <div className="text-xs text-red-300 max-h-32 overflow-y-auto space-y-1">
                  {importResult.errorMessages.slice(0, 10).map((msg, index) => (
                    <div key={index} className="bg-red-500/10 rounded p-1">
                      {msg}
                    </div>
                  ))}
                  {importResult.errorMessages.length > 10 && (
                    <div className="text-red-400">
                      ...och {importResult.errorMessages.length - 10} fler fel
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
