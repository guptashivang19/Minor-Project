import { Result } from "@shared/schema";

export interface Condition {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  urgencyLevel: "non_urgent" | "routine" | "prompt" | "urgent" | "emergency";
  bodySystems: string[];
  recommendations: string[];
}

export const conditions: Condition[] = [
  {
    id: "common_cold",
    name: "Common Cold",
    description: "A viral infection of the upper respiratory tract. Usually harmless and resolves in 7-10 days.",
    symptoms: ["headache", "nasal_congestion", "runny_nose", "sore_throat", "cough", "fatigue"],
    urgencyLevel: "non_urgent",
    bodySystems: ["respiratory"],
    recommendations: [
      "Rest and drink plenty of fluids",
      "Over-the-counter cold medications may help relieve symptoms",
      "Use a humidifier to add moisture to the air",
      "Gargle with salt water to soothe a sore throat"
    ]
  },
  {
    id: "influenza",
    name: "Influenza (Flu)",
    description: "A contagious respiratory illness caused by influenza viruses that infect the nose, throat, and lungs.",
    symptoms: ["fever", "headache", "fatigue", "cough", "sore_throat", "muscle_pain", "nasal_congestion"],
    urgencyLevel: "routine",
    bodySystems: ["respiratory", "immune"],
    recommendations: [
      "Rest and stay hydrated",
      "Take over-the-counter medications for fever and pain",
      "Consult a doctor about antiviral medications if within 48 hours of symptom onset",
      "Stay home to avoid spreading the illness"
    ]
  },
  {
    id: "covid_19",
    name: "COVID-19",
    description: "A respiratory illness caused by the SARS-CoV-2 virus that can range from mild to severe.",
    symptoms: ["fever", "cough", "fatigue", "shortness_of_breath", "headache", "sore_throat", "loss_of_taste", "loss_of_smell"],
    urgencyLevel: "prompt",
    bodySystems: ["respiratory", "immune"],
    recommendations: [
      "Isolate from others to prevent spread",
      "Rest and stay hydrated",
      "Monitor your symptoms closely",
      "Seek medical attention if you have trouble breathing or persistent chest pain"
    ]
  },
  {
    id: "migraine",
    name: "Migraine",
    description: "A headache of varying intensity, often accompanied by nausea and sensitivity to light and sound.",
    symptoms: ["headache", "nausea", "vomiting", "light_sensitivity", "sound_sensitivity"],
    urgencyLevel: "routine",
    bodySystems: ["nervous"],
    recommendations: [
      "Rest in a quiet, dark room",
      "Apply hot or cold compresses to your head or neck",
      "Drink plenty of fluids",
      "Consider over-the-counter pain relievers or prescription medications"
    ]
  },
  {
    id: "allergic_rhinitis",
    name: "Allergic Rhinitis (Hay Fever)",
    description: "An allergic response causing cold-like symptoms such as sneezing, itchy eyes, and runny nose.",
    symptoms: ["nasal_congestion", "runny_nose", "sneezing", "itchy_eyes", "sinus_pressure"],
    urgencyLevel: "non_urgent",
    bodySystems: ["respiratory", "immune"],
    recommendations: [
      "Avoid allergen triggers",
      "Try over-the-counter antihistamines or nasal steroids",
      "Keep windows closed during high pollen seasons",
      "Use air purifiers to reduce indoor allergens"
    ]
  },
  {
    id: "bronchitis",
    name: "Bronchitis",
    description: "Inflammation of the lining of the bronchial tubes, which carry air to and from the lungs.",
    symptoms: ["cough", "fatigue", "shortness_of_breath", "chest_pain", "fever"],
    urgencyLevel: "prompt",
    bodySystems: ["respiratory"],
    recommendations: [
      "Rest and stay hydrated",
      "Use a humidifier to add moisture to the air",
      "Take over-the-counter pain relievers for fever and discomfort",
      "Consult a doctor if symptoms last more than 3 weeks or are severe"
    ]
  },
  {
    id: "gastroenteritis",
    name: "Gastroenteritis (Stomach Flu)",
    description: "Inflammation of the stomach and intestines, typically from a viral infection or bacteria.",
    symptoms: ["nausea", "vomiting", "diarrhea", "abdominal_pain", "fever", "headache"],
    urgencyLevel: "routine",
    bodySystems: ["digestive"],
    recommendations: [
      "Stay hydrated with small sips of clear liquids",
      "Avoid solid foods until vomiting stops",
      "Gradually reintroduce bland foods",
      "Seek medical attention if unable to keep fluids down or have signs of dehydration"
    ]
  },
  {
    id: "hypertension",
    name: "Hypertension (High Blood Pressure)",
    description: "A common condition where the force of blood against artery walls is consistently too high.",
    symptoms: ["headache", "dizziness", "shortness_of_breath", "chest_pain"],
    urgencyLevel: "prompt",
    bodySystems: ["cardiovascular"],
    recommendations: [
      "Monitor blood pressure regularly",
      "Maintain a healthy diet low in salt",
      "Exercise regularly",
      "Consult with a healthcare provider about medication options"
    ]
  },
  {
    id: "pneumonia",
    name: "Pneumonia",
    description: "Infection that inflames air sacs in one or both lungs, which may fill with fluid.",
    symptoms: ["cough", "fever", "shortness_of_breath", "chest_pain", "fatigue"],
    urgencyLevel: "urgent",
    bodySystems: ["respiratory"],
    recommendations: [
      "Seek medical attention promptly",
      "Take prescribed antibiotics if bacterial pneumonia",
      "Rest and stay hydrated",
      "Follow up with your doctor to ensure the infection is cleared"
    ]
  },
  {
    id: "heart_attack",
    name: "Heart Attack",
    description: "Occurs when blood flow to part of the heart is blocked, causing damage to the heart muscle.",
    symptoms: ["chest_pain", "shortness_of_breath", "nausea", "cold_sweat", "dizziness", "fatigue"],
    urgencyLevel: "emergency",
    bodySystems: ["cardiovascular"],
    recommendations: [
      "Call emergency services (911) immediately",
      "Chew aspirin if advised by emergency personnel",
      "Rest in a position that makes breathing easier",
      "Perform CPR if the person is unconscious and not breathing normally"
    ]
  }
];

export const getConditionById = (id: string): Condition | undefined => {
  return conditions.find((condition) => condition.id === id);
};

export const predictConditions = (
  symptoms: string[],
  age: number,
  gender: string
): Result => {
  const matchedConditions: Result["conditions"] = [];
  
  for (const condition of conditions) {
    // Calculate how many symptoms match
    const matchingSymptoms = symptoms.filter(s => condition.symptoms.includes(s));
    const matchPercentage = matchingSymptoms.length / condition.symptoms.length * 100;
    
    if (matchingSymptoms.length > 0) {
      // Determine severity based on match percentage and condition
      let severity: "mild" | "moderate" | "significant" | "severe";
      
      if (matchPercentage < 30) {
        severity = "mild";
      } else if (matchPercentage < 50) {
        severity = "moderate";
      } else if (matchPercentage < 75) {
        severity = "significant";
      } else {
        severity = "severe";
      }
      
      // Adjust severity based on age for certain conditions
      if (age > 65 && ["pneumonia", "heart_attack", "covid_19"].includes(condition.id)) {
        // Increase severity for elderly with serious conditions
        severity = "severe";
      }
      
      // Only include conditions with at least some match
      if (matchPercentage > 20) {
        matchedConditions.push({
          name: condition.name,
          confidence: Math.round(matchPercentage),
          severity,
          description: condition.description,
          recommendations: condition.recommendations
        });
      }
    }
  }
  
  // Sort conditions by confidence score (descending)
  matchedConditions.sort((a, b) => b.confidence - a.confidence);
  
  // Determine overall urgency based on highest severity condition
  let urgency: Result["urgency"] = "non_urgent";
  
  if (matchedConditions.some(c => c.severity === "severe")) {
    urgency = "urgent";
  } else if (matchedConditions.some(c => c.severity === "significant")) {
    urgency = "prompt";
  } else if (matchedConditions.some(c => c.severity === "moderate")) {
    urgency = "routine";
  }
  
  // Generate general recommendations
  const generalRecommendations: string[] = [
    "Consult with a healthcare provider for a proper diagnosis",
    "Monitor your symptoms and seek medical attention if they worsen",
    "Maintain adequate hydration and rest"
  ];
  
  // Add severity-specific recommendations
  if (urgency === "urgent") {
    generalRecommendations.unshift("Consider seeking medical attention promptly");
  } else if (urgency === "prompt") {
    generalRecommendations.unshift("Consider scheduling an appointment with your doctor soon");
  }
  
  return {
    conditions: matchedConditions,
    urgency,
    recommendations: generalRecommendations
  };
};
