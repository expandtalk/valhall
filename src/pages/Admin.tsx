
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Footer } from '../components/Footer';
import { AdminDataManagement } from '../components/AdminDataManagement';
import { SecurityAuditDashboard } from '../components/SecurityAuditDashboard';
import { SignumManagement } from '../components/admin/SignumManagement';
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Settings, Database } from "lucide-react";

const Admin = () => {
  const { user, loading } = useAuth();
  const { isAdmin, loading: roleLoading } = useUserRole();

  if (loading || roleLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <Shield className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-4">Åtkomst nekad</h1>
              <p className="text-slate-300 mb-6">Du måste vara inloggad som administratör för att komma åt denna sida.</p>
              <div className="space-y-3">
                <Link to="/welcome">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Tillbaka till startsidan
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/5">
                    Logga in
                  </Button>
                </Link>
              </div>
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
        {/* Admin header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <Link to="/welcome">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Tillbaka till startsidan
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-white">
              <Settings className="h-5 w-5" />
              <span className="text-lg font-semibold">Admin Panel</span>
            </div>
          </div>
        </div>

        {/* Admin functionality */}
        <Tabs defaultValue="data" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/10 border-white/20">
            <TabsTrigger value="data" className="data-[state=active]:bg-white/20 text-white">
              <Database className="h-4 w-4 mr-2" />
              Data Management
            </TabsTrigger>
            <TabsTrigger value="signum" className="data-[state=active]:bg-white/20 text-white">
              <Settings className="h-4 w-4 mr-2" />
              Signum Management
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-white/20 text-white">
              <Shield className="h-4 w-4 mr-2" />
              Security Audit
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="data" className="mt-6">
            <AdminDataManagement />
          </TabsContent>
          
          <TabsContent value="signum" className="mt-6">
            <div className="bg-white/5 backdrop-blur-md border-white/10 rounded-lg p-6">
              <SignumManagement />
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="mt-6">
            <div className="bg-white/5 backdrop-blur-md border-white/10 rounded-lg p-6">
              <SecurityAuditDashboard />
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
