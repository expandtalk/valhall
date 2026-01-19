
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface GeneticSearchControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedComplexity: string;
  setSelectedComplexity: (complexity: string) => void;
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
}

export const GeneticSearchControls: React.FC<GeneticSearchControlsProps> = ({
  searchTerm,
  setSearchTerm,
  selectedComplexity,
  setSelectedComplexity,
  selectedPeriod,
  setSelectedPeriod
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="relative md:col-span-2">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
        <Input
          placeholder="Sök i genetiska data (namn, beskrivning, ursprung...)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder-white/50 pl-10"
        />
      </div>
      <div>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2"
        >
          <option value="all">Alla tidsperioder</option>
          <option value="roman" className="text-black">Romersk järnålder</option>
          <option value="iron" className="text-black">Järnålder</option>
          <option value="migration" className="text-black">Folkvandringstid</option>
          <option value="vendel" className="text-black">Vendeltid</option>
          <option value="viking" className="text-black">Vikingatid</option>
          <option value="medieval" className="text-black">Medeltid</option>
          <option value="modern" className="text-black">Modern tid</option>
        </select>
      </div>
    </div>
  );
};
