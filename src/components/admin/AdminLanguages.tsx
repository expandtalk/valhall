
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, Search, Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Language, getAllLanguages, clearLanguageCache } from "@/utils/languageUtils";
import { EditModal } from "./EditModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const languageFields = [
  { key: 'language_code', label: 'Språkkod', type: 'text' as const, required: true },
  { key: 'name_sv', label: 'Namn (svenska)', type: 'text' as const, required: true },
  { key: 'name_en', label: 'Namn (engelska)', type: 'text' as const, required: true }
];

export const AdminLanguages: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [languageToDelete, setLanguageToDelete] = useState<Language | null>(null);
  const { toast } = useToast();

  const loadLanguages = async () => {
    setIsLoading(true);
    try {
      const allLanguages = await getAllLanguages();
      setLanguages(allLanguages);
    } catch (error) {
      console.error('Error loading languages:', error);
      toast({
        title: "Fel",
        description: "Kunde inte ladda språk från databasen",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLanguages();
  }, []);

  const filteredLanguages = languages.filter(lang =>
    lang.language_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.name_sv.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.name_en.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRefresh = async () => {
    clearLanguageCache();
    await loadLanguages();
    toast({
      title: "Uppdaterat",
      description: "Språkcache har rensats och data laddats om"
    });
  };

  const handleEdit = (language: Language) => {
    setSelectedLanguage(language);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedLanguage(null);
    setIsModalOpen(true);
  };

  const handleSave = async (languageData: any) => {
    setIsSaving(true);
    try {
      if (selectedLanguage) {
        // Update existing language
        const { error } = await supabase
          .from('languages')
          .update({
            language_code: languageData.language_code,
            name_sv: languageData.name_sv,
            name_en: languageData.name_en
          })
          .eq('id', selectedLanguage.id);

        if (error) throw error;

        toast({
          title: "Språk uppdaterat",
          description: `${languageData.name_sv} har uppdaterats`
        });
      } else {
        // Create new language
        const { error } = await supabase
          .from('languages')
          .insert({
            language_code: languageData.language_code,
            name_sv: languageData.name_sv,
            name_en: languageData.name_en
          });

        if (error) throw error;

        toast({
          title: "Språk skapat",
          description: `${languageData.name_sv} har lagts till`
        });
      }

      setIsModalOpen(false);
      clearLanguageCache();
      await loadLanguages();
    } catch (error) {
      console.error('Error saving language:', error);
      toast({
        title: "Fel",
        description: "Kunde inte spara språket",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteClick = (language: Language) => {
    setLanguageToDelete(language);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!languageToDelete) return;

    try {
      const { error } = await supabase
        .from('languages')
        .delete()
        .eq('id', languageToDelete.id);

      if (error) throw error;

      toast({
        title: "Språk raderat",
        description: `${languageToDelete.name_sv} har tagits bort`
      });

      setIsDeleteDialogOpen(false);
      setLanguageToDelete(null);
      clearLanguageCache();
      await loadLanguages();
    } catch (error) {
      console.error('Error deleting language:', error);
      toast({
        title: "Fel",
        description: "Kunde inte radera språket",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-400" />
            <CardTitle className="text-white">Språkhantering</CardTitle>
          </div>
          <CardDescription className="text-slate-300">
            Hantera språkkoder och översättningar för runinskriptioner
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Sök språk, kod eller namn..."
                className="pl-10 bg-white/5 border-white/10 text-white"
              />
            </div>
            <Button
              onClick={handleAdd}
              className="bg-green-600/20 hover:bg-green-600/30 border-green-500/50 text-green-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Lägg till språk
            </Button>
            <Button
              onClick={handleRefresh}
              variant="outline"
              className="bg-blue-600/20 hover:bg-blue-600/30 border-blue-500/50 text-blue-300"
              disabled={isLoading}
            >
              Uppdatera Cache
            </Button>
          </div>

          <div className="bg-white/5 rounded-lg border border-white/10">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-slate-300">Språkkod</TableHead>
                  <TableHead className="text-slate-300">Svenska</TableHead>
                  <TableHead className="text-slate-300">Engelska</TableHead>
                  <TableHead className="text-slate-300">Åtgärder</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-slate-400 py-8">
                      Laddar språk...
                    </TableCell>
                  </TableRow>
                ) : filteredLanguages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-slate-400 py-8">
                      {searchTerm ? 'Inga språk matchade sökningen' : 'Inga språk hittades'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLanguages.map((language) => (
                    <TableRow key={language.id} className="border-white/10 hover:bg-white/5">
                      <TableCell className="text-white font-mono">
                        {language.language_code}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {language.name_sv}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {language.name_en}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(language)}
                            className="bg-green-600/20 hover:bg-green-600/30 border-green-500/50 text-green-300"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteClick(language)}
                            className="bg-red-600/20 hover:bg-red-600/30 border-red-500/50 text-red-300"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="text-sm text-slate-400">
            Visar {filteredLanguages.length} av {languages.length} språk
          </div>
        </CardContent>
      </Card>

      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        title="Språk"
        item={selectedLanguage}
        isLoading={isSaving}
        fields={languageFields}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-slate-800 border-white/20 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Bekräfta radering</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-300">
              Är du säker på att du vill ta bort språket "{languageToDelete?.name_sv}"? 
              Detta kan påverka befintliga inskrifter som använder detta språk.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/20 text-white hover:bg-white/5">
              Avbryt
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Ta bort
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
