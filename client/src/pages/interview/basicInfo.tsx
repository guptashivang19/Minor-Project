import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MedicalDisclaimer from "@/components/medicalDisclaimer";
import { StepIndicator } from "@/components/ui/stepIndicator";
import { useInterviewContext } from "@/contexts/InterviewContext";
import { basicInfoSchema } from "@shared/schema";

const formSchema = basicInfoSchema.extend({
  height: z.string().optional(),
  weight: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function BasicInfo() {
  const [, navigate] = useLocation();
  const { interviewData, updateBasicInfo } = useInterviewContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: interviewData.basicInfo?.age || undefined,
      gender: interviewData.basicInfo?.gender || undefined,
      height: interviewData.basicInfo?.height?.toString() || "",
      weight: interviewData.basicInfo?.weight?.toString() || "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Convert string values to numbers where needed
      const processedData = {
        ...data,
        age: Number(data.age),
        height: data.height ? Number(data.height) : undefined,
        weight: data.weight ? Number(data.weight) : undefined,
      };
      
      updateBasicInfo(processedData);
      navigate("/interview/main-symptoms");
    } catch (error) {
      console.error("Error saving basic info:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepLabels = ["Basic Info", "Main Symptoms", "Details", "History", "Results"];
  const stepIcons = ["fa-user-circle", "fa-question-circle", "fa-clipboard-list", "fa-history", "fa-notes-medical"];

  return (
    <div>
      <MedicalDisclaimer />
      
      <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <CardContent className="p-6">
          <StepIndicator 
            currentStep={1} 
            totalSteps={5} 
            stepLabels={stepLabels}
            stepIcons={stepIcons}
          />
          
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2 dark:text-white">Let's start with some basic information</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              This helps us provide more accurate symptom assessment.
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age*</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter your age"
                            min={0}
                            max={120}
                            {...field}
                            value={field.value || ""}
                            onChange={(e) => field.onChange(e.target.valueAsNumber || "")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender*</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height (cm) - Optional</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter your height"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weight (kg) - Optional</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter your weight"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Next"}
                    <i className="fas fa-arrow-right ml-2"></i>
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
