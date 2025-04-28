import React, { createContext, useContext, useState, ReactNode } from "react";
import { 
  BasicInfo, 
  SelectedSymptoms, 
  SymptomDetails, 
  MedicalHistory, 
  Result 
} from "@shared/schema";

interface InterviewData {
  basicInfo?: BasicInfo;
  selectedSymptoms?: SelectedSymptoms;
  symptomDetails?: SymptomDetails;
  medicalHistory?: MedicalHistory;
  results?: Result;
}

interface InterviewContextType {
  interviewData: InterviewData;
  updateBasicInfo: (data: BasicInfo) => void;
  updateSymptoms: (data: SelectedSymptoms) => void;
  updateSymptomDetails: (data: SymptomDetails) => void;
  updateMedicalHistory: (data: MedicalHistory) => void;
  updateResults: (data: Result) => void;
  clearInterview: () => void;
}

const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

export function InterviewProvider({ children }: { children: ReactNode }) {
  const [interviewData, setInterviewData] = useState<InterviewData>({});

  const updateBasicInfo = (data: BasicInfo) => {
    setInterviewData((prev) => ({
      ...prev,
      basicInfo: data,
    }));
  };

  const updateSymptoms = (data: SelectedSymptoms) => {
    setInterviewData((prev) => ({
      ...prev,
      selectedSymptoms: data,
    }));
  };

  const updateSymptomDetails = (data: SymptomDetails) => {
    setInterviewData((prev) => ({
      ...prev,
      symptomDetails: data,
    }));
  };

  const updateMedicalHistory = (data: MedicalHistory) => {
    setInterviewData((prev) => ({
      ...prev,
      medicalHistory: data,
    }));
  };

  const updateResults = (data: Result) => {
    setInterviewData((prev) => ({
      ...prev,
      results: data,
    }));
  };

  const clearInterview = () => {
    setInterviewData({});
  };

  return (
    <InterviewContext.Provider
      value={{
        interviewData,
        updateBasicInfo,
        updateSymptoms,
        updateSymptomDetails,
        updateMedicalHistory,
        updateResults,
        clearInterview,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
}

export function useInterviewContext() {
  const context = useContext(InterviewContext);
  if (context === undefined) {
    throw new Error("useInterviewContext must be used within an InterviewProvider");
  }
  return context;
}
