import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, User, Users, Handshake, Building } from "lucide-react";
import { ProgressBar } from "./ProgressBar";

const pathOptions = [
  {
    id: "single-founder",
    title: "Single Startup Founder",
    description: "Individual founder building a startup",
    icon: User,
    tooltip: "Perfect for solo entrepreneurs who are building their startup independently",
  },
  {
    id: "team-founder",
    title: "Startup Team Founder",
    description: "Part of a founding team",
    icon: Users,
    tooltip: "Ideal for founders who are part of a founding team with co-founders",
  },
  {
    id: "individual-partner",
    title: "Individual Partner",
    description: "Individual looking to partner",
    icon: Handshake,
    tooltip: "For professionals seeking partnership opportunities with startups",
  },
  {
    id: "entity-partner",
    title: "Entity Partner",
    description: "Organization or entity partnership",
    icon: Building,
    tooltip: "For companies, VCs, accelerators, or other entities seeking partnerships",
  },
];

const steps = [
  { id: "register", label: "Register", status: "completed" as const },
  { id: "identity", label: "Identity Data", status: "completed" as const },
  { id: "path", label: "Choose Path", status: "current" as const },
  { id: "profile", label: "Business Profiling", status: "upcoming" as const },
];

export const ChooseYourPath = () => {
  const [selectedPath, setSelectedPath] = useState<string>("");
  const navigate = useNavigate();

  const handleStepClick = (stepId: string) => {
    switch (stepId) {
      case "register":
        navigate("/register");
        break;
      case "identity":
        navigate("/registration-form");
        break;
    }
  };

  const handlePathSelect = (pathId: string) => {
    setSelectedPath(pathId);
    // Store the selected path for later use
    sessionStorage.setItem("selectedPath", pathId);
    
    // Navigate to business profile
    navigate("/business-profile");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <ProgressBar steps={steps} onStepClick={handleStepClick} />
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Choose Your Path</h1>
          <p className="text-xl text-muted-foreground">
            Select the option that best describes your role
          </p>
        </div>

        <TooltipProvider>
          <div className="grid grid-cols-2 gap-6">
            {pathOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <Card
                  key={option.id}
                  className="relative cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group"
                  onClick={() => handlePathSelect(option.id)}
                >
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="absolute top-4 right-4">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{option.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    
                    <div className="flex justify-center">
                      <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="h-12 w-12 text-primary" />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {option.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
};