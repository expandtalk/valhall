
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Users, Plus, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { createAdditionalFolkGroups } from '@/utils/createAdditionalFolkGroups';

interface AdditionalGroupsButtonProps {
  onRefresh: () => void;
}

export const AdditionalGroupsButton: React.FC<AdditionalGroupsButtonProps> = ({ onRefresh }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  const handleCreateAdditionalGroups = async () => {
    console.log('🎯 Starting additional folk groups creation...');
    setIsCreating(true);
    setIsCompleted(false);
    setHasError(false);
    setResultMessage('');
    
    try {
      const result = await createAdditionalFolkGroups();
      console.log('📊 Import result:', result);
      
      if (result.success) {
        setIsCompleted(true);
        if (result.successCount > 0) {
          setResultMessage(`Skapade ${result.successCount} nya folkgrupper!`);
        } else if (result.skippedCount > 0) {
          setResultMessage(`${result.skippedCount} folkgrupper fanns redan`);
        } else {
          setResultMessage('Import slutförd');
        }
        
        // Refresh the list
        onRefresh();
        
        // Reset completed state after 5 seconds
        setTimeout(() => {
          setIsCompleted(false);
          setResultMessage('');
        }, 5000);
      } else {
        setHasError(true);
        setResultMessage(result.message || `Fel: ${result.errorCount || 0} misslyckades`);
        console.error('❌ Import failed:', result);
      }
    } catch (error) {
      console.error('💥 Error creating additional groups:', error);
      setHasError(true);
      setResultMessage(`Tekniskt fel: ${error.message || 'Okänt fel'}`);
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
        {resultMessage}
      </Button>
    );
  }

  if (hasError) {
    return (
      <Button 
        onClick={handleCreateAdditionalGroups}
        className="bg-red-600 hover:bg-red-700 text-white"
      >
        <AlertCircle className="h-4 w-4 mr-2" />
        {resultMessage} - Försök igen
      </Button>
    );
  }

  return (
    <Button 
      onClick={handleCreateAdditionalGroups}
      disabled={isCreating}
      className="bg-purple-600 hover:bg-purple-700 text-white"
    >
      {isCreating ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Skapar historiska grupper...
        </>
      ) : (
        <>
          <Plus className="h-4 w-4 mr-2" />
          <Users className="h-4 w-4 mr-2" />
          Lägg till historiska folkgrupper
        </>
      )}
    </Button>
  );
};
