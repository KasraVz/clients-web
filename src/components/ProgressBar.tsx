import { cn } from "@/lib/utils";

interface Step {
  id: string;
  label: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface ProgressBarProps {
  steps: Step[];
}

export const ProgressBar = ({ steps }: ProgressBarProps) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                  step.status === 'completed' && "bg-success text-success-foreground",
                  step.status === 'current' && "bg-primary text-primary-foreground",
                  step.status === 'upcoming' && "bg-muted text-muted-foreground"
                )}
              >
                {step.status === 'completed' ? '✓' : index + 1}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium",
                  step.status === 'completed' && "text-success",
                  step.status === 'current' && "text-primary",
                  step.status === 'upcoming' && "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4 h-0.5 bg-border">
                <div
                  className={cn(
                    "h-full transition-all duration-300",
                    step.status === 'completed' ? "bg-success" : "bg-transparent"
                  )}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};