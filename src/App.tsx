
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Welcome from "./pages/Welcome";
import Explore from "./pages/Explore";
import Inscriptions from "./pages/Inscriptions";
import Artefacts from "./pages/Artefacts";
import Fortresses from "./pages/Fortresses";
import Carvers from "./pages/Carvers";
import VikingNames from "./pages/VikingNames";
import Hundreds from "./pages/Hundreds";
import Parishes from "./pages/Parishes";
import FolkGroups from "./pages/FolkGroups";
import Rivers from "./pages/Rivers";
import Gods from "./pages/Gods";
import GeneticEvents from "./pages/GeneticEvents";
import RoyalChronicles from "./pages/RoyalChronicles";
import Prices from "./pages/Prices";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <LanguageProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/explore" element={<Explore />} />
                
                {/* English routes */}
                <Route path="/inscriptions" element={<Inscriptions />} />
                <Route path="/carvers" element={<Carvers />} />
                <Route path="/artefacts" element={<Artefacts />} />
                <Route path="/viking-names" element={<VikingNames />} />
                <Route path="/hundreds" element={<Hundreds />} />
                <Route path="/parishes" element={<Parishes />} />
                <Route path="/folk-groups" element={<FolkGroups />} />
                <Route path="/rivers" element={<Rivers />} />
                <Route path="/gods" element={<Gods />} />
                <Route path="/genetic-events" element={<GeneticEvents />} />
                <Route path="/royal-chronicles" element={<RoyalChronicles />} />
                <Route path="/fortresses" element={<Fortresses />} />
                
                {/* Swedish routes */}
                <Route path="/sv/runinskrifter" element={<Inscriptions />} />
                <Route path="/sv/ristare" element={<Carvers />} />
                <Route path="/sv/artefakter" element={<Artefacts />} />
                <Route path="/sv/vikinganamn" element={<VikingNames />} />
                <Route path="/sv/harader" element={<Hundreds />} />
                <Route path="/sv/socknar" element={<Parishes />} />
                <Route path="/sv/folkgrupper" element={<FolkGroups />} />
                <Route path="/sv/floder" element={<Rivers />} />
                <Route path="/sv/gudar" element={<Gods />} />
                <Route path="/sv/genetiska-handelser" element={<GeneticEvents />} />
                <Route path="/sv/kungakronikor" element={<RoyalChronicles />} />
                <Route path="/sv/borgar" element={<Fortresses />} />
                
                {/* Other routes */}
                <Route path="/prices" element={<Prices />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </LanguageProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
