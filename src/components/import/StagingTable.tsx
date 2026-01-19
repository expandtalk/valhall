
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Loader2 } from "lucide-react";
import { StagingInscription } from "@/types/staging";

interface StagingTableProps {
  stagingData: StagingInscription[];
  loading: boolean;
  onSelectItem: (item: StagingInscription) => void;
}

export const StagingTable: React.FC<StagingTableProps> = ({ 
  stagingData, 
  loading, 
  onSelectItem 
}) => {
  const getConflictBadgeColor = (reason: string) => {
    switch (reason) {
      case 'signum_conflict': return 'bg-red-500';
      case 'gps_uncertainty': return 'bg-orange-500';
      case 'dating_vague': return 'bg-yellow-500';
      case 'source_conflict': return 'bg-purple-500';
      case 'duplicate_suspected': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getConflictLabel = (reason: string) => {
    switch (reason) {
      case 'signum_conflict': return 'Signum-konflikt';
      case 'gps_uncertainty': return 'GPS-osäkerhet';
      case 'dating_vague': return 'Vag datering';
      case 'source_conflict': return 'Källkonflikt';
      case 'duplicate_suspected': return 'Möjlig duplikat';
      default: return reason;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  if (stagingData.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-300">Ingen staging-data finns för tillfället.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-white/20">
            <TableHead className="text-slate-300">Signum</TableHead>
            <TableHead className="text-slate-300">Källa</TableHead>
            <TableHead className="text-slate-300">Konflikter</TableHead>
            <TableHead className="text-slate-300">Plats</TableHead>
            <TableHead className="text-slate-300">Status</TableHead>
            <TableHead className="text-slate-300">Åtgärder</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stagingData.map((item) => (
            <TableRow key={item.id} className="border-white/20">
              <TableCell className="text-white font-mono">{item.original_signum}</TableCell>
              <TableCell className="text-slate-300">{item.source_database}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {item.conflict_reasons.map((reason, index) => (
                    <Badge 
                      key={index}
                      className={`${getConflictBadgeColor(reason)} text-white text-xs`}
                    >
                      {getConflictLabel(reason)}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-slate-300">{item.location || 'Okänd'}</TableCell>
              <TableCell>
                <Badge 
                  className={
                    item.status === 'pending' ? 'bg-orange-500' :
                    item.status === 'approved' ? 'bg-green-500' :
                    'bg-red-500'
                  }
                >
                  {item.status === 'pending' ? 'Väntar' :
                   item.status === 'approved' ? 'Godkänd' :
                   'Avvisad'}
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onSelectItem(item)}
                  className="border-white/20 text-white hover:bg-white/5"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Granska
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
