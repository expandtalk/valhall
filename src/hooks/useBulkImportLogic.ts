
import { useToast } from "@/hooks/use-toast";
import { useBulkImportState } from "./import/useBulkImportState";
import { useTestImport } from "./import/useTestImport";
import { useFullImport } from "./import/useFullImport";
import { ImportRateLimiter } from "@/utils/security/inputValidation";

export const useBulkImportLogic = () => {
  const { toast } = useToast();
  
  const {
    importData,
    setImportData,
    sourceDatabase,
    setSourceDatabase,
    isImporting,
    setIsImporting,
    importResult,
    setImportResult,
    settings,
    setSettings,
    lineCount,
    isLargeDataset,
    isVeryLargeDataset
  } = useBulkImportState();

  const { handleTestImport: testImportHandler } = useTestImport();
  const { handleFullImport: fullImportHandler } = useFullImport();

  console.log('useBulkImportLogic: Hook initialized', {
    sourceDatabase,
    importDataLength: importData.length,
    lineCount,
    isLargeDataset,
    isVeryLargeDataset,
    autoResolveEnabled: settings.autoResolveSimpleConflicts
  });

  const handleTestImport = async () => {
    // Check rate limiting for import operations
    const rateLimitCheck = ImportRateLimiter.checkRateLimit('test_import');
    if (!rateLimitCheck.allowed) {
      const resetTime = new Date(rateLimitCheck.resetTime!).toLocaleTimeString();
      toast({
        title: "Rate limit exceeded",
        description: `Too many import attempts. Please try again after ${resetTime}`,
        variant: "destructive"
      });
      return;
    }
    
    await testImportHandler(
      importData,
      sourceDatabase,
      lineCount,
      settings,
      setIsImporting,
      setImportResult
    );
  };

  const handleFullImport = async () => {
    // Check rate limiting for import operations
    const rateLimitCheck = ImportRateLimiter.checkRateLimit('full_import');
    if (!rateLimitCheck.allowed) {
      const resetTime = new Date(rateLimitCheck.resetTime!).toLocaleTimeString();
      toast({
        title: "Rate limit exceeded",
        description: `Too many import attempts. Please try again after ${resetTime}`,
        variant: "destructive"
      });
      return;
    }
    
    await fullImportHandler(
      importData,
      sourceDatabase,
      lineCount,
      settings,
      setIsImporting,
      setImportResult
    );
  };

  // Debug the functions being returned
  console.log('useBulkImportLogic: Returning functions:', {
    handleTestImport: typeof handleTestImport,
    handleFullImport: typeof handleFullImport
  });

  return {
    importData,
    setImportData,
    sourceDatabase,
    setSourceDatabase,
    isImporting,
    importResult,
    settings,
    setSettings,
    lineCount,
    isLargeDataset,
    isVeryLargeDataset,
    handleTestImport,
    handleFullImport
  };
};
