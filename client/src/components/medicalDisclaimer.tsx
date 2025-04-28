import { TriangleAlert } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface MedicalDisclaimerProps {
  className?: string;
}

export default function MedicalDisclaimer({ className = "mb-6" }: MedicalDisclaimerProps) {
  return (
    <Alert 
      variant="warning" 
      className={`bg-amber-500 bg-opacity-10 border-l-4 border-amber-500 text-amber-700 dark:text-amber-300 ${className}`}
    >
      <TriangleAlert className="h-4 w-4" />
      <AlertDescription>
        <p className="text-sm">
          <strong>Medical Disclaimer:</strong> This tool provides information only and is not a substitute for professional medical advice. Always consult with a qualified healthcare provider for medical guidance.
        </p>
      </AlertDescription>
    </Alert>
  );
}
