import { useState } from "react";
import { useInterviewContext } from "@/contexts/InterviewContext";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Result } from "@shared/schema";

export function useSymptomCheck() {
  const [isLoading, setIsLoading] = useState(false);
  const { interviewData, updateResults } = useInterviewContext();
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const validateInterviewData = () => {
    if (!interviewData.basicInfo) {
      toast({
        title: "Missing basic information",
        description: "Please complete the basic information section first.",
        variant: "destructive",
      });
      navigate("/interview/basic-info");
      return false;
    }

    if (!interviewData.selectedSymptoms || !interviewData.selectedSymptoms.symptoms.length) {
      toast({
        title: "No symptoms selected",
        description: "Please select at least one symptom.",
        variant: "destructive",
      });
      navigate("/interview/main-symptoms");
      return false;
    }

    return true;
  };

  const saveInterviewResults = async (results: Result) => {
    try {
      setIsLoading(true);
      
      // Save to server
      const response = await apiRequest("POST", "/api/interviews", {
        userId: 1, // Mock user ID since we don't have authentication
        basicInfo: interviewData.basicInfo,
        selectedSymptoms: interviewData.selectedSymptoms,
        symptomDetails: interviewData.symptomDetails || {},
        medicalHistory: interviewData.medicalHistory || {},
        results: results,
      });

      if (!response.ok) {
        throw new Error("Failed to save interview results");
      }

      toast({
        title: "Results saved",
        description: "Your symptom check results have been saved.",
      });

      return true;
    } catch (error) {
      console.error("Error saving interview results:", error);
      toast({
        title: "Error saving results",
        description: "There was a problem saving your results. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPreviousResults = async (userId = 1) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/interviews/${userId}`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch previous results");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching previous results:", error);
      toast({
        title: "Error fetching results",
        description: "There was a problem loading your previous results.",
        variant: "destructive",
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    validateInterviewData,
    saveInterviewResults,
    fetchPreviousResults,
  };
}
