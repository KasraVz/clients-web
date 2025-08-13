import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { EmailRegistry } from "./components/EmailRegistry";
import { EmailVerification } from "./components/EmailVerification";
import { RegistrationForm } from "./components/RegistrationForm";
import { ChooseYourPath } from "./components/ChooseYourPath";
import { BusinessProfile } from "./components/BusinessProfile";
import { IndividualPartnerProfile } from "./components/IndividualPartnerProfile";
import { EntityPartnerProfile } from "./components/EntityPartnerProfile";
import { SecureAccount } from "./components/SecureAccount";
import { Login } from "./components/Login";
import { ForgotPassword } from "./components/ForgotPassword";
import { ResetPassword } from "./components/ResetPassword";
import { IndividualFounderDashboard } from "./components/IndividualFounderDashboard";
import { MasterDetailDashboard } from "./components/MasterDetailDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/email-registry" element={<EmailRegistry />} />
          <Route path="/verify" element={<EmailVerification />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/choose-path" element={<ChooseYourPath />} />
          <Route path="/business-profile" element={<BusinessProfile />} />
          <Route path="/individual-partner-profile" element={<IndividualPartnerProfile />} />
          <Route path="/entity-partner-profile" element={<EntityPartnerProfile />} />
          <Route path="/secure-account" element={<SecureAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/founder-dashboard" element={<IndividualFounderDashboard />} />
          <Route path="/dashboard" element={<MasterDetailDashboard />} />
          <Route path="/welcome" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
