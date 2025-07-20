import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import all your existing pages
import SaintVisionHomepage from "./pages/SaintVisionHomepage";
import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/Pricing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Why from "./pages/Why";
import Help from "./pages/Help";
import Settings from "./pages/Settings";
import Workspace from "./pages/Workspace";
import Console from "./pages/Console";
import CRM from "./pages/CRM";
import PartnerTech from "./pages/PartnerTech";
import NotFound from "./pages/NotFound";
import Upgrade from "./pages/Upgrade";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import Setup from "./pages/Setup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Homepage - Your Beautiful SaintVisionAI Site */}
          <Route path="/" element={<SaintVisionHomepage />} />
          
          {/* Main App Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/why" element={<Why />} />
          <Route path="/help" element={<Help />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/console" element={<Console />} />
          <Route path="/crm" element={<CRM />} />
          <Route path="/partnertech" element={<PartnerTech />} />
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/setup" element={<Setup />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
