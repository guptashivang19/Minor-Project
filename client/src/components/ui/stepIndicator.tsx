import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
  stepIcons: string[];
  onSelectStep?: (step: number) => void;
}

export function StepIndicator({
  currentStep,
  totalSteps,
  stepLabels,
  stepIcons,
  onSelectStep,
}: StepIndicatorProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-600 dark:text-gray-300">Interview Progress</span>
        <span className="text-sm">
          <span className="font-medium">{currentStep}</span>
          <span className="text-gray-500 dark:text-gray-400">/{totalSteps}</span>
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
        <div
          className="form-progress-bar bg-primary rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <div className="flex mt-6 mb-6 overflow-x-auto py-2 gap-2">
        {stepLabels.map((label, index) => (
          <button
            key={index}
            onClick={() => onSelectStep && index < currentStep && onSelectStep(index)}
            disabled={index >= currentStep}
            className={cn(
              "flex-shrink-0 px-4 py-2 rounded-full flex items-center gap-1",
              index < currentStep
                ? "bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
                : index === currentStep
                ? "bg-primary text-primary-foreground"
                : "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 cursor-not-allowed"
            )}
          >
            <i className={`fas ${stepIcons[index]} mr-1`}></i> {label}
          </button>
        ))}
      </div>
    </div>
  );
}
