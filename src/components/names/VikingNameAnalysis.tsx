
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, HelpCircle, Shield, Heart, Info } from 'lucide-react';
import { getAllVikingNameAnalysis, type AuthenticVikingName } from '@/utils/vikingNameValidator';

export const VikingNameAnalysis: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');
  
  const allNames = getAllVikingNameAnalysis();
  
  const authenticNames = allNames.filter(name => name.isAuthentic);
  const questionableNames = allNames.filter(name => !name.isAuthentic);
  
  const filteredAuthentic = selectedPeriod === 'all' 
    ? authenticNames 
    : authenticNames.filter(name => name.period === selectedPeriod);
    
  const getStatusIcon = (isAuthentic: boolean) => {
    return isAuthentic ? (
      <CheckCircle className="h-5 w-5 text-green-400" />
    ) : (
      <XCircle className="h-5 w-5 text-red-400" />
    );
  };
  
  const getPeriodBadge = (period: string) => {
    const colors = {
      'viking_age': 'bg-blue-600',
      'earlier': 'bg-purple-600', 
      'later': 'bg-orange-600',
      'uncertain': 'bg-gray-600'
    };
    
    const labels = {
      'viking_age': 'Vikingatid',
      'earlier': 'Före vikingatid',
      'later': 'Efter vikingatid', 
      'uncertain': 'Osäker period'
    };
    
    return (
      <Badge className={`${colors[period as keyof typeof colors]} text-white`}>
        {labels[period as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Info className="h-5 w-5" />
            Analys av runristarnamn som vikingatida namn
          </CardTitle>
          <p className="text-slate-300">
            Vetenskaplig granskning av vilka runristarnamn som är autentiska vikingatida personnamn
          </p>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{authenticNames.length}</div>
              <div className="text-sm text-slate-300 flex items-center justify-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Autentiska vikinganamn
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">{questionableNames.length}</div>
              <div className="text-sm text-slate-300 flex items-center justify-center gap-1">
                <XCircle className="h-4 w-4" />
                Tveksamma/icke-autentiska
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{allNames.length}</div>
              <div className="text-sm text-slate-300 flex items-center justify-center gap-1">
                <HelpCircle className="h-4 w-4" />
                Totalt analyserade
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="authentic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 bg-slate-800/60">
          <TabsTrigger value="authentic">
            Autentiska vikinganamn ({authenticNames.length})
          </TabsTrigger>
          <TabsTrigger value="questionable">
            Tveksamma namn ({questionableNames.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="authentic" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAuthentic.map((nameData) => (
              <Card key={nameData.name} className="bg-slate-800/60 backdrop-blur-md border-slate-600/30 border-l-4 border-l-green-400">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-semibold text-lg">{nameData.name}</h3>
                    {getStatusIcon(nameData.isAuthentic)}
                  </div>
                  
                  {nameData.meaning && (
                    <p className="text-slate-300 text-sm mb-2">
                      <strong>Betydelse:</strong> {nameData.meaning}
                    </p>
                  )}
                  
                  {nameData.etymology && (
                    <p className="text-slate-400 text-xs mb-2 italic">
                      <strong>Etymologi:</strong> {nameData.etymology}
                    </p>
                  )}
                  
                  <p className="text-slate-400 text-xs mb-3">
                    <strong>Motivering:</strong> {nameData.reason}
                  </p>
                  
                  <div className="space-y-2">
                    {getPeriodBadge(nameData.period)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="questionable" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {questionableNames.map((nameData) => (
              <Card key={nameData.name} className="bg-slate-800/60 backdrop-blur-md border-slate-600/30 border-l-4 border-l-red-400">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-semibold text-lg">{nameData.name}</h3>
                    {getStatusIcon(nameData.isAuthentic)}
                  </div>
                  
                  <p className="text-slate-400 text-xs mb-3">
                    <strong>Varför tveksam:</strong> {nameData.reason}
                  </p>
                  
                  <div className="space-y-2">
                    {getPeriodBadge(nameData.period)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
