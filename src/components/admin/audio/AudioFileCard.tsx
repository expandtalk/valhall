import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Edit, Trash2, Volume2, Download } from "lucide-react";
import { AudioFile, useAudioFiles } from '@/hooks/useAudioFiles';
import { AudioEditModal } from './AudioEditModal';

interface AudioFileCardProps {
  audioFile: AudioFile;
}

export const AudioFileCard: React.FC<AudioFileCardProps> = ({ audioFile }) => {
  const { deleteAudioFile, getAudioUrl } = useAudioFiles();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleDelete = async () => {
    if (window.confirm(`Är du säker på att du vill ta bort "${audioFile.title}"?`)) {
      await deleteAudioFile.mutateAsync(audioFile.id);
    }
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return 'Okänd längd';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'Okänd storlek';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'inscription': return 'Runinskrift';
      case 'king': return 'Kung/Regent';
      case 'location': return 'Plats';
      case 'general': return 'Allmänt';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'inscription': return 'bg-blue-100 text-blue-800';
      case 'king': return 'bg-purple-100 text-purple-800';
      case 'location': return 'bg-green-100 text-green-800';
      case 'general': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const audioUrl = getAudioUrl(audioFile.file_path);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg truncate">{audioFile.title}</CardTitle>
            {audioFile.title_en && (
              <CardDescription className="truncate">{audioFile.title_en}</CardDescription>
            )}
          </div>
          <div className="flex gap-1 ml-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditModalOpen(true)}
              title="Redigera"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              title="Ta bort"
              disabled={deleteAudioFile.isPending}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Audio Controls */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePlayPause}
              className="flex items-center gap-2"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? 'Pausa' : 'Spela'}
            </Button>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Volume2 className="h-4 w-4" />
              <span>{formatDuration(audioFile.duration_seconds)}</span>
              <span>•</span>
              <span>{formatFileSize(audioFile.file_size)}</span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(audioUrl, '_blank')}
              title="Ladda ner"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>

          {/* Hidden Audio Element */}
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={handleAudioEnded}
            preload="metadata"
          />

          {/* Metadata */}
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <Badge className={getCategoryColor(audioFile.content_type_category)}>
                {getCategoryLabel(audioFile.content_type_category)}
              </Badge>
              {audioFile.status !== 'active' && (
                <Badge variant="outline">
                  {audioFile.status === 'inactive' ? 'Inaktiv' : 'Bearbetas'}
                </Badge>
              )}
            </div>

            {audioFile.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {audioFile.description}
              </p>
            )}

            <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
              {audioFile.narrator && (
                <div>
                  <span className="font-medium">Berättare:</span>
                  <br />
                  {audioFile.narrator}
                </div>
              )}
              {audioFile.production_date && (
                <div>
                  <span className="font-medium">Datum:</span>
                  <br />
                  {new Date(audioFile.production_date).toLocaleDateString('sv-SE')}
                </div>
              )}
            </div>

            <div className="text-xs text-muted-foreground">
              <span className="font-medium">Filnamn:</span> {audioFile.original_filename}
              <br />
              <span className="font-medium">Uppladdad:</span> {new Date(audioFile.created_at).toLocaleString('sv-SE')}
            </div>
          </div>
        </div>
      </CardContent>

      <AudioEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        audioFile={audioFile}
      />
    </Card>
  );
};