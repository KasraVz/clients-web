import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Home, Bell, Upload, Camera, HelpCircle, CheckCircle, XCircle } from "lucide-react";
import supsindexLogo from "@/assets/supsindex-logo.png";
import { useToast } from "@/hooks/use-toast";
import { DashboardSidebar } from "./DashboardSidebar";
import { FastTrakView } from "./dashboard/FastTrakView";
import { SpecialOfferView } from "./dashboard/SpecialOfferView";
import { ReportsView } from "./dashboard/ReportsView";
import { CertificationsView } from "./dashboard/CertificationsView";

type DetailView = 'photo' | 'profile' | 'notifications' | 'fast-trak' | 'special-offer' | 'reports' | 'certifications' | null;

interface Notification {
  id: string;
  type: 'alert' | 'info';
  content: string;
  hasMoreLink?: boolean;
  isRead?: boolean;
}

interface UserData {
  name: string;
  email: string;
  passportId: string;
  profilePhoto: string | null;
  isVerified: boolean;
  onLeaderboard: boolean;
  isTeamMember: boolean;
}

export const MasterDetailDashboard = () => {
  const [activeView, setActiveView] = useState<DetailView>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [notificationCount, setNotificationCount] = useState(2);
  const { toast } = useToast();

  const userData: UserData = {
    name: "John Smith",
    email: "john.smith@example.com",
    passportId: "123456789",
    profilePhoto: null,
    isVerified: true,
    onLeaderboard: false,
    isTeamMember: false
  };

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'alert',
      content: "Politely, we'd like to remind you that your FPA exam begins in 2 hours. To review the rules and access the exam link, please click on the 'more' button below.",
      hasMoreLink: true,
      isRead: false
    },
    {
      id: '2',
      type: 'info',
      content: "It looks like you've started scheduling your EEA exam but didn't finish. You have 2 days to complete the process before your session is automatically canceled.",
      isRead: false
    },
    {
      id: '3',
      type: 'alert',
      content: "The deadline for the 'Future Innovator' scholarship is approaching. Please ensure you submit your application before the end of the week.",
      isRead: false
    },
    {
      id: '4',
      type: 'info',
      content: "Your team invitation to 'Project Nexus' has been successfully sent to all members.",
      isRead: true
    },
    {
      id: '5',
      type: 'info',
      content: "A new feature is available: You can now create custom study groups for any test in the Test Hub section.",
      isRead: true
    }
  ];

  const handleNotificationClick = () => {
    setActiveView('notifications');
    setNotificationCount(0);
  };

  const handleEmailSubmit = () => {
    // Mock email verification process
    setCountdown(300); // 5 minutes
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderPhotoDetailView = () => (
    <div className="flex flex-col items-center justify-center space-y-6">
      <Avatar className="w-72 h-72">
        <AvatarImage src={userData.profilePhoto || undefined} />
        <AvatarFallback className="text-6xl">
          {userData.name.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex gap-4">
        <Button variant="outline" className="flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Upload new photo
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Camera className="w-4 h-4" />
          Take photo
        </Button>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <HelpCircle className="w-5 h-5 text-muted-foreground cursor-help" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Photo should be clear, well-lit, and show your face clearly.<br/>
            Accepted formats: JPG, PNG. Max size: 5MB.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Button className="w-full max-w-md">Save Changes</Button>
    </div>
  );

  const renderProfileDetailView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" value={userData.name} disabled className="mt-1" />
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <div className="flex gap-2 mt-1">
            <Input id="email" value={userData.email} disabled className="flex-1" />
            <Button 
              variant="link" 
              onClick={() => setIsEmailModalOpen(true)}
              className="text-primary"
            >
              Change email
            </Button>
          </div>
        </div>

        <div>
          <Label htmlFor="passport">Passport ID</Label>
          <Input id="passport" value={userData.passportId} disabled className="mt-1" />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Passport Document</Label>
          <div className="mt-1 p-4 border-2 border-dashed border-muted-foreground/25 rounded-lg">
            <Button variant="outline" className="w-full">
              <Upload className="w-4 h-4 mr-2" />
              Upload Passport
            </Button>
          </div>
        </div>

        <div>
          <Label>Verification Status</Label>
          <div className="flex items-center gap-2 mt-1">
            {userData.isVerified ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-500" />
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Verified
                </Badge>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-red-500" />
                <Badge variant="destructive">Unverified</Badge>
              </>
            )}
          </div>
        </div>

        <div>
          <Label>Leaderboard Status</Label>
          <p className="text-sm text-muted-foreground mt-1">
            {userData.onLeaderboard ? 'On Leaderboard' : 'Not on Leaderboard'}
          </p>
        </div>

        <div>
          <Label>Status</Label>
          <p className="text-sm text-muted-foreground mt-1">
            {userData.isTeamMember ? 'Team Member' : 'Individual Founder'}
          </p>
        </div>
      </div>
    </div>
  );

  const renderNotificationDetailView = () => (
    <div className="max-w-xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-center mb-6">Notifications</h2>
      {notifications.map((notification) => (
        <Card 
          key={notification.id}
          className={`shadow-sm ${
            !notification.isRead ? 'border border-muted-foreground/30' : 'border-transparent'
          } ${
            notification.type === 'alert' 
              ? notification.isRead ? 'bg-background' : 'bg-orange-50/30' 
              : notification.isRead ? 'bg-background' : 'bg-green-50/30'
          }`}
        >
          <CardContent className="p-4">
            <p className="text-sm leading-relaxed">
              {notification.content}
              {notification.hasMoreLink && (
                <a href="#" className="text-blue-600 hover:underline ml-1">
                  more
                </a>
              )}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderMainContent = () => {
    if (!activeView) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center space-y-6">
            <img 
              src={supsindexLogo} 
              alt="Supsindex Logo" 
              className="w-64 h-auto mx-auto opacity-70"
            />
            <p className="text-lg text-muted-foreground">
              Click an item in the sidebar to get started
            </p>
          </div>
        </div>
      );
    }

    switch (activeView) {
      case 'photo':
        return renderPhotoDetailView();
      case 'profile':
        return renderProfileDetailView();
      case 'notifications':
        return renderNotificationDetailView();
      case 'fast-trak':
        return <FastTrakView />;
      case 'special-offer':
        return <SpecialOfferView />;
      case 'reports':
        return <ReportsView />;
      case 'certifications':
        return <CertificationsView />;
      default:
        return null;
    }
  };

  const handleSidebarItemSelect = (itemId: string) => {
    setActiveView(itemId as DetailView);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full h-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border flex items-center justify-between px-4 z-50">
        {/* Profile Master Item */}
        <div className="flex items-center gap-3">
          <Avatar 
            className="w-10 h-10 cursor-pointer hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all"
            onClick={() => setActiveView('photo')}
          >
            <AvatarImage src={userData.profilePhoto || undefined} />
            <AvatarFallback>
              {userData.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <span 
            className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors"
            onClick={() => setActiveView('profile')}
          >
            {userData.name}
          </span>
        </div>

        {/* Action Items */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveView(null)}
            className="hover:bg-muted"
          >
            <Home className="w-5 h-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNotificationClick}
            className="relative hover:bg-muted"
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 flex items-center justify-center text-xs"
              >
                {notificationCount}
              </Badge>
            )}
          </Button>
        </div>
      </header>

      {/* Sidebar */}
      <DashboardSidebar 
        onItemSelect={handleSidebarItemSelect}
        selectedItem={activeView}
      />

      {/* Main Content Area */}
      <main className="md:ml-64 mt-16 p-6 overflow-auto w-full min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto">
          {renderMainContent()}
        </div>
      </main>

      {/* Email Change Modal */}
      <Dialog open={isEmailModalOpen} onOpenChange={setIsEmailModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Email Address</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="new-email">New Email Address</Label>
              <Input
                id="new-email"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter your new email"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="verification-code">Verification Code</Label>
              <Input
                id="verification-code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter verification code"
                className="mt-1"
              />
              {countdown > 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  Resend code in {formatTime(countdown)}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEmailModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEmailSubmit}>Update Email</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};