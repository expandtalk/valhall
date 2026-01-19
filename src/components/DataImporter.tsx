
import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Upload } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { BulkImportSection } from "./import/BulkImportSection";
import { CarverInscriptionImportSection } from "./import/CarverInscriptionImportSection";
import { CarverSourceImportSection } from "./import/CarverSourceImportSection";
import { MaterialTypesImportSection } from "./import/MaterialTypesImportSection";
import { MaterialMaterialSubtypeImportSection } from "./import/MaterialMaterialSubtypeImportSection";
import { ImagelinksImportSection } from "./import/ImagelinksImportSection";
import { InscriptionGroupImportSection } from "./import/InscriptionGroupImportSection";
import { GroupsImportSection } from './import/groups';
import { MunicipalitiesImportSection } from "./import/MunicipalitiesImportSection";
import { CountiesImportSection } from "./import/CountiesImportSection";
import { CountriesImportSection } from "./import/CountriesImportSection";
import { NotesImportSection } from "./import/NotesImportSection";
import { ReadingsImportSection } from "./import/ReadingsImportSection";
import { ReadingSourceImportSection } from './import/ReadingSourceImportSection';
import { CoordinatesImportSection } from "./import/CoordinatesImportSection";
import { CrossCrossformImportSection } from "./import/CrossCrossformImportSection";
import { ObjectArtefactImportSection } from "./import/ObjectArtefactImportSection";
import { ObjectSourceImportSection } from "./import/object-source";
import { ObjectsImportSection } from "./import/ObjectsImportSection";
import { CrossdescsImportSection } from "./import/CrossdescsImportSection";
import { CrossesImportSection } from "./import/CrossesImportSection";
import { CrossformsImportSection } from "./import/CrossformsImportSection";
import { DatingImportSection } from "./import/DatingImportSection";
import { StagingDataSection } from "./import/StagingDataSection";
import { ParishesImportSection } from './import/ParishesImportSection';
import { DanishParishesImportSection } from './import/danish-parishes';
import { HundredsImportSection } from './import/HundredsImportSection';
import { PlacesImportSection } from './import/PlacesImportSection';
import { DanishNotesImportSection } from './import/danish-notes';
import { FindnumbersImportSection } from './import/findnumbers';
import { SourcesImportSection } from './import/sources';
import { NorwegianLocalitiesImportSection } from './import/norwegian-localities';
import { SwedishLocalitiesImportSection } from './import/swedish-localities';
import { DatingSourceImportSection } from './import/dating-source';
import { ReferenceUriImportSection } from './import/reference-uri';
import { SignumInscriptionImportSection } from './import/signum-inscription';

export const DataImporter: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Database className="h-6 w-6" />
              Dataimport
            </CardTitle>
            <CardDescription className="text-slate-300">
              Importera data från olika källor till databasen
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid gap-8">
          <BulkImportSection />
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Upload className="h-6 w-6" />
              Specialiserade Importverktyg
            </h2>
            
            <Accordion type="single" collapsible className="w-full space-y-2">
              <AccordionItem value="parishes">
                <AccordionTrigger>Parishes</AccordionTrigger>
                <AccordionContent><ParishesImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="danish-parishes">
                <AccordionTrigger>Danish Parishes</AccordionTrigger>
                <AccordionContent><DanishParishesImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="danish-notes">
                <AccordionTrigger>Danish Notes</AccordionTrigger>
                <AccordionContent><DanishNotesImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="signum-inscription-links">
                <AccordionTrigger>Signum-Inscription Links</AccordionTrigger>
                <AccordionContent><SignumInscriptionImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="norwegian-localities">
                <AccordionTrigger>Norwegian Localities</AccordionTrigger>
                <AccordionContent><NorwegianLocalitiesImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="swedish-localities">
                <AccordionTrigger>Swedish Localities</AccordionTrigger>
                <AccordionContent><SwedishLocalitiesImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="hundreds">
                <AccordionTrigger>Hundreds</AccordionTrigger>
                <AccordionContent><HundredsImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="places">
                <AccordionTrigger>Places</AccordionTrigger>
                <AccordionContent><PlacesImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="carver-inscription">
                <AccordionTrigger>Carver-Inscription Links</AccordionTrigger>
                <AccordionContent><CarverInscriptionImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="carver-source">
                <AccordionTrigger>Carver-Source Links</AccordionTrigger>
                <AccordionContent><CarverSourceImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="material-types">
                <AccordionTrigger>Material Types</AccordionTrigger>
                <AccordionContent><MaterialTypesImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="material-subtypes">
                <AccordionTrigger>Material-Material Subtype Links</AccordionTrigger>
                <AccordionContent><MaterialMaterialSubtypeImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="imagelinks">
                <AccordionTrigger>Image Links</AccordionTrigger>
                <AccordionContent><ImagelinksImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="inscription-group">
                <AccordionTrigger>Inscription-Group Links</AccordionTrigger>
                <AccordionContent><InscriptionGroupImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="groups">
                <AccordionTrigger>Groups</AccordionTrigger>
                <AccordionContent><GroupsImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="municipalities">
                <AccordionTrigger>Municipalities</AccordionTrigger>
                <AccordionContent><MunicipalitiesImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="counties">
                <AccordionTrigger>Counties</AccordionTrigger>
                <AccordionContent><CountiesImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="countries">
                <AccordionTrigger>Countries</AccordionTrigger>
                <AccordionContent><CountriesImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="notes">
                <AccordionTrigger>Notes</AccordionTrigger>
                <AccordionContent><NotesImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="readings">
                <AccordionTrigger>Readings</AccordionTrigger>
                <AccordionContent><ReadingsImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="reading-source">
                <AccordionTrigger>Reading-Source Links</AccordionTrigger>
                <AccordionContent><ReadingSourceImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="coordinates">
                <AccordionTrigger>Coordinates</AccordionTrigger>
                <AccordionContent><CoordinatesImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="cross-crossform">
                <AccordionTrigger>Cross-Crossform Links</AccordionTrigger>
                <AccordionContent><CrossCrossformImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="object-artefact">
                <AccordionTrigger>Object-Artefact Links</AccordionTrigger>
                <AccordionContent><ObjectArtefactImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="object-source">
                <AccordionTrigger>Object-Source Links</AccordionTrigger>
                <AccordionContent><ObjectSourceImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="objects">
                <AccordionTrigger>Objects</AccordionTrigger>
                <AccordionContent><ObjectsImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="cross-descriptions">
                <AccordionTrigger>Cross Descriptions</AccordionTrigger>
                <AccordionContent><CrossdescsImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="crosses">
                <AccordionTrigger>Crosses</AccordionTrigger>
                <AccordionContent><CrossesImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="crossforms">
                <AccordionTrigger>Crossforms</AccordionTrigger>
                <AccordionContent><CrossformsImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="dating">
                <AccordionTrigger>Dating</AccordionTrigger>
                <AccordionContent><DatingImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="dating-source">
                <AccordionTrigger>Dating-Source Links</AccordionTrigger>
                <AccordionContent><DatingSourceImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="reference-uri">
                <AccordionTrigger>Reference URIs</AccordionTrigger>
                <AccordionContent><ReferenceUriImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="findnumbers">
                <AccordionTrigger>Find Numbers</AccordionTrigger>
                <AccordionContent><FindnumbersImportSection /></AccordionContent>
              </AccordionItem>
              <AccordionItem value="sources">
                <AccordionTrigger>Sources</AccordionTrigger>
                <AccordionContent><SourcesImportSection /></AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <StagingDataSection />
        </div>
      </div>
    </div>
  );
};
