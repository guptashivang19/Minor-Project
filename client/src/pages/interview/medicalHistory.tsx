import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StepIndicator } from "@/components/ui/stepIndicator";
import MedicalDisclaimer from "@/components/medicalDisclaimer";
import { useInterviewContext } from "@/contexts/InterviewContext";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function MedicalHistory() {
  const [, navigate] = useLocation();
  const { interviewData, updateMedicalHistory } = useInterviewContext();
  const [conditions, setConditions] = useState<string[]>(interviewData.medicalHistory?.conditions || []);
  const [medications, setMedications] = useState<string[]>(interviewData.medicalHistory?.medications || []);
  const [medicationText, setMedicationText] = useState<string>("");
  const [allergies, setAllergies] = useState<string[]>(interviewData.medicalHistory?.allergies || []);
  const [allergyText, setAllergyText] = useState<string>("");
  const [familyHistory, setFamilyHistory] = useState<string[]>(interviewData.medicalHistory?.familyHistory || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePrevious = () => {
    navigate("/interview/symptom-details");
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    try {
      // Process text inputs into arrays if provided
      let processedMedications = [...medications];
      if (medicationText.trim()) {
        const medicationsFromText = medicationText
          .split(",")
          .map(item => item.trim())
          .filter(item => item.length > 0);
        processedMedications = [...processedMedications, ...medicationsFromText];
      }
      
      let processedAllergies = [...allergies];
      if (allergyText.trim()) {
        const allergiesFromText = allergyText
          .split(",")
          .map(item => item.trim())
          .filter(item => item.length > 0);
        processedAllergies = [...processedAllergies, ...allergiesFromText];
      }
      
      updateMedicalHistory({
        conditions,
        medications: processedMedications,
        allergies: processedAllergies,
        familyHistory,
      });
      
      navigate("/interview/results");
    } catch (error) {
      console.error("Error saving medical history:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const conditionOptions = [
    { id: "hypertension", label: "Hypertension (High Blood Pressure)" },
    { id: "diabetes", label: "Diabetes" },
    { id: "asthma", label: "Asthma" },
    { id: "heart_disease", label: "Heart Disease" },
    { id: "cancer", label: "Cancer" },
    { id: "arthritis", label: "Arthritis" },
    { id: "depression", label: "Depression/Anxiety" },
    { id: "thyroid", label: "Thyroid Disorder" },
    { id: "none", label: "None of the above" },
  ];

  const familyHistoryOptions = [
    { id: "heart_disease", label: "Heart Disease" },
    { id: "diabetes", label: "Diabetes" },
    { id: "cancer", label: "Cancer" },
    { id: "stroke", label: "Stroke" },
    { id: "hypertension", label: "Hypertension" },
    { id: "alzheimers", label: "Alzheimer's Disease" },
    { id: "none", label: "None of the above" },
  ];

  const stepLabels = ["Basic Info", "Main Symptoms", "Details", "History", "Results"];
  const stepIcons = ["fa-user-circle", "fa-question-circle", "fa-clipboard-list", "fa-history", "fa-notes-medical"];

  return (
    <div>
      <MedicalDisclaimer />
      
      <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <CardContent className="p-6">
          <StepIndicator 
            currentStep={4} 
            totalSteps={5} 
            stepLabels={stepLabels}
            stepIcons={stepIcons}
            onSelectStep={(step) => {
              if (step === 0) navigate("/interview/basic-info");
              if (step === 1) navigate("/interview/main-symptoms");
              if (step === 2) navigate("/interview/symptom-details");
            }}
          />
          
          <div className="step-transition">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Medical History</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              This information helps us provide a more accurate assessment of your symptoms.
            </p>
            
            <Alert variant="info" className="mb-6 bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                All information is kept confidential and is only used for this symptom assessment.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-3 dark:text-white">
                  Do you have any of these pre-existing conditions?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {conditionOptions.map((condition) => (
                    <div key={condition.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`condition-${condition.id}`}
                        checked={conditions.includes(condition.id)}
                        onCheckedChange={(checked) => {
                          if (condition.id === "none") {
                            // If "None" is selected, clear all other selections
                            setConditions(checked ? ["none"] : []);
                          } else {
                            // If any other condition is selected, remove "None" if present
                            let newConditions = [...conditions];
                            if (checked) {
                              newConditions = newConditions.filter(c => c !== "none");
                              newConditions.push(condition.id);
                            } else {
                              newConditions = newConditions.filter(c => c !== condition.id);
                            }
                            setConditions(newConditions);
                          }
                        }}
                      />
                      <Label htmlFor={`condition-${condition.id}`}>{condition.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3 dark:text-white">
                  Are you currently taking any medications?
                </h3>
                <Textarea
                  value={medicationText}
                  onChange={(e) => setMedicationText(e.target.value)}
                  placeholder="Enter medications, separated by commas..."
                  className="w-full px-3 py-2 border rounded-md focus:ring-primary"
                  rows={2}
                />
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3 dark:text-white">
                  Do you have any allergies?
                </h3>
                <Textarea
                  value={allergyText}
                  onChange={(e) => setAllergyText(e.target.value)}
                  placeholder="Enter allergies, separated by commas..."
                  className="w-full px-3 py-2 border rounded-md focus:ring-primary"
                  rows={2}
                />
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3 dark:text-white">
                  Does your family have a history of any of these conditions?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {familyHistoryOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`family-${option.id}`}
                        checked={familyHistory.includes(option.id)}
                        onCheckedChange={(checked) => {
                          if (option.id === "none") {
                            // If "None" is selected, clear all other selections
                            setFamilyHistory(checked ? ["none"] : []);
                          } else {
                            // If any other option is selected, remove "None" if present
                            let newHistory = [...familyHistory];
                            if (checked) {
                              newHistory = newHistory.filter(h => h !== "none");
                              newHistory.push(option.id);
                            } else {
                              newHistory = newHistory.filter(h => h !== option.id);
                            }
                            setFamilyHistory(newHistory);
                          }
                        }}
                      />
                      <Label htmlFor={`family-${option.id}`}>{option.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600"
              >
                <i className="fas fa-arrow-left mr-1"></i> Previous
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                className="bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                Get Results <i className="fas fa-arrow-right ml-1"></i>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
