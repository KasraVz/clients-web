import { useState, useEffect } from "react";
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
import { Trash2, Plus } from "lucide-react";

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

interface TeamMember {
  name: string;
  equityShare: string;
  role: string;
  email?: string;
}

export const BusinessProfile = () => {
  const [selectedPath, setSelectedPath] = useState<string>("");
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
    // Team founder specific fields
    addTeamMembers: "",
    startupName: "",
    startupWebsite: "",
    includeTeamResults: "",
  });
  
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { name: "", equityShare: "", role: "", email: "" }
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    const path = sessionStorage.getItem("selectedPath") || "single-founder";
    setSelectedPath(path);
  }, []);

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

  const addTeamMember = () => {
    if (teamMembers.length < 4) {
      setTeamMembers([...teamMembers, { name: "", equityShare: "", role: "", email: "" }]);
    }
  };

  const removeTeamMember = (index: number) => {
    if (teamMembers.length > 1) {
      setTeamMembers(teamMembers.filter((_, i) => i !== index));
    }
  };

  const updateTeamMember = (index: number, field: keyof TeamMember, value: string) => {
    const updated = teamMembers.map((member, i) => 
      i === index ? { ...member, [field]: value } : member
    );
    setTeamMembers(updated);
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

              {/* Team Founder Specific Fields */}
              {selectedPath === "team-founder" && (
                <>
                  {/* Add Team Members */}
                  <div className="space-y-3">
                    <Label>Do you want to add your team members right now? *</Label>
                    <RadioGroup value={formData.addTeamMembers} onValueChange={(value) => handleSelectChange("addTeamMembers", value)}>
                      {["Yes", "No"].map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`team-${option}`} />
                          <Label htmlFor={`team-${option}`}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Team Members Form */}
                  {formData.addTeamMembers === "Yes" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-base font-medium">Team Members</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addTeamMember}
                          disabled={teamMembers.length >= 4}
                          className="gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Add Member
                        </Button>
                      </div>
                      
                      {teamMembers.map((member, index) => (
                        <Card key={index} className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium">Member {index + 1}</h4>
                            {teamMembers.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeTeamMember(index)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                              <Label>Name</Label>
                              <Input
                                value={member.name}
                                onChange={(e) => updateTeamMember(index, "name", e.target.value)}
                                placeholder="Full name"
                              />
                            </div>
                            <div>
                              <Label>Equity Share (%)</Label>
                              <Input
                                type="number"
                                value={member.equityShare}
                                onChange={(e) => updateTeamMember(index, "equityShare", e.target.value)}
                                placeholder="0"
                                min="0"
                                max="100"
                              />
                            </div>
                            <div>
                              <Label>Role/Responsibility</Label>
                              <Input
                                value={member.role}
                                onChange={(e) => updateTeamMember(index, "role", e.target.value)}
                                placeholder="e.g., CTO, CMO"
                              />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Startup Details */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Startup Name</Label>
                      <Input
                        value={formData.startupName}
                        onChange={(e) => handleSelectChange("startupName", e.target.value)}
                        placeholder="Enter startup name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Startup Website</Label>
                      <Input
                        type="url"
                        value={formData.startupWebsite}
                        onChange={(e) => handleSelectChange("startupWebsite", e.target.value)}
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>

                  {/* Include Team Results */}
                  <div className="space-y-3">
                    <Label>Include individual test results of these team members?</Label>
                    <RadioGroup value={formData.includeTeamResults} onValueChange={(value) => handleSelectChange("includeTeamResults", value)}>
                      {["Yes", "No"].map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`results-${option}`} />
                          <Label htmlFor={`results-${option}`}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Team Member Emails */}
                  {formData.includeTeamResults === "Yes" && formData.addTeamMembers === "Yes" && (
                    <div className="space-y-4">
                      <Label className="text-base font-medium">Team Member Supsindex Account Emails</Label>
                      {teamMembers.map((member, index) => (
                        <div key={index} className="space-y-2">
                          <Label>Email for {member.name || `Member ${index + 1}`}</Label>
                          <Input
                            type="email"
                            value={member.email || ""}
                            onChange={(e) => updateTeamMember(index, "email", e.target.value)}
                            placeholder="member@example.com"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

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