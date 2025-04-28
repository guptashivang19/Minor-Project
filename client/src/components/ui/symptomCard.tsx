import { cn } from "@/lib/utils";
import { Symptom } from "@/lib/symptomData";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface SymptomCardProps {
  symptom: Symptom;
  selected: boolean;
  onToggle: (id: string, selected: boolean) => void;
}

export function SymptomCard({ symptom, selected, onToggle }: SymptomCardProps) {
  return (
    <div 
      className={cn(
        "symptom-card bg-white dark:bg-gray-800 border rounded-lg p-4 cursor-pointer hover:shadow-md",
        selected 
          ? "border-primary dark:border-primary" 
          : "border-gray-200 dark:border-gray-700"
      )}
      onClick={() => onToggle(symptom.id, !selected)}
    >
      <div className="flex items-start">
        <div className="mr-3 flex-shrink-0">
          <Checkbox 
            id={`symptom-${symptom.id}`}
            checked={selected}
            onCheckedChange={(checked) => onToggle(symptom.id, !!checked)}
            className="h-5 w-5 rounded border-gray-300 dark:border-gray-600"
          />
        </div>
        <div>
          <Label 
            htmlFor={`symptom-${symptom.id}`}
            className="block font-medium text-gray-900 dark:text-white cursor-pointer"
          >
            {symptom.name}
          </Label>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {symptom.description}
          </p>
        </div>
      </div>
    </div>
  );
}
