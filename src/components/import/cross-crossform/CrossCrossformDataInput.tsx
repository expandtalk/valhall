
import React from 'react';
import { Textarea } from "@/components/ui/textarea";

interface CrossCrossformDataInputProps {
  importData: string;
  onChange: (value: string) => void;
  isImporting: boolean;
  lineCount: number;
}

export const CrossCrossformDataInput: React.FC<CrossCrossformDataInputProps> = ({
  importData,
  onChange,
  isImporting,
  lineCount
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        MySQL Data (från cross_crossform tabell)
      </label>
      <Textarea
        value={importData}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Klistra in din MySQL cross_crossform data här...

Exempel:
INSERT INTO \`cross_crossform\` (\`crosscrossformid\`, \`crossid\`, \`crossformid\`, \`certainty\`)
VALUES
	(X'00053E50CF6A44BC96FF59990C1527D5',X'9CA62350D1BF4C56A5C9301E8E5DFB96',X'3A8744F5E5FE4F58ACCB11C782E831B6',1),
	(X'0007895303FD4580ADA224B8374E0D5C',X'12B4731AD1B444C1899C1BEF96230BCA',X'E42A42FFD6854ECD93BD456A0D7C87FC',1);`}
        className="w-full h-40 bg-white/5 border-white/10 text-white font-mono text-sm"
        disabled={isImporting}
      />
      <div className="text-xs text-slate-400 mt-1">
        {lineCount.toLocaleString()} rader totalt
      </div>
    </div>
  );
};
