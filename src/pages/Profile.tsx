
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, User, Save, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Profile {
  id: string;
  email: string;
  full_name: string;
}

interface ResearcherProfile {
  display_name: string;
  institution: string;
  field_of_expertise: string;
  credentials: string;
  bio: string;
  website_url: string;
  orcid_id: string;
}

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [researcherProfile, setResearcherProfile] = useState<ResearcherProfile>({
    display_name: '',
    institution: '',
    field_of_expertise: '',
    credentials: '',
    bio: '',
    website_url: '',
    orcid_id: ''
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      
      // Fetch basic profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      if (profileData) {
        setProfile(profileData);
      }

      // Fetch researcher profile
      const { data: researcherData, error: researcherError } = await supabase
        .from('researcher_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (researcherError && researcherError.code !== 'PGRST116') {
        throw researcherError;
      }

      if (researcherData) {
        setResearcherProfile({
          display_name: researcherData.display_name || '',
          institution: researcherData.institution || '',
          field_of_expertise: researcherData.field_of_expertise || '',
          credentials: researcherData.credentials || '',
          bio: researcherData.bio || '',
          website_url: researcherData.website_url || '',
          orcid_id: researcherData.orcid_id || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Fel",
        description: "Kunde inte hämta profildata",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      // Update basic profile
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email,
          full_name: profile?.full_name || ''
        });

      if (profileError) throw profileError;

      // Update researcher profile
      const { error: researcherError } = await supabase
        .from('researcher_profiles')
        .upsert({
          user_id: user.id,
          ...researcherProfile
        });

      if (researcherError) throw researcherError;

      toast({
        title: "Profil sparad",
        description: "Din profil har uppdaterats"
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Fel",
        description: "Kunde inte spara profilen",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold text-white mb-4">Åtkomst nekad</h1>
              <p className="text-slate-300 mb-6">Du måste vara inloggad för att se din profil.</p>
              <Link to="/auth">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Logga in
                </Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <Breadcrumbs />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Tillbaka till startsidan
            </Button>
          </Link>
        </div>

        <Card className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="h-6 w-6" />
              Min Profil
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveProfile} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Grunduppgifter</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">E-post</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email || ''}
                      disabled
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="full_name" className="text-white">Fullständigt namn</Label>
                    <Input
                      id="full_name"
                      type="text"
                      value={profile?.full_name || ''}
                      onChange={(e) => setProfile(prev => ({ ...prev!, full_name: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Researcher Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Forskarprofil</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="display_name" className="text-white">Visningsnamn</Label>
                    <Input
                      id="display_name"
                      type="text"
                      value={researcherProfile.display_name}
                      onChange={(e) => setResearcherProfile(prev => ({ ...prev, display_name: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="Ditt offentliga namn"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="institution" className="text-white">Institution</Label>
                    <Input
                      id="institution"
                      type="text"
                      value={researcherProfile.institution}
                      onChange={(e) => setResearcherProfile(prev => ({ ...prev, institution: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="Universitet, museum, etc."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="field_of_expertise" className="text-white">Specialområde</Label>
                    <Input
                      id="field_of_expertise"
                      type="text"
                      value={researcherProfile.field_of_expertise}
                      onChange={(e) => setResearcherProfile(prev => ({ ...prev, field_of_expertise: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="Runologi, arkeologi, etc."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="credentials" className="text-white">Kvalifikationer</Label>
                    <Input
                      id="credentials"
                      type="text"
                      value={researcherProfile.credentials}
                      onChange={(e) => setResearcherProfile(prev => ({ ...prev, credentials: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="PhD, Professor, etc."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-white">Biografi</Label>
                  <Textarea
                    id="bio"
                    value={researcherProfile.bio}
                    onChange={(e) => setResearcherProfile(prev => ({ ...prev, bio: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Berätta om din forskning och bakgrund..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website_url" className="text-white">Webbsida</Label>
                    <Input
                      id="website_url"
                      type="url"
                      value={researcherProfile.website_url}
                      onChange={(e) => setResearcherProfile(prev => ({ ...prev, website_url: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="https://example.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="orcid_id" className="text-white">ORCID ID</Label>
                    <Input
                      id="orcid_id"
                      type="text"
                      value={researcherProfile.orcid_id}
                      onChange={(e) => setResearcherProfile(prev => ({ ...prev, orcid_id: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="0000-0000-0000-0000"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sparar...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Spara profil
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
