import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Camera, HelpCircle, Mail, FileText, CheckCircle, XCircle, Users, User } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

type DetailView = 'photo' | 'profile' | null;

interface UserData {
  name: string;
  email: string;
  passportId: string;
  isVerified: boolean;
  isOnLeaderboard: boolean;
  isTeamMember: boolean;
  hasPassportUploaded: boolean;
}

export const MasterDetailDashboard = () => {
  const [activeDetailView, setActiveDetailView] = useState<DetailView>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerificationStep, setShowVerificationStep] = useState(false);
  const [countdown, setCountdown] = useState(300); // 5 minutes in seconds
  const { toast } = useToast();

  // Mock user data
  const [userData, setUserData] = useState<UserData>({
    name: "John Smith",
    email: "john.smith@example.com",
    passportId: "AB1234567",
    isVerified: true,
    isOnLeaderboard: true,
    isTeamMember: false,
    hasPassportUploaded: true
  });

  const handleEmailSubmit = () => {
    setShowVerificationStep(true);
    // Start countdown
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    toast({
      title: "Verification code sent",
      description: "Please check your new email for the verification code."
    });
  };

  const handleVerificationSubmit = () => {
    setUserData(prev => ({ ...prev, email: newEmail }));
    setIsEmailModalOpen(false);
    setShowVerificationStep(false);
    setNewEmail('');
    setVerificationCode('');
    setCountdown(300);
    
    toast({
      title: "Email updated successfully",
      description: "Your email address has been changed."
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderPhotoDetailView = () => (
    <div className="flex flex-col items-center justify-center space-y-8 py-12">
      <div className="relative">
        <Avatar className="w-72 h-72">
          <AvatarImage src="/placeholder.svg" alt={userData.name} />
          <AvatarFallback className="text-6xl font-bold">
            {userData.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Upload new photo
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Camera className="w-4 h-4" />
          Take photo
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="p-1">
                <HelpCircle className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="max-w-xs">
                <p className="font-medium mb-2">Photo Requirements:</p>
                <ul className="text-sm space-y-1">
                  <li>• Clear, high-resolution image</li>
                  <li>• Face clearly visible</li>
                  <li>• No filters or editing</li>
                  <li>• Professional appearance</li>
                  <li>• JPEG or PNG format</li>
                </ul>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span className="text-sm text-muted-foreground">Photo rules and conditions</span>
      </div>
      
      <Button size="lg" className="px-12">
        Save Changes
      </Button>
    </div>
  );

  const renderProfileDetailView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={userData.name}
          disabled
          className="bg-muted"
        />
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="flex gap-2">
          <Input
            id="email"
            value={userData.email}
            disabled
            className="bg-muted flex-1"
          />
          <Dialog open={isEmailModalOpen} onOpenChange={setIsEmailModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                Change email
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Change Email Address</DialogTitle>
              </DialogHeader>
              
              {!showVerificationStep ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-email">Enter your new email</Label>
                    <Input
                      id="new-email"
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="new.email@example.com"
                    />
                  </div>
                  <Button onClick={handleEmailSubmit} className="w-full">
                    Send Verification Code
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="verification-code">
                      A code is sent to your email, please put it here
                    </Label>
                    <Input
                      id="verification-code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="Enter verification code"
                      maxLength={6}
                    />
                    <p className="text-sm text-muted-foreground">
                      Code expires in: {formatTime(countdown)}
                    </p>
                  </div>
                  <Button onClick={handleVerificationSubmit} className="w-full">
                    Verify and Update Email
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Passport ID Field */}
      <div className="space-y-2">
        <Label htmlFor="passport">Passport ID</Label>
        <div className="flex gap-2">
          <Input
            id="passport"
            value={userData.passportId}
            disabled
            className="bg-muted flex-1"
          />
          {userData.hasPassportUploaded ? (
            <Card className="flex-1">
              <CardContent className="p-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-sm">Passport uploaded</span>
              </CardContent>
            </Card>
          ) : (
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Upload className="w-3 h-3" />
              Upload
            </Button>
          )}
        </div>
      </div>

      {/* Verification Status */}
      <div className="space-y-2">
        <Label>Verification Status</Label>
        <div className="flex items-center gap-2">
          {userData.isVerified ? (
            <>
              <CheckCircle className="w-4 h-4 text-success" />
              <Badge variant="secondary" className="bg-success/10 text-success">
                Verified
              </Badge>
            </>
          ) : (
            <>
              <XCircle className="w-4 h-4 text-destructive" />
              <Badge variant="secondary" className="bg-destructive/10 text-destructive">
                Unverified
              </Badge>
            </>
          )}
        </div>
      </div>

      {/* Leaderboard Status */}
      <div className="space-y-2">
        <Label>Leaderboard Status</Label>
        <p className="text-sm text-foreground">
          {userData.isOnLeaderboard 
            ? "You are on the leaderboard" 
            : "You are not currently on the leaderboard"
          }
        </p>
      </div>

      {/* Team/Individual Status */}
      <div className="space-y-2">
        <Label>Membership Status</Label>
        <div className="flex items-center gap-2">
          {userData.isTeamMember ? (
            <>
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">You are part of a team</span>
            </>
          ) : (
            <>
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">You are an individual founder</span>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const renderMainContent = () => {
    if (!activeDetailView) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold text-muted-foreground">
              Welcome to your Dashboard
            </h2>
            <p className="text-muted-foreground">
              Click on your profile photo or name in the header to get started
            </p>
          </div>
        </div>
      );
    }

    switch (activeDetailView) {
      case 'photo':
        return renderPhotoDetailView();
      case 'profile':
        return renderProfileDetailView();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Top Bar (Persistent Master View) */}
      <header className="fixed top-0 left-0 w-full h-16 bg-background shadow-md flex items-center px-4 z-50 border-b">
        {/* Profile Master Item */}
        <div className="flex items-center gap-3">
          <Avatar 
            className="w-10 h-10 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all"
            onClick={() => setActiveDetailView('photo')}
          >
            <AvatarImage src="/placeholder.svg" alt={userData.name} />
            <AvatarFallback>
              {userData.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <h1 
            className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors"
            onClick={() => setActiveDetailView('profile')}
          >
            {userData.name}
          </h1>
        </div>
      </header>

      {/* Main Content Area (Dynamic Detail View) */}
      <main className="mt-16 p-6 w-full min-h-[calc(100vh-4rem)] overflow-auto">
        <div className="max-w-4xl mx-auto">
          {renderMainContent()}
        </div>
      </main>
    </div>
  );
};