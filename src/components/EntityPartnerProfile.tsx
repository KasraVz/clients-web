import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ProgressBar } from "./ProgressBar";
import { toast } from "@/hooks/use-toast";

const steps = [
  { id: "register", label: "Register", status: "completed" as const },
  { id: "identity", label: "Identity", status: "completed" as const },
  { id: "path", label: "Choose Path", status: "completed" as const },
  { id: "profile", label: "Profile", status: "current" as const },
  { id: "complete", label: "Complete", status: "upcoming" as const },
];

const organizationTypes = [
  "Venture Capital Fund",
  "Corporate Venture",
  "Accelerator/Incubator",
  "Government Agency",
  "University/Research Institution",
  "Consulting Firm",
  "Investment Bank",
  "Family Office",
  "Angel Group",
  "Other"
];

const partnershipGoals = [
  "Access to deal flow",
  "Portfolio company support",
  "Due diligence assistance",
  "Market intelligence",
  "Talent identification",
  "Innovation scouting",
  "Strategic partnerships",
  "Research collaboration",
  "Other"
];

const hearAboutOptions = [
  "Industry publication",
  "Conference/Event",
  "Referral from portfolio company",
  "Referral from colleague",
  "LinkedIn",
  "Google Search",
  "Other"
];

export const EntityPartnerProfile = () => {
  const [formData, setFormData] = useState({
    organizationType: "",
    organizationTypeOther: "",
    organizationMission: "",
    partnershipGoals: [] as string[],
    partnershipGoalsOther: "",
    fullName: "",
    jobTitle: "",
    organizationName: "",
    orgEmail: "",
    phone: "",
    website: "",
    hearAbout: "",
    hearAboutOther: "",
    interactedBefore: "",
    spokeWith: "",
    preferredContact: "",
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
    
    if (!formData.organizationType || !formData.fullName || !formData.jobTitle || !formData.organizationName || !formData.orgEmail) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Profile submitted!",
      description: "Your entity partner profile has been submitted successfully.",
    });
    
    navigate("/secure-account");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <ProgressBar steps={steps} />
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Entity Partner Profile</CardTitle>
            <p className="text-center text-muted-foreground">
              Welcome! We're excited about the possibility of collaborating with you.
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="grid gap-6">
              
              {/* Section 1: About Your Organization */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                  Section 1: About Your Organization
                </h3>
                
                <div className="space-y-2">
                  <Label>Organization Type *</Label>
                  <Select value={formData.organizationType} onValueChange={(value) => handleSelectChange("organizationType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select organization type" />
                    </SelectTrigger>
                    <SelectContent>
                      {organizationTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.organizationType === "Other" && (
                  <div className="space-y-2">
                    <Label>Please specify</Label>
                    <Input
                      value={formData.organizationTypeOther}
                      onChange={(e) => handleSelectChange("organizationTypeOther", e.target.value)}
                      placeholder="Enter organization type"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Organization Mission (2-3 sentences)</Label>
                  <Textarea
                    value={formData.organizationMission}
                    onChange={(e) => handleSelectChange("organizationMission", e.target.value)}
                    placeholder="Describe your organization's mission and focus..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Section 2: Goals with Supsindex */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                  Section 2: Goals with Supsindex
                </h3>
                
                <div className="space-y-3">
                  <Label>Partnership Goals</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {partnershipGoals.map((goal) => (
                      <div key={goal} className="flex items-center space-x-2">
                        <Checkbox
                          id={`goal-${goal}`}
                          checked={formData.partnershipGoals.includes(goal)}
                          onCheckedChange={(checked) => handleCheckboxChange("partnershipGoals", goal, checked as boolean)}
                        />
                        <Label htmlFor={`goal-${goal}`}>{goal}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {formData.partnershipGoals.includes("Other") && (
                  <div className="space-y-2">
                    <Label>Please specify other goals</Label>
                    <Input
                      value={formData.partnershipGoalsOther}
                      onChange={(e) => handleSelectChange("partnershipGoalsOther", e.target.value)}
                      placeholder="Enter other partnership goals"
                    />
                  </div>
                )}
              </div>

              {/* Section 3: Contact */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                  Section 3: Contact
                </h3>
                
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input
                    value={formData.fullName}
                    onChange={(e) => handleSelectChange("fullName", e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Job Title *</Label>
                  <Input
                    value={formData.jobTitle}
                    onChange={(e) => handleSelectChange("jobTitle", e.target.value)}
                    placeholder="e.g., Partner, Investment Director"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Organization Name *</Label>
                  <Input
                    value={formData.organizationName}
                    onChange={(e) => handleSelectChange("organizationName", e.target.value)}
                    placeholder="Enter organization name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Organization Email *</Label>
                  <Input
                    type="email"
                    value={formData.orgEmail}
                    onChange={(e) => handleSelectChange("orgEmail", e.target.value)}
                    placeholder="contact@organization.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleSelectChange("phone", e.target.value)}
                    placeholder="+44 123 456 7890"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Website (Optional)</Label>
                  <Input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleSelectChange("website", e.target.value)}
                    placeholder="https://yourorganization.com"
                  />
                </div>
              </div>

              {/* Section 4: Supsindex Interaction */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                  Section 4: Supsindex Interaction
                </h3>
                
                <div className="space-y-2">
                  <Label>How did you hear about Supsindex?</Label>
                  <Select value={formData.hearAbout} onValueChange={(value) => handleSelectChange("hearAbout", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      {hearAboutOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {(formData.hearAbout === "Referral from colleague" || formData.hearAbout === "Other") && (
                  <div className="space-y-2">
                    <Label>Please specify</Label>
                    <Input
                      value={formData.hearAboutOther}
                      onChange={(e) => handleSelectChange("hearAboutOther", e.target.value)}
                      placeholder="Enter details"
                    />
                  </div>
                )}

                <div className="space-y-3">
                  <Label>Have you interacted with Supsindex before?</Label>
                  <RadioGroup value={formData.interactedBefore} onValueChange={(value) => handleSelectChange("interactedBefore", value)}>
                    {["Yes", "No"].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`interacted-${option}`} />
                        <Label htmlFor={`interacted-${option}`}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {formData.interactedBefore === "Yes" && (
                  <div className="space-y-2">
                    <Label>Who did you speak with? (Optional)</Label>
                    <Input
                      value={formData.spokeWith}
                      onChange={(e) => handleSelectChange("spokeWith", e.target.value)}
                      placeholder="Enter name or team"
                    />
                  </div>
                )}

                <div className="space-y-3">
                  <Label>Preferred Contact Method</Label>
                  <RadioGroup value={formData.preferredContact} onValueChange={(value) => handleSelectChange("preferredContact", value)}>
                    {["Email", "Phone"].map((method) => (
                      <div key={method} className="flex items-center space-x-2">
                        <RadioGroupItem value={method} id={`contact-${method}`} />
                        <Label htmlFor={`contact-${method}`}>{method}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full h-12 text-base font-medium">
                  Submit Entity Profile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};