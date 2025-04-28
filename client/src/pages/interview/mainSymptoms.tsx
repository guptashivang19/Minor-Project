import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "@/components/ui/stepIndicator";
import { SymptomCard } from "@/components/ui/symptomCard";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import MedicalDisclaimer from "@/components/medicalDisclaimer";
import { useInterviewContext } from "@/contexts/InterviewContext";
import { symptoms } from "@/lib/symptomData";
import { cn } from "@/lib/utils";

export default function MainSymptoms() {
  const [, navigate] = useLocation();
  const { interviewData, updateSymptoms } = useInterviewContext();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(
    interviewData.selectedSymptoms?.symptoms || []
  );
  const [otherSymptoms, setOtherSymptoms] = useState<string>(
    interviewData.selectedSymptoms?.otherSymptoms || ""
  );
  const [duration, setDuration] = useState<string>(
    interviewData.selectedSymptoms?.duration || ""
  );
  const [severity, setSeverity] = useState<number>(
    interviewData.selectedSymptoms?.severity || 5
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSymptomToggle = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedSymptoms((prev) => [...prev, id]);
    } else {
      setSelectedSymptoms((prev) => prev.filter((symptomId) => symptomId !== id));
    }
  };

  const handleDurationSelect = (value: string) => {
    setDuration(value);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    try {
      // Validate that at least one symptom is selected
      if (selectedSymptoms.length === 0 && !otherSymptoms.trim()) {
        alert("Please select at least one symptom or describe your symptoms in the text area.");
        setIsSubmitting(false);
        return;
      }
      
      // Validate duration is selected
      if (!duration) {
        alert("Please select how long you've been experiencing these symptoms.");
        setIsSubmitting(false);
        return;
      }
      
      updateSymptoms({
        symptoms: selectedSymptoms,
        otherSymptoms,
        duration: duration as any,
        severity,
      });
      
      navigate("/interview/symptom-details");
    } catch (error) {
      console.error("Error saving symptoms:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevious = () => {
    navigate("/interview/basic-info");
  };

  const stepLabels = ["Basic Info", "Main Symptoms", "Details", "History", "Results"];
  const stepIcons = ["fa-user-circle", "fa-question-circle", "fa-clipboard-list", "fa-history", "fa-notes-medical"];
  
  const durationOptions = [
    { value: "today", label: "Today" },
    { value: "2-3_days", label: "2-3 Days" },
    { value: "4-7_days", label: "4-7 Days" },
    { value: "1+_weeks", label: "1+ Weeks" },
  ];

  return (
    <div>
      <MedicalDisclaimer />
      
      <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <CardContent className="p-6">
          <StepIndicator 
            currentStep={2} 
            totalSteps={5} 
            stepLabels={stepLabels}
            stepIcons={stepIcons}
            onSelectStep={(step) => {
              if (step === 0) navigate("/interview/basic-info");
            }}
          />
          
          <div className="step-transition">
            <h2 className="text-xl font-bold mb-4 dark:text-white">What symptoms are you experiencing?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Select all symptoms that apply to your current condition.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {symptoms.slice(0, 12).map((symptom) => (
                <SymptomCard
                  key={symptom.id}
                  symptom={symptom}
                  selected={selectedSymptoms.includes(symptom.id)}
                  onToggle={handleSymptomToggle}
                />
              ))}
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 dark:text-white">
                Are there any other symptoms you're experiencing?
              </h3>
              <Textarea
                value={otherSymptoms}
                onChange={(e) => setOtherSymptoms(e.target.value)}
                placeholder="Describe any other symptoms here..."
                className="w-full px-3 py-2 border rounded-md focus:ring-primary"
                rows={3}
              />
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 dark:text-white">
                How long have you been experiencing these symptoms?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {durationOptions.map((option) => (
                  <Button
                    key={option.value}
                    type="button"
                    variant="outline"
                    className={cn(
                      "border rounded-md px-4 py-2 text-center focus:ring-primary",
                      duration === option.value
                        ? "bg-primary/10 border-primary text-primary"
                        : ""
                    )}
                    onClick={() => handleDurationSelect(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 dark:text-white">
                How severe are your symptoms?
              </h3>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Mild</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Severe</span>
                </div>
                <Slider
                  defaultValue={[severity]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(vals) => setSeverity(vals[0])}
                />
                <div className="flex justify-between px-1 text-xs text-gray-500 dark:text-gray-400">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6</span>
                  <span>7</span>
                  <span>8</span>
                  <span>9</span>
                  <span>10</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
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
