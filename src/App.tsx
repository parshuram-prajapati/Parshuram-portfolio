import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import ParticleBackground from "@/components/ParticleBackground";

import Index from "./pages/Index";
import HireMe from "./pages/HireMe";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>

          {/* 🌌 Global Background */}
          <ParticleBackground />

          {/* 🚦 Routes */}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/hire-me" element={<HireMe />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* 🔔 Toast Providers */}
          <Toaster />
          <Sonner />

        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;