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
  TextField,
  Typography,
  Card,
  CardContent,
  Menu,
  MenuItem,
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
  Apps,
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

export const CompleteDashboard = () => {
  const [activeView, setActiveView] = useState<DetailView>(null);
  const [supsindexOpen, setSupsindexOpen] = useState(false);
  const [certsOpen, setCertsOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(2);
  const [newEmail, setNewEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

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
    <div className="w-full flex flex-col items-center justify-center space-y-6 p-8">
      <Avatar className="w-72 h-72 text-6xl border-4 border-blue-100"
        sx={{ 
          backgroundColor: '#1976d2',
          color: 'white',
        }}
      >
        {userData.name.split(' ').map(n => n[0]).join('')}
      </Avatar>
      
      <div className="flex gap-4 w-full max-w-md">
        <Button variant="outlined" startIcon={<Upload />} className="flex-1" size="large">
          Upload new photo
        </Button>
        <Button variant="outlined" startIcon={<CameraAlt />} className="flex-1" size="large">
          Take photo
        </Button>
      </div>

      <Tooltip title="Photo should be clear, well-lit, and show your face clearly. Accepted formats: JPG, PNG. Max size: 5MB.">
        <HelpOutline sx={{ fontSize: 20, color: 'gray', cursor: 'help' }} />
      </Tooltip>

      <Button variant="contained" color="primary" size="large" className="w-full max-w-md">
        Submit
      </Button>
    </div>
  );

  const renderProfileInfoView = () => (
    <div className="w-full flex flex-col items-center justify-center p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
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
                sx={{ color: '#1976d2', minWidth: 'auto' }}
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
                  <CheckCircle sx={{ fontSize: 20, color: 'green' }} />
                  <Chip label="Verified" color="success" size="small" />
                </>
              ) : (
                <>
                  <Cancel sx={{ fontSize: 20, color: 'red' }} />
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
    <div className="max-w-xl mx-auto flex flex-col items-center space-y-4 p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Notifications</h2>
      {notifications.map((notification) => (
        <Card 
          key={notification.id}
          elevation={2}
          sx={{ 
            border: !notification.isRead ? '1px solid #e0e0e0' : 'none',
            borderRadius: 2,
            width: '100%'
          }}
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

  const renderFastTrakView = () => (
    <div className="w-full flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <Card elevation={3}>
          <CardContent className="text-center py-8">
            <h1 className="text-4xl font-bold mb-4 text-blue-600">Fast Trak Tour</h1>
            <p className="text-gray-600 max-w-xl mx-auto text-lg">
              Accelerate your certification journey with our Fast Trak program. 
              Get access to premium study materials, personalized coaching, and 
              priority scheduling for your examinations.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSpecialOfferView = () => (
    <div className="w-full flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Special Offers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        <Card 
          elevation={3} 
          className="h-full flex flex-col"
          sx={{ 
            borderRadius: '1.5rem 0.5rem 1.5rem 0.5rem',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            color: 'white'
          }}
        >
          <CardContent className="flex-grow text-center p-6">
            <h3 className="text-xl font-semibold mb-3">FPA Exam Discount</h3>
            <p className="mb-4 flex-grow">
              Get 30% off your Financial Planning Assessment exam registration
            </p>
            <div className="bg-white/20 rounded-lg p-3 mb-4">
              <p className="text-sm font-semibold">Save $150 on certification</p>
            </div>
            <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }} fullWidth size="large">
              Book Now
            </Button>
          </CardContent>
        </Card>
        
        <Card 
          elevation={3} 
          className="h-full flex flex-col"
          sx={{ 
            borderRadius: '0.5rem 1.5rem 0.5rem 1.5rem',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white'
          }}
        >
          <CardContent className="flex-grow text-center p-6">
            <h3 className="text-xl font-semibold mb-3">EEA Bundle Special</h3>
            <p className="mb-4 flex-grow">
              Complete Economic Evaluation Assessment package with study materials
            </p>
            <div className="bg-white/20 rounded-lg p-3 mb-4">
              <p className="text-sm font-semibold">20% off full bundle + bonus materials</p>
            </div>
            <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }} fullWidth size="large">
              Book Now
            </Button>
          </CardContent>
        </Card>
        
        <Card 
          elevation={3} 
          className="h-full flex flex-col"
          sx={{ 
            borderRadius: '1.5rem',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
            color: 'white'
          }}
        >
          <CardContent className="flex-grow text-center p-6">
            <h3 className="text-xl font-semibold mb-3">Team Certification</h3>
            <p className="mb-4 flex-grow">
              Group rates for teams of 5 or more participants
            </p>
            <div className="bg-white/20 rounded-lg p-3 mb-4">
              <p className="text-sm font-semibold">Up to 40% savings per member</p>
            </div>
            <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }} fullWidth size="large">
              Book Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderReportsView = () => (
    <div className="w-full flex flex-col items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <Card elevation={3}>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Reports</h2>
            <div className="overflow-x-auto">
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>Report ID</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Test Date</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Publish Date</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Test Name</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Expired/Valid</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Preview</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Download</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Send to</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow key={report.id} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                        <TableCell sx={{ fontWeight: 'medium' }}>{report.id}</TableCell>
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
                          <Tooltip title={report.isPurchased ? "Preview" : "You haven't purchased this item yet..."}>
                            <IconButton
                              size="small"
                              disabled={!report.isPurchased}
                              color="primary"
                            >
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title={report.isPurchased ? "Download" : "You haven't purchased this item yet..."}>
                            <IconButton
                              size="small"
                              disabled={!report.isPurchased}
                              color="primary"
                            >
                              <Download />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="center">
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
    </div>
  );

  const renderCertificationsView = () => (
    <div className="w-full flex flex-col items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <Card elevation={3}>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Certifications</h2>
            <div className="overflow-x-auto">
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>Cert ID</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Test Date</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Test Name</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Expired/Valid</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Preview</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Download</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Share to</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {certifications.map((cert) => (
                      <TableRow key={cert.id} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                        <TableCell sx={{ fontWeight: 'medium' }}>{cert.id}</TableCell>
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
                          <Tooltip title={cert.isPurchased ? "Preview" : "You haven't purchased this item yet..."}>
                            <IconButton
                              size="small"
                              disabled={!cert.isPurchased}
                              color="primary"
                            >
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title={cert.isPurchased ? "Download" : "You haven't purchased this item yet..."}>
                            <IconButton
                              size="small"
                              disabled={!cert.isPurchased}
                              color="primary"
                            >
                              <Download />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="center">
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
    </div>
  );

  const renderMainContent = () => {
    if (!activeView) {
      return (
        <div className="h-full flex flex-col items-center justify-center space-y-4" style={{ marginLeft: '193px' }}>
          <img 
            src="/lovable-uploads/8a0dff28-ea84-44a3-a3c2-fe796bcb4004.png" 
            alt="Supsindex Logo" 
            className="w-full max-w-sm mx-auto"
          />
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome to Your Dashboard
          </h1>
          <p className="text-lg text-gray-600 text-center">
            Click an item in the sidebar or header to get started
          </p>
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
      <header className="fixed top-0 left-0 w-full h-16 bg-white shadow-md flex items-center justify-between px-4 z-50">
        {/* Profile Master Item */}
        <div className="flex items-center gap-3">
          <Avatar 
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setActiveView('profile-photo')}
            sx={{ 
              backgroundColor: '#1976d2',
              color: 'white',
              '&:hover': { 
                boxShadow: '0 0 0 2px #1976d2, 0 0 0 4px rgba(25, 118, 210, 0.2)' 
              },
              transition: 'all 0.2s ease'
            }}
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
            onClick={(e) => setMenuAnchor(e.currentTarget)}
            className="hover:bg-gray-100"
          >
            <Apps />
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
        <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white shadow-lg p-4 z-40 overflow-y-auto">
          <nav>
            <List dense>
              {/* Supsindex Offer */}
              <ListItem disablePadding>
                <ListItemButton 
                  onClick={() => setSupsindexOpen(!supsindexOpen)}
                  className="rounded-md hover:bg-gray-50"
                >
                  <ListItemText primary="Supsindex Offer" />
                  {supsindexOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={supsindexOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton 
                    className={`pl-8 rounded-md ${
                      activeView === 'fast-trak' 
                        ? 'bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-200' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveView('fast-trak')}
                  >
                    <ListItemText primary="Fast Trak" />
                  </ListItemButton>
                  <ListItemButton 
                    className={`pl-8 rounded-md ${
                      activeView === 'special-offer' 
                        ? 'bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-200' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveView('special-offer')}
                  >
                    <ListItemText primary="Special Offer" />
                  </ListItemButton>
                </List>
              </Collapse>

              {/* Certs & Reports */}
              <ListItem disablePadding>
                <ListItemButton 
                  onClick={() => setCertsOpen(!certsOpen)}
                  className="rounded-md hover:bg-gray-50"
                >
                  <ListItemText primary="Certs & Reports" />
                  {certsOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={certsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton 
                    className={`pl-8 rounded-md ${
                      activeView === 'reports' 
                        ? 'bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-200' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveView('reports')}
                  >
                    <ListItemText primary="Reports" />
                  </ListItemButton>
                  <ListItemButton 
                    className={`pl-8 rounded-md ${
                      activeView === 'certifications' 
                        ? 'bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-200' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveView('certifications')}
                  >
                    <ListItemText primary="Certifications" />
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="md:ml-64 mt-16 p-6 overflow-x-hidden overflow-y-auto">
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
              sx={{ justifyContent: 'flex-start' }}
            >
              Share on Twitter
            </Button>
            <Button
              startIcon={<LinkedIn />}
              variant="outlined"
              fullWidth
              sx={{ justifyContent: 'flex-start' }}
            >
              Share on LinkedIn
            </Button>
            <Button
              startIcon={<Email />}
              variant="outlined"
              fullWidth
              sx={{ justifyContent: 'flex-start' }}
            >
              Send via Email
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShareModalOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Menu Dropdown */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => setMenuAnchor(null)}>
          Add a new path
        </MenuItem>
        <MenuItem onClick={() => setMenuAnchor(null)}>
          Change the dashboard
        </MenuItem>
      </Menu>

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