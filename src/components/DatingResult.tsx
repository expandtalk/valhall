
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, MapPin, Info, TrendingUp } from "lucide-react";
import { RunicAnalysis } from '../types/runic';

interface DatingResultProps {
  analysis: RunicAnalysis;
}

export const DatingResult: React.FC<DatingResultProps> = ({ analysis }) => {
  const confidenceColor = analysis.confidence >= 0.8 ? 'text-green-400' : 
                         analysis.confidence >= 0.6 ? 'text-yellow-400' : 'text-red-400';
  
  const confidenceLevel = analysis.confidence >= 0.8 ? 'Hög' : 
                         analysis.confidence >= 0.6 ? 'Medel' : 'Låg';

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Info className="h-5 w-5" />
            AI-analys resultat
          </CardTitle>
          <CardDescription className="text-slate-300">
            Baserat på språkliga drag, runtyper och historisk kontext
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Primary Result */}
          <div className="text-center p-6 bg-white/10 rounded-lg">
            <h3 className="text-2xl font-bold text-white mb-2">
              {analysis.period}
            </h3>
            <p className="text-slate-300 mb-4">
              {analysis.yearRange.start} - {analysis.yearRange.end} e.Kr.
            </p>
            
            {/* Confidence Meter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Säkerhet</span>
                <span className={`text-sm font-medium ${confidenceColor}`}>
                  {Math.round(analysis.confidence * 100)}% ({confidenceLevel})
                </span>
              </div>
              <Progress 
                value={analysis.confidence * 100} 
                className="h-2"
              />
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
              <Calendar className="h-4 w-4 text-blue-400" />
              <div>
                <p className="text-xs text-slate-400">Runtyp</p>
                <p className="text-sm text-white">{analysis.runType}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
              <MapPin className="h-4 w-4 text-green-400" />
              <div>
                <p className="text-xs text-slate-400">Plats</p>
                <p className="text-sm text-white">{analysis.location}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
              <Info className="h-4 w-4 text-purple-400" />
              <div>
                <p className="text-xs text-slate-400">Objekttyp</p>
                <p className="text-sm text-white">{analysis.objectType}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reasoning */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Analys och motivering
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 leading-relaxed">
              {analysis.reasoning}
            </p>
          </CardContent>
        </Card>

        {/* Linguistic Features */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Identifierade språkdrag
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analysis.linguisticFeatures.map((feature, index) => (
                <Badge 
                  key={index}
                  variant="secondary" 
                  className="mr-2 mb-2 bg-white/20 text-white border-white/30"
                >
                  {feature}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Disclaimer */}
      <Card className="bg-orange-900/20 border-orange-500/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
            <div className="text-sm text-orange-200">
              <strong>Viktigt:</strong> Detta är en AI-baserad preliminär analys för forskningsändamål. 
              Resultaten bör alltid valideras av kvalificerade runologer och kompletteras med 
              arkeologisk kontext, stilistisk analys och andra vetenskapliga metoder.
              <br/><br/>
              Baserat på Samnordisk runtextdatabas och etablerad runologisk forskning från 
              Uppsala universitet och Riksantikvarieämbetet.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
