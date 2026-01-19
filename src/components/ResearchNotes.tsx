import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Plus, Edit, Trash2, Save, X, Filter, MapPin, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResearchNote {
  id: string;
  title: string;
  content: string;
  note_type: string;
  inscription_id: string | null;
  methodology: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
}

interface RunicInscription {
  id: string;
  signum: string;
  coordinates?: any;
  location?: string;
}

interface FilterOptions {
  missingGeoPosition: boolean;
  nullMethodology: boolean;
  nullInscriptionId: boolean;
  emptyTitle: boolean;
  emptyContent: boolean;
  noteType: string;
  userId: string;
}

export const ResearchNotes = () => {
  const { user } = useAuth();
  const { isAdmin, loading: roleLoading } = useUserRole();
  const { toast } = useToast();
  
  const [notes, setNotes] = useState<ResearchNote[]>([]);
  const [allNotes, setAllNotes] = useState<ResearchNote[]>([]);
  const [inscriptions, setInscriptions] = useState<RunicInscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [userProfiles, setUserProfiles] = useState<{[key: string]: string}>({});
  const [filters, setFilters] = useState<FilterOptions>({
    missingGeoPosition: false,
    nullMethodology: false,
    nullInscriptionId: false,
    emptyTitle: false,
    emptyContent: false,
    noteType: 'all',
    userId: 'all'
  });
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    note_type: 'analysis',
    inscription_id: 'none',
    methodology: '',
    is_public: false
  });

  useEffect(() => {
    if (user && isAdmin) {
      fetchAllNotes();
      fetchInscriptions();
      fetchUserProfiles();
    }
  }, [user, isAdmin]);

  useEffect(() => {
    applyFilters();
  }, [filters, allNotes]);

  const fetchAllNotes = async () => {
    try {
      const { data, error } = await supabase
        .from('research_notes')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setAllNotes(data || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
      toast({
        title: "Fel",
        description: "Kunde inte hämta research notes",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchInscriptions = async () => {
    try {
      const { data, error } = await supabase
        .from('runic_inscriptions')
        .select('id, signum, coordinates, location')
        .order('signum');

      if (error) throw error;
      setInscriptions(data || []);
    } catch (error) {
      console.error('Error fetching inscriptions:', error);
    }
  };

  const fetchUserProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, full_name');

      if (error) throw error;
      
      const profileMap: {[key: string]: string} = {};
      data?.forEach(profile => {
        profileMap[profile.id] = profile.full_name || profile.email || 'Okänd användare';
      });
      setUserProfiles(profileMap);
    } catch (error) {
      console.error('Error fetching user profiles:', error);
    }
  };

  const applyFilters = () => {
    let filteredNotes = [...allNotes];

    // Filter by missing geo position (check related inscription)
    if (filters.missingGeoPosition) {
      filteredNotes = filteredNotes.filter(note => {
        if (!note.inscription_id) return true; // Include notes without inscription
        const inscription = inscriptions.find(i => i.id === note.inscription_id);
        return !inscription?.coordinates;
      });
    }

    // Filter by null methodology
    if (filters.nullMethodology) {
      filteredNotes = filteredNotes.filter(note => !note.methodology || note.methodology.trim() === '');
    }

    // Filter by null inscription_id
    if (filters.nullInscriptionId) {
      filteredNotes = filteredNotes.filter(note => !note.inscription_id);
    }

    // Filter by empty title
    if (filters.emptyTitle) {
      filteredNotes = filteredNotes.filter(note => !note.title || note.title.trim() === '');
    }

    // Filter by empty content
    if (filters.emptyContent) {
      filteredNotes = filteredNotes.filter(note => !note.content || note.content.trim() === '');
    }

    // Filter by note type
    if (filters.noteType !== 'all') {
      filteredNotes = filteredNotes.filter(note => note.note_type === filters.noteType);
    }

    // Filter by user
    if (filters.userId !== 'all') {
      filteredNotes = filteredNotes.filter(note => note.user_id === filters.userId);
    }

    setNotes(filteredNotes);
  };

  const resetFilters = () => {
    setFilters({
      missingGeoPosition: false,
      nullMethodology: false,
      nullInscriptionId: false,
      emptyTitle: false,
      emptyContent: false,
      noteType: 'all',
      userId: 'all'
    });
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Fel",
        description: "Titel och innehåll måste fyllas i",
        variant: "destructive"
      });
      return;
    }

    try {
      const noteData = {
        title: formData.title,
        content: formData.content,
        note_type: formData.note_type,
        inscription_id: formData.inscription_id === 'none' ? null : formData.inscription_id,
        methodology: formData.methodology || null,
        is_public: formData.is_public,
        user_id: user?.id
      };

      let result;
      if (editingNote) {
        result = await supabase
          .from('research_notes')
          .update(noteData)
          .eq('id', editingNote);
      } else {
        result = await supabase
          .from('research_notes')
          .insert([noteData]);
      }

      if (result.error) throw result.error;

      toast({
        title: "Framgång",
        description: editingNote ? "Research note uppdaterad" : "Research note skapad"
      });

      setFormData({
        title: '',
        content: '',
        note_type: 'analysis',
        inscription_id: 'none',
        methodology: '',
        is_public: false
      });
      setIsCreating(false);
      setEditingNote(null);
      fetchAllNotes();
    } catch (error) {
      console.error('Error saving note:', error);
      toast({
        title: "Fel",
        description: "Kunde inte spara research note",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (note: ResearchNote) => {
    setFormData({
      title: note.title || '',
      content: note.content,
      note_type: note.note_type,
      inscription_id: note.inscription_id || 'none',
      methodology: note.methodology || '',
      is_public: note.is_public || false
    });
    setEditingNote(note.id);
    setIsCreating(true);
  };

  const handleDelete = async (noteId: string) => {
    if (!confirm('Är du säker på att du vill ta bort denna research note?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('research_notes')
        .delete()
        .eq('id', noteId);

      if (error) throw error;

      toast({
        title: "Framgång",
        description: "Research note borttagen"
      });
      fetchAllNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
      toast({
        title: "Fel",
        description: "Kunde inte ta bort research note",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      content: '',
      note_type: 'analysis',
      inscription_id: 'none',
      methodology: '',
      is_public: false
    });
    setIsCreating(false);
    setEditingNote(null);
  };

  if (roleLoading) {
    return <div className="text-white">Laddar...</div>;
  }

  if (!user || !isAdmin) {
    return (
      <Card className="bg-white/5 backdrop-blur-md border-white/10">
        <CardContent className="p-8 text-center">
          <p className="text-slate-300">Du måste vara inloggad som administratör för att komma åt Research Notes.</p>
        </CardContent>
      </Card>
    );
  }

  const uniqueNoteTypes = [...new Set(allNotes.map(note => note.note_type))];
  const uniqueUsers = [...new Set(allNotes.map(note => note.user_id))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <FileText className="h-6 w-6" />
          Research Notes Administration
        </h2>
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="border-white/10 text-white hover:bg-white/5"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter ({notes.length}/{allNotes.length})
          </Button>
          {!isCreating && (
            <Button 
              onClick={() => setIsCreating(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ny Note
            </Button>
          )}
        </div>
      </div>

      {showFilters && (
        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-lg">Admin Filter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Empty Field Filters */}
              <div className="space-y-3">
                <h4 className="text-slate-300 font-medium">Tomma fält</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm text-slate-300">
                    <input
                      type="checkbox"
                      checked={filters.missingGeoPosition}
                      onChange={(e) => setFilters({...filters, missingGeoPosition: e.target.checked})}
                      className="rounded"
                    />
                    <MapPin className="h-4 w-4" />
                    <span>Saknar geo-position</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm text-slate-300">
                    <input
                      type="checkbox"
                      checked={filters.nullMethodology}
                      onChange={(e) => setFilters({...filters, nullMethodology: e.target.checked})}
                      className="rounded"
                    />
                    <AlertCircle className="h-4 w-4" />
                    <span>Ingen metodologi</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm text-slate-300">
                    <input
                      type="checkbox"
                      checked={filters.nullInscriptionId}
                      onChange={(e) => setFilters({...filters, nullInscriptionId: e.target.checked})}
                      className="rounded"
                    />
                    <AlertCircle className="h-4 w-4" />
                    <span>Ingen kopplad inskrift</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm text-slate-300">
                    <input
                      type="checkbox"
                      checked={filters.emptyTitle}
                      onChange={(e) => setFilters({...filters, emptyTitle: e.target.checked})}
                      className="rounded"
                    />
                    <AlertCircle className="h-4 w-4" />
                    <span>Tom titel</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm text-slate-300">
                    <input
                      type="checkbox"
                      checked={filters.emptyContent}
                      onChange={(e) => setFilters({...filters, emptyContent: e.target.checked})}
                      className="rounded"
                    />
                    <AlertCircle className="h-4 w-4" />
                    <span>Tomt innehåll</span>
                  </label>
                </div>
              </div>

              {/* Note Type Filter */}
              <div className="space-y-3">
                <h4 className="text-slate-300 font-medium">Typ av note</h4>
                <Select value={filters.noteType} onValueChange={(value) => setFilters({...filters, noteType: value})}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alla typer</SelectItem>
                    {uniqueNoteTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* User Filter */}
              <div className="space-y-3">
                <h4 className="text-slate-300 font-medium">Användare</h4>
                <Select value={filters.userId} onValueChange={(value) => setFilters({...filters, userId: value})}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alla användare</SelectItem>
                    {uniqueUsers.map((userId) => (
                      <SelectItem key={userId} value={userId}>
                        {userProfiles[userId] || 'Okänd användare'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={resetFilters} variant="outline" className="border-white/10 text-white hover:bg-white/5">
                Rensa filter
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isCreating && (
        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardHeader>
            <CardTitle className="text-white">
              {editingNote ? 'Redigera Research Note' : 'Skapa Ny Research Note'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Titel
              </label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Ange titel för research note"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Typ av note
              </label>
              <Select value={formData.note_type} onValueChange={(value) => setFormData({...formData, note_type: value})}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="analysis">Analys</SelectItem>
                  <SelectItem value="interpretation">Tolkning</SelectItem>
                  <SelectItem value="comparison">Jämförelse</SelectItem>
                  <SelectItem value="methodology">Metodologi</SelectItem>
                  <SelectItem value="bibliography">Bibliografi</SelectItem>
                  <SelectItem value="personal">Personlig</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Kopplad inskrift (valfritt)
              </label>
              <Select value={formData.inscription_id} onValueChange={(value) => setFormData({...formData, inscription_id: value})}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Välj inskrift" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Ingen specifik inskrift</SelectItem>
                  {inscriptions.map((inscription) => (
                    <SelectItem key={inscription.id} value={inscription.id}>
                      {inscription.signum}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Metodologi (valfritt)
              </label>
              <Input
                value={formData.methodology}
                onChange={(e) => setFormData({...formData, methodology: e.target.value})}
                placeholder="Beskriv metodologi som använts"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Innehåll
              </label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="Skriv din research note här..."
                rows={10}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_public"
                checked={formData.is_public}
                onChange={(e) => setFormData({...formData, is_public: e.target.checked})}
                className="rounded"
              />
              <label htmlFor="is_public" className="text-sm text-slate-300">
                Gör denna note offentlig
              </label>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Spara
              </Button>
              <Button onClick={handleCancel} variant="outline" className="border-white/10 text-white hover:bg-white/5">
                <X className="h-4 w-4 mr-2" />
                Avbryt
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="text-white text-center">Laddar research notes...</div>
      ) : (
        <div className="space-y-4">
          {notes.length === 0 ? (
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardContent className="p-8 text-center">
                <p className="text-slate-300">
                  {allNotes.length === 0 ? 'Inga research notes finns ännu.' : 'Inga notes matchar de valda filtren.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            notes.map((note) => {
              const relatedInscription = inscriptions.find(i => i.id === note.inscription_id);
              const hasGeoPosition = relatedInscription?.coordinates;
              const noteOwner = userProfiles[note.user_id] || 'Okänd användare';
              
              return (
                <Card key={note.id} className="bg-white/5 backdrop-blur-md border-white/10">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white">{note.title}</CardTitle>
                        <div className="flex gap-2 mt-2 text-sm text-slate-400">
                          <span className="bg-purple-600/20 px-2 py-1 rounded">{note.note_type}</span>
                          {relatedInscription && (
                            <span className={`px-2 py-1 rounded flex items-center gap-1 ${hasGeoPosition ? 'bg-blue-600/20' : 'bg-orange-600/20'}`}>
                              {!hasGeoPosition && <AlertCircle className="h-3 w-3" />}
                              {relatedInscription.signum}
                            </span>
                          )}
                          {note.is_public && (
                            <span className="bg-green-600/20 px-2 py-1 rounded">Offentlig</span>
                          )}
                          <span className="bg-slate-600/20 px-2 py-1 rounded text-xs">
                            {noteOwner}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(note)}
                          className="border-white/10 text-white hover:bg-white/5"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(note.id)}
                          className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-slate-300 whitespace-pre-wrap">{note.content}</div>
                    {note.methodology && (
                      <div className="mt-4 p-3 bg-blue-600/10 rounded-lg border border-blue-500/20">
                        <h4 className="text-blue-300 font-semibold mb-2">Metodologi:</h4>
                        <p className="text-slate-300 text-sm">{note.methodology}</p>
                      </div>
                    )}
                    <div className="mt-4 text-xs text-slate-500">
                      Skapad: {new Date(note.created_at).toLocaleDateString('sv-SE')}
                      {note.updated_at !== note.created_at && (
                        <> • Uppdaterad: {new Date(note.updated_at).toLocaleDateString('sv-SE')}</>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
