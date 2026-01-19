
import React from 'react';
import { Badge } from "@/components/ui/badge";

export const getStatusBadge = (status: string, language: string) => {
  const colors = {
    'historical': 'bg-green-600',
    'semi_legendary': 'bg-yellow-600',
    'legendary': 'bg-purple-600',
    'disputed': 'bg-red-600'
  };
  
  const labels = language === 'en' ? {
    'historical': 'Historical',
    'semi_legendary': 'Semi-legendary',
    'legendary': 'Legendary',
    'disputed': 'Disputed'
  } : {
    'historical': 'Historisk',
    'semi_legendary': 'Halvlegendarisk',
    'legendary': 'Legendarisk',
    'disputed': 'Omtvistad'
  };
  
  return (
    <Badge className={`${colors[status as keyof typeof colors]} text-white text-xs`}>
      {labels[status as keyof typeof labels]}
    </Badge>
  );
};

export const getReliabilityBadge = (reliability: string, language: string) => {
  const colors = {
    'primary': 'bg-green-600',
    'secondary': 'bg-blue-600',
    'tertiary': 'bg-orange-600',
    'legendary': 'bg-red-600'
  };
  
  const labels = language === 'en' ? {
    'primary': 'Primary source',
    'secondary': 'Secondary source',
    'tertiary': 'Tertiary source',
    'legendary': 'Legendary'
  } : {
    'primary': 'Primärkälla',
    'secondary': 'Sekundärkälla',
    'tertiary': 'Tertiärkälla',
    'legendary': 'Legendarisk'
  };
  
  return (
    <Badge className={`${colors[reliability as keyof typeof colors]} text-white text-xs`}>
      {labels[reliability as keyof typeof labels]}
    </Badge>
  );
};

export const isJarl = (ruler: any) => {
  const nameContainsJarl = ruler.name.toLowerCase().includes('jarl');
  const descriptionContainsJarl = ruler.description?.toLowerCase().includes('jarl') || false;
  const descriptionContainsKung = ruler.description?.toLowerCase().includes('kung') || false;
  
  if (descriptionContainsJarl && descriptionContainsKung) {
    return false;
  }
  
  return nameContainsJarl || (descriptionContainsJarl && !descriptionContainsKung);
};
