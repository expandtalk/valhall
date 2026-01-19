
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users2, Edit, Trash2, Plus } from "lucide-react";
import { getGroupsByPeriod } from '@/utils/germanicTimeline/timelineData';
import { useAdminOperations } from '@/hooks/useAdminOperations';

export const AdminGermanicGroups: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('viking_age');
  const [searchTerm, setSearchTerm] = useState('');
  const { handleEdit, handleDelete, handleAdd, isLoading } = useAdminOperations();
  
  const periods = [
    { id: 'bronze_age', name: 'Bronze Age (1700-500 BCE)' },
    { id: 'pre_roman_iron_age', name: 'Pre-Roman Iron Age (500-50 BCE)' },
    { id: 'roman_iron_age', name: 'Roman Iron Age (50-400 CE)' },
    { id: 'migration_period', name: 'Migration Period (400-550 CE)' },
    { id: 'vendel_period', name: 'Vendel Period (550-790 CE)' },
    { id: 'viking_age', name: 'Viking Age (790-1100 CE)' }
  ];

  const germanicGroups = getGroupsByPeriod(selectedPeriod);
  const filteredGroups = germanicGroups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.languageBranch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const branchColors = {
    'North Germanic': 'bg-red-100 text-red-800',
    'West Germanic': 'bg-emerald-100 text-emerald-800',
    'East Germanic': 'bg-purple-100 text-purple-800',
    'Celtic': 'bg-green-100 text-green-800',
    'Baltic': 'bg-cyan-100 text-cyan-800',
    'Slavic': 'bg-orange-100 text-orange-800',
    'Finno-Ugric': 'bg-indigo-100 text-indigo-800',
    'Other': 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users2 className="h-6 w-6" />
            Germanic Groups Administration
          </CardTitle>
          <CardDescription className="text-slate-300">
            Hantera germanska folkslag och språkgrupper
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Tidsperiod</label>
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full bg-slate-800 border border-white/20 text-white rounded-md px-3 py-2"
              >
                {periods.map(period => (
                  <option key={period.id} value={period.id}>{period.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Sök</label>
              <Input
                placeholder="Sök efter folkslag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-800 border-white/20 text-white"
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-slate-300">
              Visar {filteredGroups.length} av {germanicGroups.length} folkslag
            </p>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => handleAdd('Germanic Group')}
              disabled={isLoading}
            >
              <Plus className="h-4 w-4 mr-2" />
              Lägg till folkslag
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGroups.map((group) => (
          <Card key={group.id} className="bg-white/5 backdrop-blur-md border-white/10">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-white text-lg">{group.nameEn}</CardTitle>
                  <p className="text-slate-300 text-sm">{group.name}</p>
                </div>
                <div className="flex gap-1">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-slate-300 hover:text-white"
                    onClick={() => handleEdit('Germanic Group', group)}
                    disabled={isLoading}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-red-400 hover:text-red-300"
                    onClick={() => handleDelete('Germanic Group', group)}
                    disabled={isLoading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Badge className={branchColors[group.languageBranch as keyof typeof branchColors] || 'bg-gray-100 text-gray-800'}>
                {group.languageBranch}
              </Badge>
              
              <p className="text-slate-300 text-sm">{group.description}</p>
              
              <div className="text-xs text-slate-400">
                <p>Koordinater: {group.lat}, {group.lng}</p>
                <p>Period: {group.period}</p>
                <p>År: {group.startYear} - {group.endYear}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
