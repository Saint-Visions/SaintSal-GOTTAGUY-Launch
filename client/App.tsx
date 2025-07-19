import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/Pricing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Console from "./pages/Console";
import PartnerTech from "./pages/PartnerTech";
import Settings from "./pages/Settings";
import Upgrade from "./pages/Upgrade";
import ChromeInstall from "./pages/ChromeInstall";
import CRM from "./pages/CRM";
import AdminClients from "./pages/AdminClients";
import AdminLogs from "./pages/AdminLogs";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import Setup from "./pages/Setup";
import ReferralInvite from "./pages/ReferralInvite";
import Workspace from "./pages/Workspace";
import Help from "./pages/Help";
import Why from "./pages/Why";
import SaintSalYou from "./pages/SaintSalYou";
import Hacp from "./pages/Hacp";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/console" element={<Console />} />
          <Route path="/partnertech" element={<PartnerTech />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/chrome-install" element={<ChromeInstall />} />
          <Route path="/crm" element={<CRM />} />
          <Route path="/admin/clients" element={<AdminClients />} />
          <Route path="/admin/logs" element={<AdminLogs />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/referral/invite" element={<ReferralInvite />} />
          <Route path="/workspace/:slug" element={<Workspace />} />
          <Route path="/help" element={<Help />} />
          <Route path="/why" element={<Why />} />
          <Route path="/saintsal-you" element={<SaintSalYou />} />
          <Route path="/hacp" element={<Hacp />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
