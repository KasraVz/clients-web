import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Home, Bell, Upload, Camera, HelpCircle, CheckCircle, XCircle, ExternalLink } from "lucide-react";

type DetailView = 'photo' | 'profile' | 'notifications' | null;

interface Notification {
  id: string;
  type: 'alert' | 'info';
  content: string;
  hasMoreLink?: boolean;
  isRead?: boolean;
}

const FounderDashboard = () => {
  const [activeView, setActiveView] = useState<DetailView>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [notificationCount, setNotificationCount] = useState(2);

  const userData = {
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
      content: 'In a polite way, you have 2 hours left until your FPA exam.',
      hasMoreLink: true,
      isRead: false
    },
    {
      id: '2',
      type: 'info',
      content: 'The EEA exam you chose but you drop off at midjourney of its scheduling. It is 2 days left until it is canceled automatically if you don\'t complete the journey.',
      isRead: false
    }
  ];

  const handleNotificationClick = () => {
    setActiveView('notifications');
    setNotificationCount(0);
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
          className={`${
            !notification.isRead ? 'border border-muted-foreground/20' : 'border-transparent'
          } ${
            notification.type === 'alert' 
              ? 'bg-orange-50/50' 
              : 'bg-green-50/50'
          }`}
        >
          <CardContent className="p-4">
            <p className="text-sm">
              {notification.content}
              {notification.hasMoreLink && (
                <a href="#" className="text-primary hover:underline ml-1">
                  more
                  <ExternalLink className="inline w-3 h-3 ml-1" />
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
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-muted-foreground">
            Click an item in the header to get started
          </p>
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
      default:
        return null;
    }
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

      {/* Main Content Area */}
      <main className="mt-16 p-6 overflow-auto w-full min-h-[calc(100vh-4rem)]">
        {renderMainContent()}
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
                  Resend code in {countdown}s
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEmailModalOpen(false)}>
                Cancel
              </Button>
              <Button>Update Email</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FounderDashboard;