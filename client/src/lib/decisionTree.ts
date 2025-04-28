import { symptoms } from "./symptomData";

// Interface for decision tree nodes
export interface DecisionNode {
  id: string;
  question: string;
  type: "checkbox" | "select" | "radio" | "range" | "text";
  options?: string[];
  next?: Record<string, string>;
  conditionalSymptoms?: Record<string, string[]>;
}

// Simple decision tree for symptom questioning
export const decisionTree: Record<string, DecisionNode> = {
  "main_symptoms": {
    id: "main_symptoms",
    question: "What symptoms are you experiencing?",
    type: "checkbox",
    next: {
      "default": "duration"
    }
  },
  "duration": {
    id: "duration",
    question: "How long have you been experiencing these symptoms?",
    type: "radio",
    options: ["today", "2-3_days", "4-7_days", "1+_weeks"],
    next: {
      "default": "severity"
    }
  },
  "severity": {
    id: "severity",
    question: "How severe are your symptoms?",
    type: "range",
    next: {
      "default": "symptom_detail_headache",
      "no_symptoms": "medical_history"
    },
    conditionalSymptoms: {
      "headache": ["symptom_detail_headache"],
      "fever": ["symptom_detail_fever"],
      "chest_pain": ["symptom_detail_chest_pain", "emergency_warning"],
      "shortness_of_breath": ["symptom_detail_breath", "emergency_warning"]
    }
  },
  "symptom_detail_headache": {
    id: "symptom_detail_headache",
    question: "Where is your headache located?",
    type: "select",
    options: ["forehead", "temples", "back_of_head", "all_over", "other"],
    next: {
      "default": "symptom_detail_fever"
    }
  },
  "symptom_detail_fever": {
    id: "symptom_detail_fever",
    question: "What is your temperature?",
    type: "select",
    options: ["below_100F", "100-101F", "102-103F", "above_103F", "not_measured"],
    next: {
      "default": "symptom_detail_chest_pain"
    }
  },
  "symptom_detail_chest_pain": {
    id: "symptom_detail_chest_pain",
    question: "How would you describe your chest pain?",
    type: "select",
    options: ["sharp", "dull", "pressure", "burning", "no_chest_pain"],
    next: {
      "default": "symptom_detail_breath"
    }
  },
  "symptom_detail_breath": {
    id: "symptom_detail_breath",
    question: "When do you experience shortness of breath?",
    type: "select",
    options: ["at_rest", "with_activity", "lying_down", "all_the_time", "no_shortness_of_breath"],
    next: {
      "default": "medical_history"
    }
  },
  "emergency_warning": {
    id: "emergency_warning",
    question: "Warning: Chest pain and shortness of breath can be signs of a serious medical condition. If severe, please seek immediate medical attention.",
    type: "text",
    next: {
      "default": "medical_history"
    }
  },
  "medical_history": {
    id: "medical_history",
    question: "Do you have any of these pre-existing conditions?",
    type: "checkbox",
    options: [
      "hypertension", 
      "diabetes", 
      "asthma", 
      "heart_disease", 
      "lung_disease", 
      "autoimmune_disorder",
      "none"
    ],
    next: {
      "default": "medications"
    }
  },
  "medications": {
    id: "medications",
    question: "Are you currently taking any medications?",
    type: "text",
    next: {
      "default": "results"
    }
  },
  "results": {
    id: "results",
    question: "Based on your symptoms, here are the possible conditions:",
    type: "text",
    next: {}
  }
};

// Get next node based on current node and selected answers
export const getNextNode = (
  currentNodeId: string,
  selectedOptions: Record<string, any>
): string => {
  const currentNode = decisionTree[currentNodeId];
  
  if (!currentNode || !currentNode.next) {
    return "results";
  }
  
  // Check if there are conditional paths based on symptoms
  if (currentNode.conditionalSymptoms && selectedOptions.symptoms) {
    for (const [symptom, nextNodes] of Object.entries(currentNode.conditionalSymptoms)) {
      if (selectedOptions.symptoms.includes(symptom)) {
        return nextNodes[0]; // Return the first conditional node
      }
    }
  }
  
  // If no conditional paths or conditions not met, use default path
  return currentNode.next.default || "results";
};

// Get all relevant questions for a set of symptoms
export const getRelevantQuestions = (
  selectedSymptomIds: string[]
): string[] => {
  const questions: string[] = ["main_symptoms", "duration", "severity"];
  
  // Add symptom-specific questions
  for (const symptomId of selectedSymptomIds) {
    // Find all nodes that might be conditionally related to this symptom
    Object.values(decisionTree).forEach(node => {
      if (node.conditionalSymptoms && node.conditionalSymptoms[symptomId]) {
        questions.push(...node.conditionalSymptoms[symptomId]);
      }
    });
  }
  
  // Always include medical history questions
  questions.push("medical_history", "medications", "results");
  
  // Remove duplicates and return
  return [...new Set(questions)];
};
