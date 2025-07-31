import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { 
  Upload, 
  Download, 
  Share2, 
  Users, 
  Calendar, 
  Trophy, 
  Bell, 
  MessageCircle,
  Gift,
  Shield,
  Settings,
  LogOut,
  Trash2,
  Eye,
  EyeOff,
  Copy,
  Check,
  Menu,
  Home,
  Award,
  FileText,
  TestTube,
  History,
  UserPlus,
  GraduationCap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  passportNumber: string;
  accountStatus: 'verified' | 'unverified';
  passportUploaded: boolean;
  examPaymentProof: boolean;
  profilePhoto?: string;
}

interface Certificate {
  id: string;
  title: string;
  score: number;
  issueDate: string;
  referenceNumber: string;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning';
  message: string;
  date: string;
}

interface TestBooking {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'completed';
}

export const IndividualFounderDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [userData, setUserData] = useState<UserData>({
    firstName: 'Pashmak',
    lastName: 'Doe',
    email: 'pashmak.doe@example.com',
    passportNumber: 'AB123456',
    accountStatus: 'unverified',
    passportUploaded: false,
    examPaymentProof: false
  });

  const [certificates] = useState<Certificate[]>([
    {
      id: '1',
      title: 'Startup Fundamentals Assessment',
      score: 85,
      issueDate: '2024-01-15',
      referenceNumber: 'SUP-2024-001'
    },
    {
      id: '2',
      title: 'Leadership Competency Test',
      score: 92,
      issueDate: '2024-02-20',
      referenceNumber: 'SUP-2024-002'
    }
  ]);

  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      message: 'KYC verification completed successfully',
      date: '2024-01-10'
    },
    {
      id: '2',
      type: 'warning',
      message: 'Passport document expires in 30 days',
      date: '2024-01-08'
    }
  ]);

  const [bookedTests] = useState<TestBooking[]>([
    {
      id: '1',
      title: 'Advanced Entrepreneurship Assessment',
      date: '2024-02-15',
      time: '10:00 AM',
      location: 'Online',
      status: 'upcoming'
    }
  ]);

  const [referralCode] = useState('SUP-REF-12345');
  const [referralCount, setReferralCount] = useState(1);
  const [isAccountVisible, setIsAccountVisible] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleFileUpload = (type: 'passport' | 'payment') => {
    setUserData(prev => ({
      ...prev,
      [type === 'passport' ? 'passportUploaded' : 'examPaymentProof']: true
    }));
    toast({
      title: "File uploaded successfully",
      description: `${type === 'passport' ? 'Passport document' : 'Payment proof'} has been uploaded and is under review.`
    });
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
    toast({
      title: "Referral code copied!",
      description: "Share it with friends to earn free tests."
    });
  };

  const downloadCertificate = (cert: Certificate) => {
    toast({
      title: "Certificate downloaded",
      description: `${cert.title} certificate has been downloaded as PDF.`
    });
  };

  const shareCertificate = (cert: Certificate) => {
    toast({
      title: "Certificate shared",
      description: "Share link has been copied to clipboard."
    });
  };

  const menuItems = [
    { id: 'dashboard', label: 'Individual Founder Dashboard', icon: Home },
    { id: 'certificates', label: 'Certs & Reports', icon: Award },
    { id: 'offers', label: 'Supsindex Offers', icon: FileText },
    { id: 'booked', label: 'Booked Tests', icon: Calendar },
    { id: 'history', label: 'Test History', icon: History },
    { id: 'referral', label: 'Referral / Affiliate Box', icon: UserPlus },
    { id: 'team', label: 'Connecting with a Team', icon: Users },
    { id: 'scholarship', label: 'Scholarship', icon: GraduationCap },
    { id: 'privacy', label: 'Make my account invisible', icon: EyeOff },
    { id: 'logout', label: 'Logout', icon: LogOut },
    { id: 'delete', label: 'Delete my Account', icon: Trash2 }
  ];

  function renderMainContent() {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Dashboard Home</h1>
            {/* Identity Document Upload Alert */}
            {!userData.passportUploaded && (
              <Alert>
                <Upload className="h-4 w-4" />
                <AlertDescription>
                  If you have not uploaded, you can take the test, but you will not receive the certificate & Reports.
                </AlertDescription>
              </Alert>
            )}

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* User Information Card */}
              <Card className="max-w-md">
                <CardHeader>
                  <CardTitle>User Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={userData.profilePhoto} />
                      <AvatarFallback>{userData.firstName[0]}{userData.lastName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{userData.firstName} {userData.lastName}</h3>
                      <p className="text-sm text-muted-foreground">{userData.email}</p>
                      <Badge variant={userData.accountStatus === 'verified' ? 'default' : 'secondary'} className="mt-1">
                        {userData.accountStatus === 'verified' ? 'Verified' : 'Unverified'}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full">Change Email</Button>
                    <Button variant="outline" size="sm" className="w-full">Recovery Email</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Notification Box */}
              <Card className="max-w-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Notification Box
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-3 border rounded-md">
                      <div className={`text-sm font-medium ${
                        notification.type === 'success' ? 'text-green-600' : 
                        notification.type === 'error' ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        {notification.message}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{notification.date}</div>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 mt-3">
                    <input type="checkbox" id="emailNotifs" defaultChecked />
                    <label htmlFor="emailNotifs" className="text-sm">Email delivery enabled</label>
                  </div>
                </CardContent>
              </Card>

              {/* Chat Box */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Chat Box
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4 min-h-[200px] bg-muted/50">
                    <p className="text-center text-muted-foreground">Chat interface placeholder</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">FAQ</Button>
                    <Button variant="outline" size="sm">Support Ticket</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Identity Document Upload Section */}
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Identity Document Upload Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Passport Scan Upload</Label>
                    {userData.passportUploaded ? (
                      <div className="flex items-center gap-2 p-3 border rounded-md bg-green-50">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-sm">It will be verified when uploaded</span>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">Drag and drop your passport or click to browse</p>
                        <Button onClick={() => handleFileUpload('passport')} variant="outline">
                          Upload Passport
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Exam Payment Proof</Label>
                    {userData.examPaymentProof ? (
                      <div className="flex items-center gap-2 p-3 border rounded-md bg-green-50">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Verified</span>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">Upload payment proof</p>
                        <Button onClick={() => handleFileUpload('payment')} variant="outline">
                          Upload Payment Proof
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'certificates':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Certs & Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {certificates.map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{cert.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Final Score: {cert.score}% • Issue Date: {cert.issueDate} • Reference Number: {cert.referenceNumber}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => downloadCertificate(cert)}>
                        <Download className="h-4 w-4 mr-1" />
                        Save (PDF, PNG)
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => shareCertificate(cert)}>
                        <Share2 className="h-4 w-4 mr-1" />
                        One-click Share
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'offers':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Test Ordering Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">Views the tests that can be ordered and can be booked.</p>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <h3 className="font-semibold">Business Strategy Assessment</h3>
                      <p className="text-sm text-muted-foreground">Duration: 90 minutes • Available: Online</p>
                      <Button size="sm" className="mt-2">Book Test</Button>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h3 className="font-semibold">Leadership Evaluation</h3>
                      <p className="text-sm text-muted-foreground">Duration: 120 minutes • Available: In-person</p>
                      <Button size="sm" className="mt-2">Book Test</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Other Offers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Additional offers and opportunities will be displayed here.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'booked':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Booked Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookedTests.map((test) => (
                  <div key={test.id} className="p-4 border rounded-lg">
                    <h3 className="font-semibold">{test.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Test Time: {test.date} at {test.time}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Test Location: {test.location}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Test Conditions: Standard assessment conditions
                    </p>
                    <Badge variant={test.status === 'upcoming' ? 'default' : 'secondary'} className="mt-2">
                      {test.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'history':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Test History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">All test data is synced under TestHub</p>
              <div className="space-y-4">
                {certificates.map((cert) => (
                  <div key={cert.id} className="p-4 border rounded-lg">
                    <h3 className="font-semibold">{cert.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Date: {cert.issueDate} • Score: {cert.score}% • Status: Completed
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'team':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Connection Panel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">After personal profile completion:</p>
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Not Connected to Team</h3>
                <p className="text-muted-foreground mb-4">
                  Can create team profile • Can invite other registered users (via email) • 
                  Invitees must confirm to join • One user may belong to multiple teams
                </p>
                <Button>
                  <Users className="h-4 w-4 mr-2" />
                  Start a Team
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 'referral':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Referral Program</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg bg-muted/50">
                  <Label>Your Unique Referral Code</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Input value={referralCode} readOnly className="flex-1" />
                    <Button size="sm" onClick={copyReferralCode}>
                      {copiedCode ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copiedCode ? 'Copied' : 'Copy'}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Share Instantly</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Button size="sm" variant="outline">WhatsApp</Button>
                      <Button size="sm" variant="outline">Telegram</Button>
                      <Button size="sm" variant="outline">iMessage</Button>
                      <Button size="sm" variant="outline">WeChat</Button>
                      <Button size="sm" variant="outline">Facebook</Button>
                      <Button size="sm" variant="outline">Snapchat</Button>
                    </div>
                  </div>

                  <div>
                    <Label>Free Service Condition</Label>
                    <p className="text-sm text-muted-foreground mt-2">
                      If 3 people join using the code → 1 test becomes free
                    </p>
                    <Progress value={(referralCount / 3) * 100} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">{referralCount}/3 referrals</p>
                  </div>
                </div>

                <div>
                  <Label>Registered Accounts</Label>
                  <p className="text-sm text-muted-foreground mt-1">Accounts which have been registered by this referral code:</p>
                  <div className="mt-2 p-3 border rounded-lg">
                    <p className="text-sm">1 person has joined using your code</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Affiliate Box</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Specific tests registered or recommended by an applicant other than the applicant
                </p>
                <div className="p-3 border rounded-lg">
                  <p className="text-sm">No affiliate recommendations at this time</p>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Notifications for those who are affiliated for specific tests
                </p>
              </CardContent>
            </Card>
          </div>
        );

      case 'scholarship':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Scholarship Access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Partner Affiliate</h3>
                  <p className="text-sm text-muted-foreground mt-2">Scholarships through partner organizations</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">PE Codes</h3>
                  <p className="text-sm text-muted-foreground mt-2">Special promotional education codes</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Direct Application</h3>
                  <p className="text-sm text-muted-foreground mt-2">Apply directly for scholarship consideration</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'privacy':
        return (
          <Card className="max-w-xl mx-auto">
            <CardHeader>
              <CardTitle>Privacy & Account Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Make Account Invisible</Label>
                <p className="text-sm text-muted-foreground">You must state a reason for making your account invisible</p>
                <Textarea placeholder="Please provide a reason..." />
                <Button variant="outline" className="w-full">
                  <EyeOff className="h-4 w-4 mr-2" />
                  Make Account Invisible
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 'logout':
        return (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Logout</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Are you sure you want to logout?</p>
              <Button className="w-full">
                <LogOut className="h-4 w-4 mr-2" />
                Confirm Logout
              </Button>
            </CardContent>
          </Card>
        );

      case 'delete':
        return (
          <Card className="max-w-xl mx-auto">
            <CardHeader>
              <CardTitle className="text-red-600">Delete Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                This action cannot be undone. Please provide a reason for deleting your account.
              </p>
              <Textarea placeholder="Reason for account deletion..." />
              <Button variant="destructive" className="w-full">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete My Account
              </Button>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Header/Top Bar */}
        <header className="fixed top-0 left-0 w-full h-16 bg-background border-b shadow-sm flex items-center justify-between px-4 z-50">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden" />
            <button 
              onClick={() => setActiveSection('dashboard')}
              className="text-lg font-semibold hover:text-primary cursor-pointer"
            >
              Welcome {userData.firstName}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={userData.accountStatus === 'verified' ? 'default' : 'secondary'}>
              {userData.accountStatus === 'verified' ? 'Verified' : 'Unverified'}
            </Badge>
          </div>
        </header>

        {/* Sidebar */}
        <Sidebar className="w-64">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                       <SidebarMenuButton 
                         onClick={() => {
                           if (item.id === 'logout') {
                             sessionStorage.clear();
                             localStorage.clear();
                             navigate('/login');
                           } else {
                             setActiveSection(item.id);
                           }
                         }}
                         className={activeSection === item.id ? 'bg-accent text-accent-foreground' : ''}
                       >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content Area */}
        <main className="flex-1 md:ml-0 mt-16 p-6 overflow-auto">{renderMainContent()}</main>
      </div>
    </SidebarProvider>
  );
};