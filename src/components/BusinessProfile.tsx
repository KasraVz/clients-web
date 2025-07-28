import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ProgressBar } from "./ProgressBar";
import { toast } from "@/hooks/use-toast";

const steps = [
  { id: "register", label: "Register", status: "completed" as const },
  { id: "identity", label: "Identity", status: "completed" as const },
  { id: "profile", label: "Profile", status: "current" as const },
  { id: "complete", label: "Complete", status: "upcoming" as const },
];

const industries = [
  "AI & Machine Learning",
  "Biotech",
  "SaaS",
  "Fintech",
  "E-commerce",
  "Healthcare",
  "CleanTech",
  "EdTech",
  "Gaming",
  "IoT",
  "Cybersecurity",
  "Food & Beverage",
  "Real Estate",
  "Transportation",
  "Entertainment",
  "Other"
];

const ecosystems = [
  "Silicon Valley",
  "London",
  "Berlin",
  "Tel Aviv",
  "Singapore",
  "Toronto",
  "Sydney",
  "Boston",
  "New York",
  "Paris",
  "Stockholm",
  "Amsterdam",
  "Other"
];

const fundingSources = [
  "Personal",
  "Family",
  "Grants",
  "Angel",
  "VC",
  "Revenue",
  "Loans",
  "Bootstrapped"
];

const ecosystemExperience = [
  "Previous Founder",
  "Incubator Experience",
  "VC/Angel",
  "Mentor",
  "Community Involvement",
  "No Experience"
];

const reasonsForPlatform = [
  "Assess capabilities",
  "Gain certification",
  "Benchmark",
  "Training needs",
  "Other"
];

export const BusinessProfile = () => {
  const [formData, setFormData] = useState({
    industry: "",
    developmentStage: "",
    scientificBackground: "",
    ecosystemExperience: [] as string[],
    targetEcosystem: "",
    mostExperiencedEcosystem: "",
    teamSize: "",
    spending: "",
    fundingSources: [] as string[],
    reasonForPlatform: "",
  });

  const navigate = useNavigate();

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.industry || !formData.developmentStage || !formData.scientificBackground) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Profile submitted!",
      description: "Your business profile has been submitted successfully.",
    });
    
    // Navigate to secure account
    navigate("/secure-account");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <ProgressBar steps={steps} />
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Business Profile</CardTitle>
            <p className="text-center text-muted-foreground">
              Thank you for your interest in our certification program! Please complete the following profile to help us understand your startup better.
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="grid gap-6">
              
              {/* Primary Industry */}
              <div className="space-y-2">
                <Label>Startup's Primary Industry *</Label>
                <Select value={formData.industry} onValueChange={(value) => handleSelectChange("industry", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Development Stage */}
              <div className="space-y-3">
                <Label>Development Stage *</Label>
                <RadioGroup value={formData.developmentStage} onValueChange={(value) => handleSelectChange("developmentStage", value)}>
                  {["Idea", "MVP", "Traction", "Revenue", "Scaling", "Established"].map((stage) => (
                    <div key={stage} className="flex items-center space-x-2">
                      <RadioGroupItem value={stage} id={`stage-${stage}`} />
                      <Label htmlFor={`stage-${stage}`}>{stage}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Scientific Background */}
              <div className="space-y-3">
                <Label>Scientific Background *</Label>
                <RadioGroup value={formData.scientificBackground} onValueChange={(value) => handleSelectChange("scientificBackground", value)}>
                  {[
                    { value: "strong", label: "Strong (PhD)" },
                    { value: "significant", label: "Significant (Master's)" },
                    { value: "some", label: "Some (Bachelor's)" },
                    { value: "none", label: "None" }
                  ].map((bg) => (
                    <div key={bg.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={bg.value} id={`bg-${bg.value}`} />
                      <Label htmlFor={`bg-${bg.value}`}>{bg.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Ecosystem Experience */}
              <div className="space-y-3">
                <Label>Ecosystem Experience</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {ecosystemExperience.map((exp) => (
                    <div key={exp} className="flex items-center space-x-2">
                      <Checkbox
                        id={`exp-${exp}`}
                        checked={formData.ecosystemExperience.includes(exp)}
                        onCheckedChange={(checked) => handleCheckboxChange("ecosystemExperience", exp, checked as boolean)}
                      />
                      <Label htmlFor={`exp-${exp}`}>{exp}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Ecosystem */}
              <div className="space-y-2">
                <Label>Target Ecosystem</Label>
                <Select value={formData.targetEcosystem} onValueChange={(value) => handleSelectChange("targetEcosystem", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target ecosystem" />
                  </SelectTrigger>
                  <SelectContent>
                    {ecosystems.map((ecosystem) => (
                      <SelectItem key={ecosystem} value={ecosystem}>{ecosystem}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Most Experienced Ecosystem */}
              <div className="space-y-2">
                <Label>Most Experienced Ecosystem</Label>
                <Select value={formData.mostExperiencedEcosystem} onValueChange={(value) => handleSelectChange("mostExperiencedEcosystem", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select most experienced ecosystem" />
                  </SelectTrigger>
                  <SelectContent>
                    {ecosystems.map((ecosystem) => (
                      <SelectItem key={ecosystem} value={ecosystem}>{ecosystem}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Team Size */}
              <div className="space-y-3">
                <Label>Current Team Size</Label>
                <RadioGroup value={formData.teamSize} onValueChange={(value) => handleSelectChange("teamSize", value)}>
                  {["Founders only", "1–5", "6–15", "16+"].map((size) => (
                    <div key={size} className="flex items-center space-x-2">
                      <RadioGroupItem value={size} id={`size-${size}`} />
                      <Label htmlFor={`size-${size}`}>{size}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Spending */}
              <div className="space-y-3">
                <Label>Spending</Label>
                <RadioGroup value={formData.spending} onValueChange={(value) => handleSelectChange("spending", value)}>
                  {["< £1,000", "£1k–5k", "£5k–20k", "> £20k"].map((amount) => (
                    <div key={amount} className="flex items-center space-x-2">
                      <RadioGroupItem value={amount} id={`spending-${amount}`} />
                      <Label htmlFor={`spending-${amount}`}>{amount}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Funding Sources */}
              <div className="space-y-3">
                <Label>Funding Sources</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {fundingSources.map((source) => (
                    <div key={source} className="flex items-center space-x-2">
                      <Checkbox
                        id={`funding-${source}`}
                        checked={formData.fundingSources.includes(source)}
                        onCheckedChange={(checked) => handleCheckboxChange("fundingSources", source, checked as boolean)}
                      />
                      <Label htmlFor={`funding-${source}`}>{source}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reason for Platform */}
              <div className="space-y-2">
                <Label>Reason for Using Platform</Label>
                <Select value={formData.reasonForPlatform} onValueChange={(value) => handleSelectChange("reasonForPlatform", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {reasonsForPlatform.map((reason) => (
                      <SelectItem key={reason} value={reason}>{reason}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full h-12 text-base font-medium">
                  Submit Profile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};