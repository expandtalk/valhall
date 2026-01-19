
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Database, Loader2, CheckCircle } from "lucide-react";
import { createSampleFolkGroups } from '@/utils/createSampleFolkGroups';

export const SampleDataButton: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCreateSampleData = async () => {
    setIsCreating(true);
    setIsCompleted(false);
    
    try {
      const result = await createSampleFolkGroups();
      
      if (result.success) {
        setIsCompleted(true);
        
        // Reset completed state after 3 seconds
        setTimeout(() => {
          setIsCompleted(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error creating sample data:', error);
    } finally {
      setIsCreating(false);
    }
  };

  if (isCompleted) {
    return (
      <Button 
        disabled
        className="bg-green-600 text-white"
      >
        <CheckCircle className="h-4 w-4 mr-2" />
        Exempeldata skapat!
      </Button>
    );
  }

  return (
    <Button 
      onClick={handleCreateSampleData}
      disabled={isCreating}
      className="bg-emerald-600 hover:bg-emerald-700 text-white"
    >
      {isCreating ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Skapar exempeldata...
        </>
      ) : (
        <>
          <Database className="h-4 w-4 mr-2" />
          Skapa exempeldata
        </>
      )}
    </Button>
  );
};
