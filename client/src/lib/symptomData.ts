export interface Symptom {
  id: string;
  name: string;
  description: string;
  locations?: string[];
  bodySystems?: string[];
  attributes?: string[];
}

export const symptoms: Symptom[] = [
  {
    id: "headache",
    name: "Headache",
    description: "Pain or discomfort in the head, scalp, or neck",
    locations: ["head", "scalp", "neck"],
    bodySystems: ["nervous"],
    attributes: ["pain", "pressure", "throbbing"]
  },
  {
    id: "fever",
    name: "Fever",
    description: "Elevated body temperature above normal (98.6°F/37°C)",
    bodySystems: ["immune"],
    attributes: ["hot", "chills", "sweating"]
  },
  {
    id: "cough",
    name: "Cough",
    description: "Sudden expulsion of air from the lungs",
    locations: ["chest", "throat"],
    bodySystems: ["respiratory"],
    attributes: ["dry", "productive", "persistent"]
  },
  {
    id: "fatigue",
    name: "Fatigue",
    description: "Extreme tiredness resulting from mental or physical exertion",
    bodySystems: ["musculoskeletal", "nervous"],
    attributes: ["weakness", "exhaustion", "lack of energy"]
  },
  {
    id: "sore_throat",
    name: "Sore Throat",
    description: "Pain or irritation in the throat that worsens when swallowing",
    locations: ["throat"],
    bodySystems: ["respiratory"],
    attributes: ["pain", "irritation", "difficulty swallowing"]
  },
  {
    id: "shortness_of_breath",
    name: "Shortness of Breath",
    description: "Difficult or labored breathing",
    locations: ["chest", "lungs"],
    bodySystems: ["respiratory"],
    attributes: ["gasping", "wheezing", "suffocation"]
  },
  {
    id: "chest_pain",
    name: "Chest Pain",
    description: "Discomfort or pain in the chest area",
    locations: ["chest"],
    bodySystems: ["cardiovascular", "respiratory"],
    attributes: ["pressure", "tightness", "sharp", "stabbing"]
  },
  {
    id: "nausea",
    name: "Nausea",
    description: "Sensation of unease and discomfort in the stomach with an urge to vomit",
    locations: ["abdomen", "stomach"],
    bodySystems: ["digestive"],
    attributes: ["queasy", "sick feeling", "upset stomach"]
  },
  {
    id: "vomiting",
    name: "Vomiting",
    description: "Forceful expulsion of stomach contents through the mouth",
    locations: ["abdomen", "stomach"],
    bodySystems: ["digestive"],
    attributes: ["throwing up", "regurgitation"]
  },
  {
    id: "diarrhea",
    name: "Diarrhea",
    description: "Loose, watery stools occurring more frequently than usual",
    locations: ["abdomen", "bowel"],
    bodySystems: ["digestive"],
    attributes: ["loose stool", "frequent bowel movements", "urgency"]
  },
  {
    id: "abdominal_pain",
    name: "Abdominal Pain",
    description: "Pain felt between the chest and groin",
    locations: ["abdomen", "stomach", "bowel"],
    bodySystems: ["digestive"],
    attributes: ["cramping", "sharp", "dull", "intermittent", "constant"]
  },
  {
    id: "rash",
    name: "Rash",
    description: "Change in the skin's color, appearance, or texture",
    locations: ["skin"],
    bodySystems: ["integumentary"],
    attributes: ["itchy", "red", "bumps", "swelling"]
  },
  {
    id: "joint_pain",
    name: "Joint Pain",
    description: "Discomfort, aches, or soreness in any of the body's joints",
    locations: ["joints"],
    bodySystems: ["musculoskeletal"],
    attributes: ["aching", "stiffness", "swelling", "limited mobility"]
  },
  {
    id: "muscle_pain",
    name: "Muscle Pain",
    description: "Pain affecting a muscle or group of muscles",
    locations: ["muscles"],
    bodySystems: ["musculoskeletal"],
    attributes: ["aching", "cramping", "tenderness"]
  },
  {
    id: "dizziness",
    name: "Dizziness",
    description: "Sensation of being lightheaded, woozy, or unbalanced",
    locations: ["head"],
    bodySystems: ["nervous", "cardiovascular"],
    attributes: ["lightheaded", "vertigo", "faintness"]
  },
  {
    id: "nasal_congestion",
    name: "Nasal Congestion",
    description: "Stuffy nose caused by inflamed blood vessels in the sinuses",
    locations: ["nose", "sinuses"],
    bodySystems: ["respiratory"],
    attributes: ["stuffy", "blocked", "pressure"]
  },
  {
    id: "runny_nose",
    name: "Runny Nose",
    description: "Excessive discharge of fluid from the nose",
    locations: ["nose"],
    bodySystems: ["respiratory"],
    attributes: ["discharge", "dripping", "rhinorrhea"]
  },
  {
    id: "sinus_pressure",
    name: "Sinus Pressure",
    description: "Feeling of fullness, pressure or pain in the sinuses",
    locations: ["sinuses", "face"],
    bodySystems: ["respiratory"],
    attributes: ["pressure", "pain", "fullness"]
  }
];

export const symptomsBySystem: Record<string, Symptom[]> = symptoms.reduce(
  (acc, symptom) => {
    symptom.bodySystems?.forEach((system) => {
      if (!acc[system]) {
        acc[system] = [];
      }
      acc[system].push(symptom);
    });
    return acc;
  },
  {} as Record<string, Symptom[]>
);

export const getSymptomById = (id: string): Symptom | undefined => {
  return symptoms.find((symptom) => symptom.id === id);
};

export const getSymptomsByIds = (ids: string[]): Symptom[] => {
  return symptoms.filter((symptom) => ids.includes(symptom.id));
};
