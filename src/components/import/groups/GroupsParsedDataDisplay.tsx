
import React from 'react';
import { MySQLGroupRecord } from './types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from '@/components/ui/scroll-area';

interface GroupsParsedDataDisplayProps {
  records: MySQLGroupRecord[];
}

export const GroupsParsedDataDisplay: React.FC<GroupsParsedDataDisplayProps> = ({ records }) => {
  if (records.length === 0) return null;

  return (
    <div className="bg-black/20 rounded p-4">
      <h4 className="text-white font-semibold mb-2">{records.length} grupper att importera</h4>
      <ScrollArea className="h-72">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">GroupID</TableHead>
              <TableHead className="text-white">Type</TableHead>
              <TableHead className="text-white">Notes</TableHead>
              <TableHead className="text-white">Lang</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.groupid}>
                <TableCell className="font-mono text-xs">{record.groupid.substring(0, 10)}...</TableCell>
                <TableCell>{record.type}</TableCell>
                <TableCell>{record.notes || 'N/A'}</TableCell>
                <TableCell>{record.lang}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};
