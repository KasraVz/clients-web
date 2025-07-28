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

const mentoringRoles = [
  "Independent Mentor/Consultant",
  "Part of a Firm",
  "Part of an Incubator/Accelerator", 
  "Other"
];

const expertiseAreas = [
  "Strategy & Business Development",
  "Technology & Engineering",
  "Product Management",
  "Marketing & Sales",
  "Finance & Fundraising",
  "Operations & Scaling",
  "Legal & Compliance",
  "HR & Team Building",
  "Industry-Specific Knowledge"
];

const ecosystems = [
  "North America",
  "Europe", 
  "Asia-Pacific",
  "Latin America",
  "Middle East & Africa",
  "Global"
];

const partnershipGoals = [
  "Mentor startups",
  "Provide consulting services",
  "Access to deal flow",
  "Network with other partners",
  "Continuous learning",
  "Build personal brand"
];

const hearAboutOptions = [
  "Google Search",
  "LinkedIn",
  "Referral from colleague",
  "Industry event",
  "Social media",
  "Other"
];

export const IndividualPartnerProfile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    mentoringRole: "",
    orgName: "",
    coreMission: "",
    expertiseAreas: [] as string[],
    primaryEcosystem: "",
    cityCountry: "",
    partnershipGoals: [] as string[],
    hearAbout: "",
    email: "",
    linkedinWebsite: "",
    phone: "",
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
    
    if (!formData.fullName || !formData.jobTitle || !formData.mentoringRole || !formData.email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Profile submitted!",
      description: "Your partner profile has been submitted successfully.",
    });
    
    navigate("/secure-account");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <ProgressBar steps={steps} />
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Individual Partner Profile</CardTitle>
            <p className="text-center text-muted-foreground">
              Welcome! We're excited about the opportunity to partner with you.
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="grid gap-6">
              
              {/* Section 1: About You & Your Practice */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                  Section 1: About You & Your Practice
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
                  <Label>Primary Job Title or Role *</Label>
                  <Input
                    value={formData.jobTitle}
                    onChange={(e) => handleSelectChange("jobTitle", e.target.value)}
                    placeholder="e.g., Senior Consultant, Venture Partner"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Mentoring/Consulting Role *</Label>
                  <RadioGroup value={formData.mentoringRole} onValueChange={(value) => handleSelectChange("mentoringRole", value)}>
                    {mentoringRoles.map((role) => (
                      <div key={role} className="flex items-center space-x-2">
                        <RadioGroupItem value={role} id={`role-${role}`} />
                        <Label htmlFor={`role-${role}`}>{role}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Organization/Firm Name (Optional)</Label>
                  <Input
                    value={formData.orgName}
                    onChange={(e) => handleSelectChange("orgName", e.target.value)}
                    placeholder="Enter organization name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Core Mission (2-3 sentences)</Label>
                  <Textarea
                    value={formData.coreMission}
                    onChange={(e) => handleSelectChange("coreMission", e.target.value)}
                    placeholder="Describe your core mission and approach..."
                    rows={3}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Areas of Expertise</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {expertiseAreas.map((area) => (
                      <div key={area} className="flex items-center space-x-2">
                        <Checkbox
                          id={`expertise-${area}`}
                          checked={formData.expertiseAreas.includes(area)}
                          onCheckedChange={(checked) => handleCheckboxChange("expertiseAreas", area, checked as boolean)}
                        />
                        <Label htmlFor={`expertise-${area}`}>{area}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Primary Ecosystem</Label>
                  <Select value={formData.primaryEcosystem} onValueChange={(value) => handleSelectChange("primaryEcosystem", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select primary ecosystem" />
                    </SelectTrigger>
                    <SelectContent>
                      {ecosystems.map((ecosystem) => (
                        <SelectItem key={ecosystem} value={ecosystem}>{ecosystem}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Specific City/Country (Optional)</Label>
                  <Input
                    value={formData.cityCountry}
                    onChange={(e) => handleSelectChange("cityCountry", e.target.value)}
                    placeholder="e.g., London, UK"
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
              </div>

              {/* Section 3: Contact */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                  Section 3: Contact
                </h3>
                
                <div className="space-y-2">
                  <Label>How did you hear about us? *</Label>
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

                <div className="space-y-2">
                  <Label>Professional Email *</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleSelectChange("email", e.target.value)}
                    placeholder="your.email@company.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label>LinkedIn or Website (Optional)</Label>
                  <Input
                    type="url"
                    value={formData.linkedinWebsite}
                    onChange={(e) => handleSelectChange("linkedinWebsite", e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleSelectChange("phone", e.target.value)}
                    placeholder="+44 123 456 7890"
                  />
                </div>

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
                  Submit Partner Profile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};