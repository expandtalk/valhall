
import React from 'react';
import { Header } from '../components/Header';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Footer } from '../components/Footer';
import { RunicExplorerSimple } from '../components/RunicExplorerSimple';
import { ResearchNotes } from '../components/ResearchNotes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { Lock, Brain } from "lucide-react";

const Explore = () => {
  const { user, loading } = useAuth();
  const { isAdmin, loading: roleLoading } = useUserRole();

  if (loading || roleLoading) {
    return (
      <div className="min-h-screen viking-bg flex items-center justify-center">
        <div className="text-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen viking-bg">
      <Header />
      <Breadcrumbs />
      
      <main className="container mx-auto px-4 py-8">
        {/* Main Explorer */}
        <div className="mb-8">
          <RunicExplorerSimple />
        </div>
        
        {/* Only show user tabs when user is logged in */}
        {user && !isAdmin ? (
          <Tabs defaultValue="research-notes" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-card border border-border">
              <TabsTrigger value="ai-analysis" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">AI Analysis</TabsTrigger>
              <TabsTrigger value="research-notes" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Research Notes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ai-analysis">
              <Card className="viking-card">
                <CardHeader className="text-center">
                  <CardTitle className="text-foreground flex items-center justify-center gap-2">
                    <Lock className="h-5 w-5 text-accent" />
                    Administrator Access Required
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    AI analysis tools are currently available only to administrators
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="bg-accent/10 p-6 rounded-lg border border-accent/20 mb-6">
                    <Brain className="h-12 w-12 text-accent mx-auto mb-4" />
                    <h3 className="text-accent font-semibold mb-2">AI-Powered Runic Dating</h3>
                    <p className="text-muted-foreground text-sm">
                      Advanced AI analysis that can date runic inscriptions based on linguistic features, 
                      run types, and historical context using the latest research in runology.
                    </p>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Contact an administrator to get access to these advanced AI analysis features.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="research-notes">
              <ResearchNotes />
            </TabsContent>
          </Tabs>
        ) : null}
      </main>
      
      <Footer />
    </div>
  );
};

export default Explore;
