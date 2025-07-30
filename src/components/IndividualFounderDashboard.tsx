import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
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
  Check
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
  const [userData, setUserData] = useState<UserData>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
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
    // Simulate file upload
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

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {userData.firstName}</h1>
            <p className="text-muted-foreground">Manage your profile and track your progress</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={userData.accountStatus === 'verified' ? 'default' : 'secondary'}>
              {userData.accountStatus === 'verified' ? 'Verified' : 'Unverified'}
            </Badge>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Identity Document Upload Section */}
        {!userData.passportUploaded && (
          <Alert>
            <Upload className="h-4 w-4" />
            <AlertDescription>
              Upload your identity documents to receive certificates and reports. 
              Without verification, you can take tests but won't receive official credentials.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:grid-cols-12">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="tests">Tests</TabsTrigger>
            <TabsTrigger value="notifications">Alerts</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="chat">Support</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Certificates Earned</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{certificates.length}</div>
                  <p className="text-xs text-muted-foreground">+1 this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(certificates.reduce((acc, cert) => acc + cert.score, 0) / certificates.length)}%
                  </div>
                  <p className="text-xs text-muted-foreground">Excellent performance</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Referrals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{referralCount}/3</div>
                  <p className="text-xs text-muted-foreground">2 more for free test</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Next Test</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Feb 15</div>
                  <p className="text-xs text-muted-foreground">Advanced Assessment</p>
                </CardContent>
              </Card>
            </div>

            {/* Document Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle>Identity Verification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Passport Document</Label>
                    {userData.passportUploaded ? (
                      <div className="flex items-center gap-2 p-3 border rounded-md bg-green-50">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Under Review</span>
                      </div>
                    ) : (
                      <Button onClick={() => handleFileUpload('passport')} variant="outline" className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Passport
                      </Button>
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
                      <Button onClick={() => handleFileUpload('payment')} variant="outline" className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Payment Proof
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Certificates & Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{cert.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Score: {cert.score}% • Issued: {cert.issueDate} • Ref: {cert.referenceNumber}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => downloadCertificate(cert)}>
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => shareCertificate(cert)}>
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Applicant Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={userData.profilePhoto} />
                    <AvatarFallback>{userData.firstName[0]}{userData.lastName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Photo visible to others. Report abuse if needed.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={userData.firstName}
                      onChange={(e) => setUserData(prev => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={userData.lastName}
                      onChange={(e) => setUserData(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Primary Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recoveryEmail">Recovery Email</Label>
                    <Input
                      id="recoveryEmail"
                      type="email"
                      placeholder="recovery@example.com"
                    />
                  </div>
                </div>

                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Connection Panel
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No Team Connected</h3>
                  <p className="text-muted-foreground mb-4">
                    Create a team profile or join an existing team to collaborate with others.
                  </p>
                  <Button>
                    <Users className="h-4 w-4 mr-2" />
                    Start a Team
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tests Tab */}
          <TabsContent value="tests" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Available Tests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">Business Strategy Assessment</h3>
                        <p className="text-sm text-muted-foreground">Duration: 90 minutes • Location: Online</p>
                      </div>
                      <Button>Book Test</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">Technical Leadership Evaluation</h3>
                        <p className="text-sm text-muted-foreground">Duration: 120 minutes • Location: London</p>
                      </div>
                      <Button>Book Test</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Booked Tests</CardTitle>
                </CardHeader>
                <CardContent>
                  {bookedTests.map((test) => (
                    <div key={test.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{test.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {test.date} at {test.time} • {test.location}
                        </p>
                      </div>
                      <Badge variant={test.status === 'upcoming' ? 'default' : 'secondary'}>
                        {test.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <Alert key={notification.id}>
                      <Bell className="h-4 w-4" />
                      <AlertDescription>
                        <div className="flex justify-between items-start">
                          <span>{notification.message}</span>
                          <span className="text-xs text-muted-foreground">{notification.date}</span>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Referrals Tab */}
          <TabsContent value="referrals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Referral Program
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label>Your Referral Code</Label>
                    <div className="flex gap-2 mt-1">
                      <Input value={referralCode} readOnly />
                      <Button size="icon" onClick={copyReferralCode}>
                        {copiedCode ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>Progress to Free Test</Label>
                    <div className="mt-2">
                      <Progress value={(referralCount / 3) * 100} className="mb-2" />
                      <p className="text-sm text-muted-foreground">
                        {referralCount}/3 referrals completed. {3 - referralCount} more needed for a free test!
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Button variant="outline" size="sm">WhatsApp</Button>
                    <Button variant="outline" size="sm">Telegram</Button>
                    <Button variant="outline" size="sm">Facebook</Button>
                    <Button variant="outline" size="sm">Twitter</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Chat Tab */}
          <TabsContent value="chat" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Support & FAQ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Frequently Asked Questions</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• How do I upload my passport?</li>
                      <li>• When will I receive my certificate?</li>
                      <li>• How does the referral program work?</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supportMessage">Send us a message</Label>
                    <Textarea 
                      id="supportMessage"
                      placeholder="Describe your issue or question..."
                      rows={4}
                    />
                    <Button>Send Message</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Account Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Account Visibility</h3>
                    <p className="text-sm text-muted-foreground">
                      Make your account invisible to other users
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setIsAccountVisible(!isAccountVisible)}
                  >
                    {isAccountVisible ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
                    {isAccountVisible ? 'Visible' : 'Hidden'}
                  </Button>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};