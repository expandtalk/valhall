import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Music, Filter } from "lucide-react";
import { useAudioFiles } from '@/hooks/useAudioFiles';
import { AudioUploadModal } from './audio/AudioUploadModal';
import { AudioFileCard } from './audio/AudioFileCard';

export const AdminAudioFiles: React.FC = () => {
  const { audioFiles, isLoading } = useAudioFiles();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredAudioFiles = audioFiles?.filter(file => {
    const matchesSearch = 
      file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.title_en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.narrator?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || file.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || file.content_type_category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  }) || [];

  const getTotalSize = () => {
    if (!audioFiles) return 0;
    return audioFiles.reduce((total, file) => total + (file.file_size || 0), 0);
  };

  const formatTotalSize = (bytes: number) => {
    const gb = bytes / (1024 * 1024 * 1024);
    if (gb >= 1) return `${gb.toFixed(2)} GB`;
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const getStatusCounts = () => {
    if (!audioFiles) return { active: 0, inactive: 0, processing: 0 };
    return audioFiles.reduce((counts, file) => {
      counts[file.status] = (counts[file.status] || 0) + 1;
      return counts;
    }, { active: 0, inactive: 0, processing: 0 } as Record<string, number>);
  };

  const getCategoryCounts = () => {
    if (!audioFiles) return {};
    return audioFiles.reduce((counts, file) => {
      counts[file.content_type_category] = (counts[file.content_type_category] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);
  };

  const statusCounts = getStatusCounts();
  const categoryCounts = getCategoryCounts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Music className="h-5 w-5" />
                Ljudfilshantering
              </CardTitle>
              <CardDescription>
                Administrera WAV-filer för runinskrifter, kungar och platser
              </CardDescription>
            </div>
            <Button onClick={() => setIsUploadModalOpen(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Ladda upp ljudfil
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {audioFiles?.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">Totalt</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {statusCounts.active}
              </div>
              <div className="text-sm text-muted-foreground">Aktiva</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {statusCounts.processing}
              </div>
              <div className="text-sm text-muted-foreground">Bearbetas</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">
                {statusCounts.inactive}
              </div>
              <div className="text-sm text-muted-foreground">Inaktiva</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {formatTotalSize(getTotalSize())}
              </div>
              <div className="text-sm text-muted-foreground">Total storlek</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">
                {categoryCounts.inscription || 0}
              </div>
              <div className="text-sm text-muted-foreground">Runinskrifter</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Sök ljudfiler..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2 items-center">
              <Filter className="h-4 w-4 text-muted-foreground" />
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla status</SelectItem>
                  <SelectItem value="active">Aktiva</SelectItem>
                  <SelectItem value="inactive">Inaktiva</SelectItem>
                  <SelectItem value="processing">Bearbetas</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla kategorier</SelectItem>
                  <SelectItem value="inscription">Runinskrift</SelectItem>
                  <SelectItem value="king">Kung/Regent</SelectItem>
                  <SelectItem value="location">Plats</SelectItem>
                  <SelectItem value="general">Allmänt</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Badge variant="outline">
              {filteredAudioFiles.length} av {audioFiles?.length || 0}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Audio Files Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      ) : filteredAudioFiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAudioFiles.map((audioFile) => (
            <AudioFileCard key={audioFile.id} audioFile={audioFile} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Music className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">
              {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all' 
                ? 'Inga ljudfiler hittades' 
                : 'Inga ljudfiler uppladdade än'
              }
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
                ? 'Prova att ändra dina sökfilter'
                : 'Kom igång genom att ladda upp din första ljudfil'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && categoryFilter === 'all' && (
              <Button onClick={() => setIsUploadModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Ladda upp ljudfil
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Upload Modal */}
      <AudioUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
};