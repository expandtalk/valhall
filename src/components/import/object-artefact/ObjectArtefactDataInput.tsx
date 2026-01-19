
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ObjectArtefactDataInputProps {
  importData: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export const ObjectArtefactDataInput: React.FC<ObjectArtefactDataInputProps> = ({
  importData,
  onChange,
  disabled
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="objectArtefactImportData" className="text-white">
        SQL INSERT Data för Object_Artefact
      </Label>
      <Textarea
        id="objectArtefactImportData"
        value={importData}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Klistra in MySQL INSERT INTO `object_artefact` VALUES statement här..."
        className="bg-white/10 border-white/20 text-white font-mono text-xs h-40"
        disabled={disabled}
      />
    </div>
  );
};
