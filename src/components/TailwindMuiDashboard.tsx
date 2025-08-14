import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Avatar,
  Badge,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Tooltip,
  Modal,
  TextField,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  Home,
  Notifications,
  Visibility,
  Download,
  Share,
  CheckCircle,
  Cancel,
  Twitter,
  LinkedIn,
  Email,
  Upload,
  CameraAlt,
  HelpOutline,
} from '@mui/icons-material';

type DetailView = 'profile-photo' | 'profile-info' | 'notifications' | 'fast-trak' | 'special-offer' | 'reports' | 'certifications' | null;

interface UserData {
  name: string;
  email: string;
  passportId: string;
  profilePhoto: string | null;
  isVerified: boolean;
  onLeaderboard: boolean;
  isTeamMember: boolean;
}

interface Report {
  id: string;
  testDate: string;
  publishDate: string;
  testName: string;
  status: 'Valid' | 'Expired';
  isPurchased: boolean;
}

interface Certification {
  id: string;
  testDate: string;
  testName: string;
  status: 'Valid' | 'Expired';
  isPurchased: boolean;
}

interface Notification {
  id: string;
  type: 'alert' | 'info';
  content: string;
  hasMoreLink?: boolean;
  isRead?: boolean;
}

const userData: UserData = {
  name: "John Smith",
  email: "john.smith@example.com",
  passportId: "123456789",
  profilePhoto: null,
  isVerified: true,
  onLeaderboard: false,
  isTeamMember: false,
};

const reports: Report[] = [
  { id: '#00123', testDate: '12/03/2025', publishDate: '15/03/2025', testName: 'FPA', status: 'Valid', isPurchased: true },
  { id: '#00124', testDate: '18/04/2025', publishDate: '20/04/2025', testName: 'EEA', status: 'Valid', isPurchased: true },
  { id: '#00125', testDate: '05/05/2025', publishDate: '', testName: 'Financial Acumen', status: 'Valid', isPurchased: false },
];

const certifications: Certification[] = [
  { id: '#CERT-987', testDate: '12/03/2025', testName: 'FPA', status: 'Valid', isPurchased: true },
  { id: '#CERT-988', testDate: '18/04/2025', testName: 'EEA', status: 'Valid', isPurchased: true },
  { id: '#CERT-989', testDate: '05/05/2025', testName: 'Financial Acumen', status: 'Expired', isPurchased: false },
];

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
    type: 'info',
    content: "Your team invitation to 'Project Nexus' has been successfully sent to all members.",
    isRead: true
  },
  {
    id: '4',
    type: 'info',
    content: "A new feature is available: You can now create custom study groups for any test in the Test Hub section.",
    isRead: true
  }
];

export const TailwindMuiDashboard = () => {
  const [activeView, setActiveView] = useState<DetailView>(null);
  const [supsindexOpen, setSupsindexOpen] = useState(false);
  const [certsOpen, setCertsOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(2);
  const [newEmail, setNewEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [countdown, setCountdown] = useState(0);

  const handleNotificationClick = () => {
    setActiveView('notifications');
    setNotificationCount(0);
  };

  const handleEmailSubmit = () => {
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
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderProfilePhotoView = () => (
    <div className="flex flex-col items-center justify-center min-h-full p-6">
      <div className="flex flex-col items-center space-y-6 max-w-md w-full">
        <Avatar className="!w-72 !h-72 !text-6xl">
          {userData.name.split(' ').map(n => n[0]).join('')}
        </Avatar>
        
        <div className="flex gap-4 w-full">
          <Button variant="outlined" startIcon={<Upload />} className="flex-1">
            Upload new photo
          </Button>
          <Button variant="outlined" startIcon={<CameraAlt />} className="flex-1">
            Take photo
          </Button>
        </div>

        <Tooltip title="Photo should be clear, well-lit, and show your face clearly. Accepted formats: JPG, PNG. Max size: 5MB.">
          <HelpOutline className="!w-5 !h-5 text-gray-500 cursor-help" />
        </Tooltip>

        <Button variant="contained" color="primary" className="w-full">
          Save Changes
        </Button>
      </div>
    </div>
  );

  const renderProfileInfoView = () => (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <TextField value={userData.name} disabled fullWidth size="small" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="flex gap-2">
              <TextField value={userData.email} disabled className="flex-1" size="small" />
              <Button 
                variant="text" 
                onClick={() => setEmailModalOpen(true)}
                className="!text-blue-600"
              >
                Change email
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Passport ID</label>
            <TextField value={userData.passportId} disabled fullWidth size="small" />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Passport Document</label>
            <div className="mt-1 p-4 border-2 border-dashed border-gray-300 rounded-lg">
              <Button variant="outlined" startIcon={<Upload />} fullWidth>
                Upload Passport
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Verification Status</label>
            <div className="flex items-center gap-2 mt-1">
              {userData.isVerified ? (
                <>
                  <CheckCircle className="!w-5 !h-5 text-green-500" />
                  <Chip label="Verified" color="success" size="small" />
                </>
              ) : (
                <>
                  <Cancel className="!w-5 !h-5 text-red-500" />
                  <Chip label="Unverified" color="error" size="small" />
                </>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Leaderboard Status</label>
            <p className="text-sm text-gray-600">
              {userData.onLeaderboard ? 'On Leaderboard' : 'Not on Leaderboard'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <p className="text-sm text-gray-600">
              {userData.isTeamMember ? 'Team Member' : 'Individual Founder'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsView = () => (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Notifications</h2>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card 
            key={notification.id}
            className={`shadow-sm ${!notification.isRead ? '!border !border-gray-300' : ''}`}
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
    </div>
  );

  const renderFastTrakView = () => (
    <div className="p-6 max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardContent className="text-center py-8">
          <h1 className="text-4xl font-bold mb-4">Fast Trak Tour</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Accelerate your certification journey with our Fast Trak program. 
            Get access to premium study materials, personalized coaching, and 
            priority scheduling for your examinations.
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const renderSpecialOfferView = () => (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg h-full flex flex-col">
          <CardContent className="flex-grow text-center p-6">
            <h3 className="text-xl font-semibold mb-3">Premium Package</h3>
            <p className="text-gray-600 mb-4 flex-grow">
              Get access to all certification materials, unlimited practice tests, and priority support.
            </p>
            <Button variant="contained" color="primary" fullWidth>
              Learn More
            </Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg h-full flex flex-col">
          <CardContent className="flex-grow text-center p-6">
            <h3 className="text-xl font-semibold mb-3">Group Discount</h3>
            <p className="text-gray-600 mb-4 flex-grow">
              Save 30% when you register 5 or more team members for certification programs.
            </p>
            <Button variant="contained" color="secondary" fullWidth>
              Get Started
            </Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg h-full flex flex-col">
          <CardContent className="flex-grow text-center p-6">
            <h3 className="text-xl font-semibold mb-3">Early Bird Special</h3>
            <p className="text-gray-600 mb-4 flex-grow">
              Register for next quarter's exams and save 20% on all certification fees.
            </p>
            <Button variant="outlined" color="primary" fullWidth>
              Register Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderReportsView = () => (
    <div className="p-6 max-w-6xl mx-auto">
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Reports</h2>
          <div className="overflow-x-auto">
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow className="bg-gray-50">
                    <TableCell className="font-semibold">Report ID</TableCell>
                    <TableCell className="font-semibold">Test Date</TableCell>
                    <TableCell className="font-semibold">Publish Date</TableCell>
                    <TableCell className="font-semibold">Test Name</TableCell>
                    <TableCell className="font-semibold">Status</TableCell>
                    <TableCell align="center" className="font-semibold">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell>{report.testDate}</TableCell>
                      <TableCell>{report.publishDate || '-'}</TableCell>
                      <TableCell>{report.testName}</TableCell>
                      <TableCell>
                        <Chip
                          label={report.status}
                          color={report.status === 'Valid' ? 'success' : 'error'}
                          size="small"
                          icon={report.status === 'Valid' ? <CheckCircle /> : <Cancel />}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <div className="flex gap-1 justify-center">
                          <Tooltip title="Preview">
                            <IconButton
                              size="small"
                              disabled={!report.isPurchased}
                              color="primary"
                            >
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={report.isPurchased ? "Download" : "You haven't purchased this item yet..."}>
                            <IconButton
                              size="small"
                              disabled={!report.isPurchased}
                              color="primary"
                            >
                              <Download />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={report.isPurchased ? "Send to" : "You haven't purchased this item yet..."}>
                            <IconButton
                              size="small"
                              disabled={!report.isPurchased}
                              color="primary"
                              onClick={() => setShareModalOpen(true)}
                            >
                              <Share />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCertificationsView = () => (
    <div className="p-6 max-w-6xl mx-auto">
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Certifications</h2>
          <div className="overflow-x-auto">
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow className="bg-gray-50">
                    <TableCell className="font-semibold">Cert ID</TableCell>
                    <TableCell className="font-semibold">Test Date</TableCell>
                    <TableCell className="font-semibold">Test Name</TableCell>
                    <TableCell className="font-semibold">Status</TableCell>
                    <TableCell align="center" className="font-semibold">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {certifications.map((cert) => (
                    <TableRow key={cert.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{cert.id}</TableCell>
                      <TableCell>{cert.testDate}</TableCell>
                      <TableCell>{cert.testName}</TableCell>
                      <TableCell>
                        <Chip
                          label={cert.status}
                          color={cert.status === 'Valid' ? 'success' : 'error'}
                          size="small"
                          icon={cert.status === 'Valid' ? <CheckCircle /> : <Cancel />}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <div className="flex gap-1 justify-center">
                          <Tooltip title="Preview">
                            <IconButton
                              size="small"
                              disabled={!cert.isPurchased}
                              color="primary"
                            >
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={cert.isPurchased ? "Download" : "You haven't purchased this item yet..."}>
                            <IconButton
                              size="small"
                              disabled={!cert.isPurchased}
                              color="primary"
                            >
                              <Download />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={cert.isPurchased ? "Share to" : "You haven't purchased this item yet..."}>
                            <IconButton
                              size="small"
                              disabled={!cert.isPurchased}
                              color="primary"
                              onClick={() => setShareModalOpen(true)}
                            >
                              <Share />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMainContent = () => {
    if (!activeView) {
      return (
        <div className="flex items-center justify-center h-full text-center p-6">
          <div className="max-w-sm">
            <img 
              src="/lovable-uploads/8a0dff28-ea84-44a3-a3c2-fe796bcb4004.png" 
              alt="Supsindex Logo" 
              className="w-full max-w-xs opacity-70 mx-auto mb-6"
            />
            <h3 className="text-xl text-gray-600">
              Click an item in the sidebar to get started
            </h3>
          </div>
        </div>
      );
    }

    switch (activeView) {
      case 'profile-photo':
        return renderProfilePhotoView();
      case 'profile-info':
        return renderProfileInfoView();
      case 'notifications':
        return renderNotificationsView();
      case 'fast-trak':
        return renderFastTrakView();
      case 'special-offer':
        return renderSpecialOfferView();
      case 'reports':
        return renderReportsView();
      case 'certifications':
        return renderCertificationsView();
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-full overflow-x-hidden flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full h-16 bg-white shadow-md flex items-center justify-between px-4 z-50 max-w-full">
        {/* Profile Master Item */}
        <div className="flex items-center gap-3">
          <Avatar 
            className="!w-10 !h-10 cursor-pointer hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 transition-all"
            onClick={() => setActiveView('profile-photo')}
          >
            {userData.name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <span 
            className="text-lg font-semibold cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => setActiveView('profile-info')}
          >
            {userData.name}
          </span>
        </div>

        {/* Action Items */}
        <div className="flex items-center gap-4">
          <IconButton
            onClick={() => setActiveView(null)}
            className="hover:bg-gray-100"
          >
            <Home />
          </IconButton>
          
          <IconButton
            onClick={handleNotificationClick}
            className="hover:bg-gray-100"
          >
            <Badge badgeContent={notificationCount} color="error">
              <Notifications />
            </Badge>
          </IconButton>
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          className="w-64 flex-shrink-0"
          classes={{
            paper: "w-64 border-r border-gray-200 overflow-hidden",
          }}
        >
          <div className="overflow-auto p-2">
            <List dense>
              {/* Supsindex Offer */}
              <ListItem disablePadding>
                <ListItemButton onClick={() => setSupsindexOpen(!supsindexOpen)}>
                  <ListItemText primary="Supsindex Offer" />
                  {supsindexOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={supsindexOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton 
                    className={`!pl-8 ${activeView === 'fast-trak' ? '!bg-blue-50 !text-blue-600' : ''}`}
                    onClick={() => setActiveView('fast-trak')}
                  >
                    <ListItemText primary="Fast Trak" />
                  </ListItemButton>
                  <ListItemButton 
                    className={`!pl-8 ${activeView === 'special-offer' ? '!bg-blue-50 !text-blue-600' : ''}`}
                    onClick={() => setActiveView('special-offer')}
                  >
                    <ListItemText primary="Special Offer" />
                  </ListItemButton>
                </List>
              </Collapse>

              {/* Certs & Reports */}
              <ListItem disablePadding>
                <ListItemButton onClick={() => setCertsOpen(!certsOpen)}>
                  <ListItemText primary="Certs & Reports" />
                  {certsOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={certsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton 
                    className={`!pl-8 ${activeView === 'reports' ? '!bg-blue-50 !text-blue-600' : ''}`}
                    onClick={() => setActiveView('reports')}
                  >
                    <ListItemText primary="Reports" />
                  </ListItemButton>
                  <ListItemButton 
                    className={`!pl-8 ${activeView === 'certifications' ? '!bg-blue-50 !text-blue-600' : ''}`}
                    onClick={() => setActiveView('certifications')}
                  >
                    <ListItemText primary="Certifications" />
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
          </div>
        </Drawer>

        {/* Main Content */}
        <main className="flex-1 overflow-auto overflow-x-hidden">
          {renderMainContent()}
        </main>
      </div>

      {/* Share Modal */}
      <Dialog open={shareModalOpen} onClose={() => setShareModalOpen(false)}>
        <DialogTitle>Share Options</DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-3 min-w-64">
            <Button
              startIcon={<Twitter />}
              variant="outlined"
              fullWidth
              className="justify-start"
            >
              Share on Twitter
            </Button>
            <Button
              startIcon={<LinkedIn />}
              variant="outlined"
              fullWidth
              className="justify-start"
            >
              Share on LinkedIn
            </Button>
            <Button
              startIcon={<Email />}
              variant="outlined"
              fullWidth
              className="justify-start"
            >
              Send via Email
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShareModalOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Email Change Modal */}
      <Dialog open={emailModalOpen} onClose={() => setEmailModalOpen(false)}>
        <DialogTitle>Change Email Address</DialogTitle>
        <DialogContent>
          <div className="space-y-4 min-w-80 pt-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Email Address</label>
              <TextField
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter your new email"
                fullWidth
                size="small"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
              <TextField
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter verification code"
                fullWidth
                size="small"
              />
              {countdown > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  Resend code in {formatTime(countdown)}
                </p>
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEmailModalOpen(false)}>Cancel</Button>
          <Button onClick={handleEmailSubmit} variant="contained">Update Email</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};