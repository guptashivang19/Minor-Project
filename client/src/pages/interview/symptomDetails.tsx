import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { StepIndicator } from "@/components/ui/stepIndicator";
import MedicalDisclaimer from "@/components/medicalDisclaimer";
import { useInterviewContext } from "@/contexts/InterviewContext";
import { getSymptomById, getSymptomsByIds } from "@/lib/symptomData";
import { Label } from "@/components/ui/label";

export default function SymptomDetails() {
  const [, navigate] = useLocation();
  const { interviewData, updateSymptomDetails } = useInterviewContext();
  const [location, setLocation] = useState<string>(interviewData.symptomDetails?.location || "");
  const [triggers, setTriggers] = useState<string[]>(interviewData.symptomDetails?.triggers || []);
  const [timing, setTiming] = useState<string>(interviewData.symptomDetails?.timing || "");
  const [characteristics, setCharacteristics] = useState<string[]>(
    interviewData.symptomDetails?.characteristics || []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedSymptomIds = interviewData.selectedSymptoms?.symptoms || [];
  const selectedSymptoms = getSymptomsByIds(selectedSymptomIds);
  
  // No symptoms selected, go back to symptom selection
  if (selectedSymptomIds.length === 0 && !interviewData.selectedSymptoms?.otherSymptoms) {
    navigate("/interview/main-symptoms");
    return null;
  }

  const handlePrevious = () => {
    navigate("/interview/main-symptoms");
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    try {
      updateSymptomDetails({
        location,
        triggers,
        timing,
        characteristics,
      });
      
      navigate("/interview/medical-history");
    } catch (error) {
      console.error("Error saving symptom details:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const locationOptions = [
    "head", "chest", "abdomen", "back", "limbs", "joints", "skin", "throat", "not_specific"
  ];

  const triggerOptions = [
    "food", "activity", "stress", "weather", "sleep", "medication", "unknown"
  ];

  const timingOptions = [
    "morning", "afternoon", "evening", "night", "constant", "intermittent", "after_meals", "random"
  ];

  const characteristicOptions = [
    "sharp", "dull", "throbbing", "burning", "itching", "pressure", "tingling", "cramping"
  ];

  const stepLabels = ["Basic Info", "Main Symptoms", "Details", "History", "Results"];
  const stepIcons = ["fa-user-circle", "fa-question-circle", "fa-clipboard-list", "fa-history", "fa-notes-medical"];

  return (
    <div>
      <MedicalDisclaimer />
      
      <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <CardContent className="p-6">
          <StepIndicator 
            currentStep={3} 
            totalSteps={5} 
            stepLabels={stepLabels}
            stepIcons={stepIcons}
            onSelectStep={(step) => {
              if (step === 0) navigate("/interview/basic-info");
              if (step === 1) navigate("/interview/main-symptoms");
            }}
          />
          
          <div className="step-transition">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Tell us more about your symptoms</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              These details help us provide a more accurate assessment.
            </p>
            
            {selectedSymptoms.length > 0 ? (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3 dark:text-white">Your selected symptoms:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSymptoms.map((symptom) => (
                    <span 
                      key={symptom.id}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {symptom.name}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3 dark:text-white">
                  Where are your symptoms located?
                </h3>
                <Select
                  value={location}
                  onValueChange={setLocation}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locationOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3 dark:text-white">
                  What triggers or worsens your symptoms?
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {triggerOptions.map((trigger) => (
                    <div key={trigger} className="flex items-center space-x-2">
                      <Checkbox
                        id={`trigger-${trigger}`}
                        checked={triggers.includes(trigger)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setTriggers((prev) => [...prev, trigger]);
                          } else {
                            setTriggers((prev) => 
                              prev.filter((item) => item !== trigger)
                            );
                          }
                        }}
                      />
                      <Label htmlFor={`trigger-${trigger}`}>
                        {trigger.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3 dark:text-white">
                  When do your symptoms occur?
                </h3>
                <Select
                  value={timing}
                  onValueChange={setTiming}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select timing" />
                  </SelectTrigger>
                  <SelectContent>
                    {timingOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3 dark:text-white">
                  How would you describe your symptoms?
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {characteristicOptions.map((characteristic) => (
                    <div key={characteristic} className="flex items-center space-x-2">
                      <Checkbox
                        id={`char-${characteristic}`}
                        checked={characteristics.includes(characteristic)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setCharacteristics((prev) => [...prev, characteristic]);
                          } else {
                            setCharacteristics((prev) => 
                              prev.filter((item) => item !== characteristic)
                            );
                          }
                        }}
                      />
                      <Label htmlFor={`char-${characteristic}`}>
                        {characteristic.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Label>
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
                Next <i className="fas fa-arrow-right ml-1"></i>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
