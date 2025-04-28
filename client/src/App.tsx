import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { ThemeProvider } from "next-themes";
import Home from "@/pages/home";
import BasicInfo from "@/pages/interview/basicInfo";
import MainSymptoms from "@/pages/interview/mainSymptoms";
import SymptomDetails from "@/pages/interview/symptomDetails";
import MedicalHistory from "@/pages/interview/medicalHistory";
import Results from "@/pages/interview/results";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { InterviewProvider } from "@/contexts/InterviewContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/interview/basic-info" component={BasicInfo} />
      <Route path="/interview/main-symptoms" component={MainSymptoms} />
      <Route path="/interview/symptom-details" component={SymptomDetails} />
      <Route path="/interview/medical-history" component={MedicalHistory} />
      <Route path="/interview/results" component={Results} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <Toaster />
          <InterviewProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow container mx-auto px-4 py-6 max-w-4xl">
                <Router />
              </main>
              <Footer />
            </div>
          </InterviewProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
