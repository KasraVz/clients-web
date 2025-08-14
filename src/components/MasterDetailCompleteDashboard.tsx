import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Card,
  CardContent,
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
  TextField,
  Tooltip,
  Menu,
  MenuItem,
  Grid,
  Box,
  Chip,
  Popover,
  Checkbox,
} from '@mui/material';
import {
  Home,
  Notifications,
  ExpandLess,
  ExpandMore,
  Visibility,
  Download,
  Share,
  AccessTime,
  HelpOutline,
  Upload,
  CameraAlt,
  Apps,
  Chair,
} from '@mui/icons-material';
import { toast } from 'sonner';

type DetailView = 
  | 'welcome'
  | 'profile-photo'
  | 'profile-info'
  | 'notifications'
  | 'booked-tests'
  | 'feedback-panel'
  | 'community'
  | 'test-history'
  | 'fast-trak'
  | 'special-offer'
  | 'reports'
  | 'certifications';

interface Notification {
  id: string;
  type: 'alert' | 'info';
  content: string;
  isRead: boolean;
  timestamp: string;
}

interface BookedTest {
  orderNumber: string;
  bookedDateTime: string;
  type: 'Individual' | 'Group';
  paymentStatus: 'Purchased' | 'Not Purchased';
  testName: string;
  testTime: string;
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

interface FeedbackItem {
  id: string;
  testId: string;
  selected: boolean;
  comment: string;
}

interface TestHistoryItem {
  number: string;
  orderNumber: string;
  testName: string;
  finalTestDate: string;
  testStatus: 'Done' | 'Not Done';
  paymentStatus: 'Paid' | 'Unpaid';
  kycStatus: 'Accepted' | 'Not Accepted';
}

const MasterDetailCompleteDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<DetailView>('welcome');
  const [notificationCount, setNotificationCount] = useState(3);
  const [sidebarExpanded, setSidebarExpanded] = useState({
    supsindex: false,
    certs: false,
  });
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [timeModalOpen, setTimeModalOpen] = useState(false);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [photoRulesAnchor, setPhotoRulesAnchor] = useState<null | HTMLElement>(null);
  const [newEmail, setNewEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState<string[]>([]);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [currentFeedbackId, setCurrentFeedbackId] = useState('');

  const userData = {
    name: 'John Smith',
    email: 'john.smith@example.com',
    avatar: '/api/placeholder/80/80',
    passportId: 'US123456789',
    isVerified: true,
    isOnLeaderboard: true,
    teamStatus: 'Individual Founder'
  };

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'alert',
      content: "Politely, we'd like to remind you that your FPA exam begins in 2 hours. To review the rules and access the exam link, please click on the 'more' button below.",
      isRead: false,
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      type: 'info',
      content: "It looks like you've started scheduling your EEA exam but didn't finish. You have 2 days to complete the process before your session is automatically canceled.",
      isRead: false,
      timestamp: '1 day ago'
    },
    {
      id: '3',
      type: 'info',
      content: "Your team invitation to 'Project Nexus' has been successfully sent to all members.",
      isRead: true,
      timestamp: '3 days ago'
    }
  ];

  const bookedTests: BookedTest[] = [
    {
      orderNumber: 'ORD001',
      bookedDateTime: '2024-01-15 10:00 AM',
      type: 'Individual',
      paymentStatus: 'Purchased',
      testName: 'FPA Certification',
      testTime: '120 minutes'
    },
    {
      orderNumber: 'ORD002',
      bookedDateTime: '2024-01-20 2:00 PM',
      type: 'Group',
      paymentStatus: 'Not Purchased',
      testName: 'EEA Assessment',
      testTime: '90 minutes'
    }
  ];

  const reports: Report[] = [
    {
      id: 'RPT001',
      testDate: '2023-12-15',
      publishDate: '2023-12-20',
      testName: 'FPA Certification',
      status: 'Valid',
      isPurchased: true
    },
    {
      id: 'RPT002',
      testDate: '2023-11-10',
      publishDate: '2023-11-15',
      testName: 'EEA Assessment',
      status: 'Expired',
      isPurchased: false
    }
  ];

  const certifications: Certification[] = [
    {
      id: 'CERT001',
      testDate: '2023-12-15',
      testName: 'FPA Certification',
      status: 'Valid',
      isPurchased: true
    },
    {
      id: 'CERT002',
      testDate: '2023-10-20',
      testName: 'Business Analysis',
      status: 'Expired',
      isPurchased: false
    }
  ];

  const feedbackItems: FeedbackItem[] = [
    {
      id: 'FB001',
      testId: 'TST001',
      selected: false,
      comment: ''
    },
    {
      id: 'FB002',
      testId: 'TST002',
      selected: false,
      comment: ''
    },
    {
      id: 'FB003',
      testId: 'TST003',
      selected: false,
      comment: ''
    }
  ];

  const testHistoryItems: TestHistoryItem[] = [
    {
      number: '1',
      orderNumber: 'ORD001',
      testName: 'FPA Certification',
      finalTestDate: '2023-12-15',
      testStatus: 'Done',
      paymentStatus: 'Paid',
      kycStatus: 'Accepted'
    },
    {
      number: '2',
      orderNumber: 'ORD002',
      testName: 'EEA Assessment',
      finalTestDate: '2023-11-20',
      testStatus: 'Not Done',
      paymentStatus: 'Unpaid',
      kycStatus: 'Not Accepted'
    },
    {
      number: '3',
      orderNumber: 'ORD003',
      testName: 'Business Analysis',
      finalTestDate: '2023-10-10',
      testStatus: 'Done',
      paymentStatus: 'Paid',
      kycStatus: 'Accepted'
    }
  ];

  const handleSidebarToggle = (section: 'supsindex' | 'certs') => {
    setSidebarExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleNotificationClick = () => {
    setActiveView('notifications');
    setNotificationCount(0);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handlePhotoRulesClick = (event: React.MouseEvent<HTMLElement>) => {
    setPhotoRulesAnchor(event.currentTarget);
  };

  const handlePhotoRulesClose = () => {
    setPhotoRulesAnchor(null);
  };

  const handleTestRulesClick = () => {
    toast.success(
      <div>
        <strong>Test Rules:</strong>
        <ul className="mt-2 space-y-1">
          <li>• Arrive 15 minutes early</li>
          <li>• Bring valid ID</li>
          <li>• No electronic devices allowed</li>
          <li>• Test duration is strictly enforced</li>
        </ul>
      </div>,
      { duration: 5000 }
    );
  };

  const renderWelcomeView = () => (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <img 
        src="/lovable-uploads/8a0dff28-ea84-44a3-a3c2-fe796bcb4004.png" 
        alt="Supsindex Logo" 
        className="w-64 h-auto"
      />
      <Typography variant="h4" className="text-center font-semibold">
        Welcome to Your Dashboard
      </Typography>
      <Typography variant="body1" className="text-center text-gray-600">
        Click an item in the sidebar or header to get started.
      </Typography>
    </div>
  );

  const renderProfilePhotoView = () => (
    <div className="w-full flex flex-col items-center justify-center space-y-6 p-8">
      <Avatar 
        src={userData.avatar}
        sx={{ width: 288, height: 288 }}
        className="shadow-lg"
      />
      <div className="flex space-x-4">
        <Button variant="contained" startIcon={<Upload />}>
          Upload new photo
        </Button>
        <Button variant="outlined" startIcon={<CameraAlt />}>
          Take photo
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <IconButton 
          size="small"
          onClick={handlePhotoRulesClick}
          className="text-gray-500"
        >
          <HelpOutline />
        </IconButton>
        <Typography variant="caption" className="text-gray-500">
          Photo requirements
        </Typography>
      </div>
      <Button variant="contained" size="large" className="mt-4">
        Submit
      </Button>
      
      <Popover
        open={Boolean(photoRulesAnchor)}
        anchorEl={photoRulesAnchor}
        onClose={handlePhotoRulesClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Box p={2} maxWidth={200}>
          <Typography variant="caption">
            • Use clear, recent photo
            • Face should be visible
            • No filters or edits
            • JPG or PNG format
          </Typography>
        </Box>
      </Popover>
    </div>
  );

  const renderProfileInfoView = () => (
    <div className="w-full flex flex-col items-center justify-center p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <TextField
          label="Name"
          value={userData.name}
          disabled
          fullWidth
        />
        <div className="flex items-center space-x-2">
          <TextField
            label="Email"
            value={userData.email}
            disabled
            fullWidth
          />
          <Button 
            variant="text" 
            size="small"
            onClick={() => setEmailModalOpen(true)}
          >
            Change
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <TextField
            label="Passport ID"
            value={userData.passportId}
            disabled
            fullWidth
          />
          <Button variant="outlined" size="small">
            Upload
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Typography variant="body2">Verification Status:</Typography>
          <Chip 
            label={userData.isVerified ? 'Verified' : 'Unverified'}
            color={userData.isVerified ? 'success' : 'error'}
            size="small"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Typography variant="body2">Leaderboard:</Typography>
          <Chip 
            label={userData.isOnLeaderboard ? 'On Leaderboard' : 'Not Listed'}
            color={userData.isOnLeaderboard ? 'primary' : 'default'}
            size="small"
          />
        </div>
        <TextField
          label="Team Status"
          value={userData.teamStatus}
          disabled
          fullWidth
        />
      </div>
    </div>
  );

  const renderNotificationsView = () => (
    <div className="max-w-xl mx-auto flex flex-col items-center space-y-4 p-4">
      {notifications.map((notification) => (
        <Card 
          key={notification.id}
          className={`w-full ${!notification.isRead ? 'border border-gray-300' : ''}`}
        >
          <CardContent>
            <div className="flex justify-between items-start mb-2">
              <Chip 
                label={notification.type === 'alert' ? 'Alert' : 'Information'}
                color={notification.type === 'alert' ? 'warning' : 'info'}
                size="small"
              />
              <Typography variant="caption" className="text-gray-500">
                {notification.timestamp}
              </Typography>
            </div>
            <Typography variant="body2">
              {notification.content}
            </Typography>
            {notification.type === 'alert' && (
              <Button variant="text" size="small" className="mt-2">
                More
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderBookedTestsView = () => (
    <div className="w-full flex flex-col items-center justify-center p-8">
      <TableContainer component={Paper} className="max-w-6xl w-full">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order Number</TableCell>
              <TableCell>Booked Date & Time</TableCell>
              <TableCell>Individual / Group</TableCell>
              <TableCell>Payment Data</TableCell>
              <TableCell>Test Name & Specification</TableCell>
              <TableCell>Test Time</TableCell>
              <TableCell>Test Rules</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookedTests.map((test) => (
              <TableRow key={test.orderNumber}>
                <TableCell>{test.orderNumber}</TableCell>
                <TableCell>{test.bookedDateTime}</TableCell>
                <TableCell>{test.type}</TableCell>
                <TableCell>
                  <Chip 
                    label={test.paymentStatus}
                    color={test.paymentStatus === 'Purchased' ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{test.testName}</TableCell>
                <TableCell>
                  <IconButton 
                    size="small"
                    onClick={() => setTimeModalOpen(true)}
                  >
                    <AccessTime />
                  </IconButton>
                  {test.testTime}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="text" 
                      size="small"
                      onClick={handleTestRulesClick}
                    >
                      View Rules
                    </Button>
                    <Button 
                      variant="text" 
                      size="small"
                      startIcon={<Chair />}
                      onClick={handleTestRulesClick}
                    >
                      Set Condition
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );

  const renderFastTrakView = () => (
    <div className="w-full flex flex-col items-center justify-center p-8">
      <Card className="max-w-2xl w-full">
        <CardContent className="text-center py-8">
          <Typography variant="h4" className="mb-4">
            Fast Trak Tour
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Accelerate your certification journey with our Fast Trak program. 
            Get personalized guidance and expedited processing for your assessments.
          </Typography>
          <Button variant="contained" size="large" className="mt-6">
            Start Fast Trak
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderSpecialOfferView = () => (
    <div className="w-full flex flex-col items-center justify-center p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <Typography variant="h6" className="mb-2">
              Premium Package
            </Typography>
            <Typography variant="body2" className="mb-4">
              Get access to all certification courses and priority support.
            </Typography>
            <Button variant="contained" color="secondary">
              Learn More
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500 to-teal-600 text-white">
          <CardContent className="p-6">
            <Typography variant="h6" className="mb-2">
              Team Training
            </Typography>
            <Typography variant="body2" className="mb-4">
              Train your entire team with our group certification programs.
            </Typography>
            <Button variant="contained" color="secondary">
              Get Started
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
          <CardContent className="p-6">
            <Typography variant="h6" className="mb-2">
              Express Certification
            </Typography>
            <Typography variant="body2" className="mb-4">
              Fast-track your certification with our intensive programs.
            </Typography>
            <Button variant="contained" color="secondary">
              Apply Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderReportsView = () => (
    <div className="w-full flex flex-col items-center justify-center p-8">
      <TableContainer component={Paper} className="max-w-6xl w-full">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Report ID</TableCell>
              <TableCell>Test Date</TableCell>
              <TableCell>Publish Date</TableCell>
              <TableCell>Test Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Preview</TableCell>
              <TableCell>Download</TableCell>
              <TableCell>Send To</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.id}</TableCell>
                <TableCell>{report.testDate}</TableCell>
                <TableCell>{report.publishDate}</TableCell>
                <TableCell>{report.testName}</TableCell>
                <TableCell>
                  <Chip 
                    label={report.status}
                    color={report.status === 'Valid' ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Tooltip title={!report.isPurchased ? "You haven't purchased this item yet..." : ""}>
                    <span>
                      <IconButton 
                        size="small"
                        disabled={!report.isPurchased}
                      >
                        <Visibility />
                      </IconButton>
                    </span>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title={!report.isPurchased ? "You haven't purchased this item yet..." : ""}>
                    <span>
                      <IconButton 
                        size="small"
                        disabled={!report.isPurchased}
                      >
                        <Download />
                      </IconButton>
                    </span>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title={!report.isPurchased ? "You haven't purchased this item yet..." : ""}>
                    <span>
                      <IconButton 
                        size="small"
                        disabled={!report.isPurchased}
                        onClick={() => setShareModalOpen(true)}
                      >
                        <Share />
                      </IconButton>
                    </span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );

  const renderCertificationsView = () => (
    <div className="w-full flex flex-col items-center justify-center p-8">
      <TableContainer component={Paper} className="max-w-5xl w-full">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cert ID</TableCell>
              <TableCell>Test Date</TableCell>
              <TableCell>Test Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Preview</TableCell>
              <TableCell>Download</TableCell>
              <TableCell>Share To</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {certifications.map((cert) => (
              <TableRow key={cert.id}>
                <TableCell>{cert.id}</TableCell>
                <TableCell>{cert.testDate}</TableCell>
                <TableCell>{cert.testName}</TableCell>
                <TableCell>
                  <Chip 
                    label={cert.status}
                    color={cert.status === 'Valid' ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Tooltip title={!cert.isPurchased ? "You haven't purchased this item yet..." : ""}>
                    <span>
                      <IconButton 
                        size="small"
                        disabled={!cert.isPurchased}
                      >
                        <Visibility />
                      </IconButton>
                    </span>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title={!cert.isPurchased ? "You haven't purchased this item yet..." : ""}>
                    <span>
                      <IconButton 
                        size="small"
                        disabled={!cert.isPurchased}
                      >
                        <Download />
                      </IconButton>
                    </span>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title={!cert.isPurchased ? "You haven't purchased this item yet..." : ""}>
                    <span>
                      <IconButton 
                        size="small"
                        disabled={!cert.isPurchased}
                        onClick={() => setShareModalOpen(true)}
                      >
                        <Share />
                      </IconButton>
                    </span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );

  const renderFeedbackPanelView = () => (
    <div className="w-full flex flex-col items-center justify-center p-8">
      <TableContainer component={Paper} className="max-w-5xl w-full">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox 
                  checked={selectedFeedback.length === feedbackItems.length}
                  indeterminate={selectedFeedback.length > 0 && selectedFeedback.length < feedbackItems.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedFeedback(feedbackItems.map(item => item.id));
                    } else {
                      setSelectedFeedback([]);
                    }
                  }}
                />
                Select All
              </TableCell>
              <TableCell>Test ID</TableCell>
              <TableCell>Text Box</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbackItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox 
                    checked={selectedFeedback.includes(item.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedFeedback(prev => [...prev, item.id]);
                      } else {
                        setSelectedFeedback(prev => prev.filter(id => id !== item.id));
                      }
                    }}
                  />
                </TableCell>
                <TableCell>{item.testId}</TableCell>
                <TableCell>
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => {
                      setCurrentFeedbackId(item.id);
                      setCommentModalOpen(true);
                    }}
                  >
                    Add Comment
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );

  const renderCommunityView = () => (
    <div className="w-full flex flex-col items-center justify-center p-8">
      <Typography variant="h4" className="mb-4">
        Community
      </Typography>
      <Typography variant="body1" className="text-center text-gray-600">
        This section will contain the community features, to be designed later.
      </Typography>
    </div>
  );

  const renderTestHistoryView = () => (
    <div className="w-full flex flex-col items-center justify-center p-8">
      <TableContainer component={Paper} className="max-w-6xl w-full">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell>Order Number</TableCell>
              <TableCell>Test Name & Specification</TableCell>
              <TableCell>Final Test Date</TableCell>
              <TableCell>Test Status</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>KYC Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {testHistoryItems.map((item) => (
              <TableRow key={item.number}>
                <TableCell>{item.number}</TableCell>
                <TableCell>{item.orderNumber}</TableCell>
                <TableCell>{item.testName}</TableCell>
                <TableCell>{item.finalTestDate}</TableCell>
                <TableCell>
                  <Chip 
                    label={item.testStatus}
                    color={item.testStatus === 'Done' ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={item.paymentStatus}
                    color={item.paymentStatus === 'Paid' ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={item.kycStatus}
                    color={item.kycStatus === 'Accepted' ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );

  const renderMainContent = () => {
    switch (activeView) {
      case 'welcome':
        return renderWelcomeView();
      case 'profile-photo':
        return renderProfilePhotoView();
      case 'profile-info':
        return renderProfileInfoView();
      case 'notifications':
        return renderNotificationsView();
      case 'booked-tests':
        return renderBookedTestsView();
      case 'feedback-panel':
        return renderFeedbackPanelView();
      case 'community':
        return renderCommunityView();
      case 'test-history':
        return renderTestHistoryView();
      case 'fast-trak':
        return renderFastTrakView();
      case 'special-offer':
        return renderSpecialOfferView();
      case 'reports':
        return renderReportsView();
      case 'certifications':
        return renderCertificationsView();
      default:
        return renderWelcomeView();
    }
  };

  return (
    <div className="h-screen w-full overflow-x-hidden bg-gray-50">
      {/* Header */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: 50,
          backgroundColor: 'white',
          color: 'black',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <Toolbar className="justify-between px-4">
          <div className="flex items-center space-x-3">
            <Avatar 
              src={userData.avatar}
              sx={{ width: 40, height: 40 }}
              className="cursor-pointer"
              onClick={() => setActiveView('profile-photo')}
            />
            <Typography 
              variant="h6" 
              className="cursor-pointer font-semibold"
              onClick={() => setActiveView('profile-info')}
            >
              {userData.name}
            </Typography>
          </div>
          
          <div className="flex items-center space-x-2">
            <IconButton onClick={() => setActiveView('welcome')}>
              <Home />
            </IconButton>
            
            <IconButton onClick={handleMenuClick}>
              <Apps />
            </IconButton>
            
            <IconButton onClick={handleNotificationClick}>
              <Badge badgeContent={notificationCount} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 256,
          flexShrink: 0,
          zIndex: 40,
          '& .MuiDrawer-paper': {
            width: 256,
            boxSizing: 'border-box',
            top: 64,
            height: 'calc(100vh - 64px)',
            backgroundColor: 'white',
            boxShadow: '2px 0 4px rgba(0,0,0,0.1)'
          },
        }}
      >
        <List className="p-4">
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleSidebarToggle('supsindex')}>
              <ListItemText primary="Supsindex Offer" />
              {sidebarExpanded.supsindex ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={sidebarExpanded.supsindex} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton 
                sx={{ pl: 4 }}
                onClick={() => setActiveView('fast-trak')}
                className={activeView === 'fast-trak' ? 'bg-blue-50 shadow-md' : ''}
              >
                <ListItemText primary="Fast Trak" />
              </ListItemButton>
              <ListItemButton 
                sx={{ pl: 4 }}
                onClick={() => setActiveView('special-offer')}
                className={activeView === 'special-offer' ? 'bg-blue-50 shadow-md' : ''}
              >
                <ListItemText primary="Special Offer" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => setActiveView('booked-tests')}
              className={activeView === 'booked-tests' ? 'bg-blue-50 shadow-md' : ''}
            >
              <ListItemText primary="Booked tests" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => setActiveView('feedback-panel')}
              className={activeView === 'feedback-panel' ? 'bg-blue-50 shadow-md' : ''}
            >
              <ListItemText primary="Feedback Panel" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => setActiveView('community')}
              className={activeView === 'community' ? 'bg-blue-50 shadow-md' : ''}
            >
              <ListItemText primary="Community" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => setActiveView('test-history')}
              className={activeView === 'test-history' ? 'bg-blue-50 shadow-md' : ''}
            >
              <ListItemText primary="Test History" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => handleSidebarToggle('certs')}>
              <ListItemText primary="Certs & Reports" />
              {sidebarExpanded.certs ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={sidebarExpanded.certs} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton 
                sx={{ pl: 4 }}
                onClick={() => setActiveView('reports')}
                className={activeView === 'reports' ? 'bg-blue-50 shadow-md' : ''}
              >
                <ListItemText primary="Reports" />
              </ListItemButton>
              <ListItemButton 
                sx={{ pl: 4 }}
                onClick={() => setActiveView('certifications')}
                className={activeView === 'certifications' ? 'bg-blue-50 shadow-md' : ''}
              >
                <ListItemText primary="Certifications" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Drawer>

      {/* Main Content */}
      <main className="mt-16 ml-64 p-6 overflow-x-hidden overflow-y-auto h-[calc(100vh-64px)]">
        {renderMainContent()}
      </main>

      {/* Modals and Dialogs */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Add a new path</MenuItem>
        <MenuItem onClick={handleMenuClose}>Change the dashboard</MenuItem>
      </Menu>

      <Dialog open={emailModalOpen} onClose={() => setEmailModalOpen(false)}>
        <DialogTitle>Change Email Address</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="mb-4"
          />
          <TextField
            margin="dense"
            label="Verification Code"
            fullWidth
            variant="outlined"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEmailModalOpen(false)}>Cancel</Button>
          <Button variant="contained">Verify & Update</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={shareModalOpen} onClose={() => setShareModalOpen(false)}>
        <DialogTitle>Share Report/Certification</DialogTitle>
        <DialogContent>
          <div className="flex flex-col space-y-4 py-4">
            <Button variant="outlined" fullWidth>
              Share via Twitter
            </Button>
            <Button variant="outlined" fullWidth>
              Share via LinkedIn
            </Button>
            <Button variant="outlined" fullWidth>
              Share via Email
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShareModalOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={timeModalOpen} onClose={() => setTimeModalOpen(false)}>
        <DialogTitle>Set Test Time</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="New Date & Time"
            type="datetime-local"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTimeModalOpen(false)}>Cancel</Button>
          <Button variant="contained">Update Time</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={commentModalOpen} onClose={() => setCommentModalOpen(false)}>
        <DialogTitle>Add Comment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Comment"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={feedbackComment}
            onChange={(e) => setFeedbackComment(e.target.value)}
            className="mb-4"
          />
          <div className="flex space-x-2">
            <Button variant="outlined" component="label">
              Upload Evidence
              <input type="file" hidden />
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCommentModalOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => {
            setFeedbackComment('');
            setCommentModalOpen(false);
          }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MasterDetailCompleteDashboard;