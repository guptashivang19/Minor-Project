import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StepIndicator } from "@/components/ui/stepIndicator";
import MedicalDisclaimer from "@/components/medicalDisclaimer";
import { useInterviewContext } from "@/contexts/InterviewContext";
import { getSymptomsByIds } from "@/lib/symptomData";
import { predictConditions } from "@/lib/conditionData";
import { cn, mapSeverityToClass, mapUrgencyToClass } from "@/lib/utils";
import { Result } from "@shared/schema";
import { ArrowRight, AlertTriangle, FileText, Stethoscope, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Results() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { interviewData, updateResults, clearInterview } = useInterviewContext();
  const [predictionResult, setPredictionResult] = useState<Result | null>(null);
  const [saving, setSaving] = useState(false);
  
  // Check if we have all required data
  useEffect(() => {
    if (!interviewData.basicInfo || !interviewData.selectedSymptoms) {
      navigate("/interview/basic-info");
      return;
    }
    
    // Generate prediction results
    const symptoms = interviewData.selectedSymptoms.symptoms;
    const age = interviewData.basicInfo.age;
    const gender = interviewData.basicInfo.gender;
    
    if (symptoms && age && gender) {
      const result = predictConditions(symptoms, age, gender);
      setPredictionResult(result);
      updateResults(result);
    }
  }, [interviewData, navigate, updateResults]);
  
  const handleStartNew = () => {
    clearInterview();
    navigate("/interview/basic-info");
  };
  
  const handleSaveResults = async () => {
    if (!predictionResult) return;
    
    setSaving(true);
    try {
      // Save to server (for now it's in-memory storage, no user authentication implemented)
      const response = await apiRequest("POST", "/api/interviews", {
        userId: 1, // Mock user ID
        basicInfo: interviewData.basicInfo,
        selectedSymptoms: interviewData.selectedSymptoms,
        symptomDetails: interviewData.symptomDetails,
        medicalHistory: interviewData.medicalHistory,
        results: predictionResult
      });
      
      if (response.ok) {
        toast({
          title: "Results saved successfully",
          description: "You can access your saved results from your profile.",
        });
      }
    } catch (error) {
      console.error("Error saving results:", error);
      toast({
        title: "Error saving results",
        description: "There was a problem saving your results. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };
  
  const selectedSymptomIds = interviewData.selectedSymptoms?.symptoms || [];
  const selectedSymptoms = getSymptomsByIds(selectedSymptomIds);
  
  const stepLabels = ["Basic Info", "Main Symptoms", "Details", "History", "Results"];
  const stepIcons = ["fa-user-circle", "fa-question-circle", "fa-clipboard-list", "fa-history", "fa-notes-medical"];
  
  if (!predictionResult) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Analyzing your symptoms...</p>
      </div>
    );
  }
  
  return (
    <div>
      <MedicalDisclaimer />
      
      <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg mb-8">
        <CardContent className="p-6">
          <StepIndicator 
            currentStep={5} 
            totalSteps={5} 
            stepLabels={stepLabels}
            stepIcons={stepIcons}
            onSelectStep={(step) => {
              if (step === 0) navigate("/interview/basic-info");
              if (step === 1) navigate("/interview/main-symptoms");
              if (step === 2) navigate("/interview/symptom-details");
              if (step === 3) navigate("/interview/medical-history");
            }}
          />
          
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold mb-2 dark:text-white">Your Symptom Assessment Results</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Based on the information you provided, here are the possible conditions that may be related to your symptoms.
            </p>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium dark:text-white">Overall Assessment</h3>
              <span className={cn(
                "px-3 py-1 rounded-full text-sm font-medium",
                mapUrgencyToClass(predictionResult.urgency)
              )}>
                {predictionResult.urgency.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            </div>
            
            <Card className="border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/30 mb-6">
              <CardContent className="p-4 flex gap-3 items-start">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-amber-800 dark:text-amber-300 text-sm font-medium">
                    Important Notice
                  </p>
                  <p className="text-amber-700 dark:text-amber-400 text-sm mt-1">
                    This assessment is not a diagnosis. The results are based on the information you provided and should be reviewed by a healthcare professional.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              {predictionResult.conditions.length > 0 ? (
                predictionResult.conditions.map((condition, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 flex justify-between items-center border-b">
                      <div className="flex items-center gap-2">
                        <Stethoscope className="h-5 w-5 text-primary" />
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {condition.name}
                        </h4>
                      </div>
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        mapSeverityToClass(condition.severity)
                      )}>
                        {condition.severity.charAt(0).toUpperCase() + condition.severity.slice(1)}
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="mb-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Match Confidence</span>
                          <span className="text-sm font-medium">{condition.confidence}%</span>
                        </div>
                        <Progress value={condition.confidence} className="h-2" />
                      </div>
                      
                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                        {condition.description}
                      </p>
                      
                      {condition.recommendations.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Recommendations:</h5>
                          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {condition.recommendations.map((rec, idx) => (
                              <li key={idx}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <Card className="border-dashed">
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      We couldn't find any specific conditions matching your symptoms. 
                      This doesn't mean there's nothing wrong. If you're concerned, please consult a healthcare professional.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3 dark:text-white">General Recommendations</h3>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
              {predictionResult.recommendations.map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3 dark:text-white">Your Reported Symptoms</h3>
            <div className="flex flex-wrap gap-2">
              {selectedSymptoms.map((symptom) => (
                <span 
                  key={symptom.id}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                >
                  {symptom.name}
                </span>
              ))}
              {interviewData.selectedSymptoms?.otherSymptoms && (
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm">
                  Other: {interviewData.selectedSymptoms.otherSymptoms.substring(0, 20)}
                  {interviewData.selectedSymptoms.otherSymptoms.length > 20 ? '...' : ''}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              onClick={handleStartNew}
              className="border border-gray-300 dark:border-gray-600"
            >
              <FileText className="mr-2 h-4 w-4" /> Start New Assessment
            </Button>
            <Button
              onClick={handleSaveResults}
              className="bg-primary hover:bg-primary/90"
              disabled={saving}
            >
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Saving..." : "Save Results"}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Next Steps
          </CardTitle>
          <CardDescription>What to do with these results</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="bg-primary/10 dark:bg-primary/20 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Review the results</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Take time to read through the potential conditions and recommendations.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="bg-primary/10 dark:bg-primary/20 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Consult a healthcare provider</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Share these results with your doctor for a proper diagnosis and treatment plan.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="bg-primary/10 dark:bg-primary/20 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">3</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Monitor your symptoms</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Keep track of any changes in your symptoms and take note of when they occur.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button variant="link" className="text-primary p-0">
              Find a healthcare provider near you <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
