import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, Headphones, Mic, Clock } from "lucide-react";
import { useAudioFiles } from '@/hooks/useAudioFiles';
import { supabase } from '@/integrations/supabase/client';

export const PodcastPromotion: React.FC = () => {
  const { audioFiles, isLoading, getAudioUrl } = useAudioFiles();
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Get image URL helper (for media images)
  const getImageUrl = (filePath: string) => {
    const { data } = supabase.storage
      .from('media-images')
      .getPublicUrl(filePath);
    return data.publicUrl;
  };

  // Filter for general podcast episodes
  const podcastEpisodes = audioFiles?.filter(file => 
    file.content_type_category === 'general' && file.status === 'active'
  ) || [];

  const handlePlayPause = (episode: any) => {
    if (!audioRef.current) return;

    if (currentlyPlaying === episode.id) {
      audioRef.current.pause();
      setCurrentlyPlaying(null);
    } else {
      const audioUrl = getAudioUrl(episode.file_path);
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      setCurrentlyPlaying(episode.id);
    }
  };

  const handleAudioEnded = () => {
    setCurrentlyPlaying(null);
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="relative py-12 bg-gradient-to-b from-slate-900/80 to-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl mx-4">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Headphones className="h-8 w-8 text-amber-400" />
            <h2 className="text-4xl font-bold text-white font-Norse">
              Podcast
            </h2>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Dive deep into the Viking Age through our audio stories about runestones, 
            sagas and myths from the golden age of the North.
          </p>
          <div className="inline-flex items-center gap-4 bg-slate-800/40 backdrop-blur-sm rounded-full px-6 py-2 mt-4 border border-white/10">
            <Mic className="h-4 w-4 text-amber-400" />
            <span className="text-slate-300 text-sm">Historic tales from the North</span>
          </div>
        </div>

        {/* Episode List */}
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-slate-800/50 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : podcastEpisodes.length > 0 ? (
            <div className="space-y-4">
              {podcastEpisodes.map((episode, index) => (
                <Card key={episode.id} className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50 hover:bg-slate-700/40 transition-all duration-300">
                  <CardContent className="p-6">
                     <div className="flex items-center gap-4">
                       {/* Episode Avatar */}
                       <div className="flex-shrink-0 relative">
                         {episode.avatar_image?.file_path ? (
                           <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-700 border-2 border-amber-500/20">
                             <img 
                               src={getImageUrl(episode.avatar_image.file_path)} 
                               alt={episode.avatar_image.alt_text || `Avatar för ${episode.title}`}
                               className="w-full h-full object-cover"
                               onError={(e) => {
                                 e.currentTarget.style.display = 'none';
                               }}
                             />
                           </div>
                         ) : (
                           <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center border-2 border-amber-500/20">
                             <Headphones className="h-8 w-8 text-white" />
                           </div>
                         )}
                         
                         {/* Play Button Overlay */}
                         <Button
                           variant="ghost"
                           size="sm"
                           onClick={() => handlePlayPause(episode)}
                           className="absolute inset-0 w-16 h-16 rounded-full bg-black/50 hover:bg-black/70 text-white opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                         >
                           {currentlyPlaying === episode.id ? (
                             <Pause className="h-6 w-6" />
                           ) : (
                             <Play className="h-6 w-6 ml-0.5" />
                           )}
                         </Button>
                       </div>
                       
                       <div className="flex-1 min-w-0">
                         <h3 className="text-lg font-semibold text-white truncate">
                           {episode.title_en || episode.title}
                         </h3>
                         <p className="text-slate-400 text-sm line-clamp-2 mt-1">
                           {episode.description_en || episode.description || "Discover the history behind the runestones"}
                         </p>
                       </div>
                       
                       <div className="flex items-center gap-2 text-slate-400 text-sm">
                         <Clock className="h-4 w-4" />
                         <span>{formatDuration(episode.duration_seconds)}</span>
                       </div>
                     </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="py-12 text-center">
                <Headphones className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                <h3 className="text-lg font-medium text-white mb-2">No Episodes Yet</h3>
                <p className="text-slate-400">
                  Episodes will appear here when they're uploaded to the system.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          onEnded={handleAudioEnded}
          preload="none"
        />
      </div>
    </section>
  );
};