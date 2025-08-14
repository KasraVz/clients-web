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
  Grid,
  Box,
  Chip,
  Popover,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
  ContentCopy,
  WhatsApp,
  Telegram,
  Email,
  AttachFile,
  MailOutline,
  RadioButtonUnchecked,
  RadioButtonChecked,
} from '@mui/icons-material';
import { toast } from 'sonner';

type DetailView = 
  | 'welcome'
  | 'profile'
  | 'notifications'
  | 'booked-tests'
  | 'feedback-panel'
  | 'community'
  | 'test-history'
  | 'fast-trak'
  | 'special-offer'
  | 'reports'
  | 'certifications'
  | 'affiliate-section'
  | 'referral-section'
  | 'general-scholarship'
  | 'request-scholarship'
  | 'connecting-team'
  | 'ticketing-system';

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

interface AffiliateEntity {
  id: string;
  name: string;
  logo: string;
  code: string;
  entryDate: string;
  testsRequested: string[];
}

interface ReferralUser {
  id: string;
  name: string;
  registrationDate: string;
  status: 'Active' | 'Pending';
}

interface Ticket {
  id: string;
  subject: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Closed';
  lastUpdate: string;
  attachments?: string[];
}

const MasterDetailCompleteDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<DetailView>('welcome');
  const [notificationCount, setNotificationCount] = useState(3);
  const [sidebarExpanded, setSidebarExpanded] = useState({
    supsindex: false,
    certs: false,
    referral: false,
    scholarship: false,
  });
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [timeModalOpen, setTimeModalOpen] = useState(false);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [invisibleAccountModalOpen, setInvisibleAccountModalOpen] = useState(false);
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [photoRulesAnchor, setPhotoRulesAnchor] = useState<null | HTMLElement>(null);
  const [newEmail, setNewEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState<string[]>([]);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [currentFeedbackId, setCurrentFeedbackId] = useState('');
  const [invisibleReason, setInvisibleReason] = useState('');
  const [customInvisibleReason, setCustomInvisibleReason] = useState('');
  const [deleteReason, setDeleteReason] = useState('');
  const [customDeleteReason, setCustomDeleteReason] = useState('');
  
  // Ticketing system state
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketPriority, setTicketPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');

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

  const affiliateEntities: AffiliateEntity[] = [
    {
      id: 'AFF001',
      name: 'TechCorp Solutions',
      logo: '/api/placeholder/60/60',
      code: 'TECH2024',
      entryDate: '2023-06-15',
      testsRequested: ['FPA Certification', 'EEA Assessment', 'Business Analysis']
    },
    {
      id: 'AFF002',
      name: 'Global Learning Institute',
      logo: '/api/placeholder/60/60',
      code: 'GLI2024',
      entryDate: '2023-08-20',
      testsRequested: ['Advanced Analytics', 'Project Management']
    },
    {
      id: 'AFF003',
      name: 'Innovation Hub',
      logo: '/api/placeholder/60/60',
      code: 'INNOV2024',
      entryDate: '2023-09-10',
      testsRequested: ['Digital Transformation', 'Leadership Assessment']
    }
  ];

  const referralUsers: ReferralUser[] = [
    {
      id: 'REF001',
      name: 'Sarah Johnson',
      registrationDate: '2023-11-15',
      status: 'Active'
    },
    {
      id: 'REF002',
      name: 'Michael Chen',
      registrationDate: '2023-12-02',
      status: 'Active'
    },
    {
      id: 'REF003',
      name: 'Emily Rodriguez',
      registrationDate: '2024-01-08',
      status: 'Pending'
    }
  ];

  const userReferralCode = 'JS2024REF';

  // Scholarship data
  const scholarshipItems = [
    'Merit-Based Excellence Scholarship',
    'Financial Need Assistance Program',
    'Diversity and Inclusion Scholarship',
    'Academic Achievement Award',
    'Research Innovation Grant'
  ];

  const [scholarshipRequest, setScholarshipRequest] = useState('');

  // Sample ticket data
  const tickets: Ticket[] = [
    {
      id: 'TKT001',
      subject: 'Login Issues with Two-Factor Authentication',
      description: 'Unable to login when 2FA is enabled on my account',
      priority: 'High',
      status: 'Open',
      lastUpdate: '2024-01-15'
    },
    {
      id: 'TKT002',
      subject: 'Certification Download Problem',
      description: 'Certificate PDF is not downloading after completion',
      priority: 'Medium',
      status: 'In Progress',
      lastUpdate: '2024-01-12'
    },
    {
      id: 'TKT003',
      subject: 'Payment Method Update',
      description: 'Need assistance updating payment information',
      priority: 'Low',
      status: 'Closed',
      lastUpdate: '2024-01-08'
    }
  ];

  const handleSidebarToggle = (section: 'supsindex' | 'certs' | 'referral' | 'scholarship') => {
    setSidebarExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(userReferralCode);
    toast.success('Referral code copied to clipboard!');
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

  const renderProfileView = () => (
    <div className="w-full flex flex-col items-center justify-center space-y-6 p-8">
      {/* Profile Photo Section */}
      <div className="flex flex-col items-center space-y-6">
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
      </div>

      {/* Profile Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full mt-8">
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

      {/* Account Options Section */}
      <div className="flex flex-col space-y-4 mt-8 max-w-md w-full">
        <Typography variant="h6" className="text-center">Account Options</Typography>
        <Button 
          variant="outlined" 
          color="warning"
          onClick={() => setInvisibleAccountModalOpen(true)}
          fullWidth
        >
          Make my Account Invisible
        </Button>
        <Button 
          variant="outlined" 
          color="error"
          onClick={() => setDeleteAccountModalOpen(true)}
          fullWidth
        >
          Delete my Account
        </Button>
      </div>
      
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

  const renderAffiliateSectionView = () => (
    <div className="w-full flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-6">
        {affiliateEntities.map((affiliate) => (
          <Card key={affiliate.id} className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar 
                  src={affiliate.logo}
                  sx={{ width: 60, height: 60 }}
                  className="shadow-md"
                />
                <div className="flex-1">
                  <Typography variant="h6" className="mb-1">
                    <Button variant="text" color="primary">
                      {affiliate.name}
                    </Button>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Affiliate Code: <strong>{affiliate.code}</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Entry Date: {affiliate.entryDate}
                  </Typography>
                </div>
              </div>
              <div>
                <Typography variant="subtitle2" className="mb-2">
                  Tests Requested:
                </Typography>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {affiliate.testsRequested.map((test, index) => (
                    <Chip 
                      key={index}
                      label={test}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderReferralSectionView = () => (
    <div className="w-full flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-6">
        {/* Referral Code Section */}
        <Card className="shadow-lg">
          <CardContent className="p-6 text-center">
            <Typography variant="h5" className="mb-4">
              Your Referral Code
            </Typography>
            <Box 
              className="bg-gray-100 p-4 rounded-lg mb-4 border-2 border-dashed border-gray-300"
            >
              <Typography 
                variant="h4" 
                className="font-mono font-bold text-primary"
              >
                {userReferralCode}
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              startIcon={<ContentCopy />}
              onClick={handleCopyReferralCode}
              className="mb-4"
            >
              Copy Code
            </Button>
            
            <Typography variant="h6" className="mb-3">
              Quick Share
            </Typography>
            <div className="flex justify-center space-x-2">
              <IconButton 
                color="primary"
                onClick={() => toast.success('WhatsApp share functionality coming soon!')}
              >
                <WhatsApp />
              </IconButton>
              <IconButton 
                color="primary"
                onClick={() => toast.success('Telegram share functionality coming soon!')}
              >
                <Telegram />
              </IconButton>
              <IconButton 
                color="primary"
                onClick={() => toast.success('Email share functionality coming soon!')}
              >
                <Email />
              </IconButton>
            </div>
          </CardContent>
        </Card>

        {/* Referral List Section */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Typography variant="h6" className="mb-4">
              Referral List ({referralUsers.length} users)
            </Typography>
            <div className="space-y-3">
              {referralUsers.map((user) => (
                <div 
                  key={user.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <Typography variant="body1" className="font-medium">
                      {user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Registered: {user.registrationDate}
                    </Typography>
                  </div>
                  <Chip 
                    label={user.status}
                    color={user.status === 'Active' ? 'success' : 'warning'}
                    size="small"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderGeneralScholarshipView = () => (
    <div className="w-full flex flex-col items-center justify-center p-8">
      <Card className="max-w-2xl w-full shadow-lg">
        <CardContent className="p-6">
          <Typography variant="h5" className="mb-4 text-center">
            General Scholarship Items
          </Typography>
          
          <Typography variant="h6" className="mb-3">
            Available Items:
          </Typography>
          <div className="space-y-2 mb-6">
            {scholarshipItems.map((item, index) => (
              <div 
                key={index}
                className="p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <Typography variant="body1">
                  {item}
                </Typography>
              </div>
            ))}
          </div>
          
          <Typography variant="h6" className="mb-3">
            Takeable:
          </Typography>
          <div className="mb-6">
            <Typography variant="body2" color="text.secondary">
              You are currently eligible for {scholarshipItems.slice(0, 3).length} scholarships based on your profile and achievements.
            </Typography>
          </div>
          
          <Button 
            variant="contained" 
            size="large" 
            fullWidth
            onClick={() => toast.success('Scholarship application submitted successfully!')}
          >
            Send Application
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderRequestScholarshipView = () => (
    <div className="w-full flex flex-col items-center justify-center p-8">
      <Card className="max-w-md w-full shadow-lg">
        <CardContent className="p-6">
          <Typography variant="h5" className="mb-4 text-center">
            Request a Specific Scholarship
          </Typography>
          
          <TextField
            label="Describe the scholarship you are requesting"
            multiline
            rows={6}
            fullWidth
            variant="outlined"
            value={scholarshipRequest}
            onChange={(e) => setScholarshipRequest(e.target.value)}
            placeholder="Please provide details about the specific scholarship you are interested in, including the reason for your request and how it aligns with your goals..."
            className="mb-6"
          />
          
          <Button 
            variant="contained" 
            size="large" 
            fullWidth
            onClick={() => {
              setScholarshipRequest('');
              toast.success('Scholarship request submitted successfully!');
            }}
            disabled={!scholarshipRequest.trim()}
          >
            Send Request
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderConnectingTeamView = () => (
    <div className="w-full flex flex-col items-center justify-center p-8">
      <Card className="max-w-2xl w-full shadow-lg">
        <CardContent className="p-6 text-center">
          <Typography variant="h4" className="mb-4">
            Your Team Membership
          </Typography>
          
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <Typography variant="h6" className="mb-2">
              You are currently a member of
            </Typography>
            <Typography variant="h4" className="font-bold text-primary">
              Team Alpha
            </Typography>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <Typography variant="subtitle1" className="font-semibold mb-1">
                Team Role
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Senior Member
              </Typography>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <Typography variant="subtitle1" className="font-semibold mb-1">
                Join Date
              </Typography>
              <Typography variant="body2" color="text.secondary">
                March 15, 2023
              </Typography>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <Typography variant="subtitle1" className="font-semibold mb-1">
                Team Size
              </Typography>
              <Typography variant="body2" color="text.secondary">
                8 Members
              </Typography>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <Typography variant="subtitle1" className="font-semibold mb-1">
                Active Projects
              </Typography>
              <Typography variant="body2" color="text.secondary">
                3 Projects
              </Typography>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="contained">
              View Team Details
            </Button>
            <Button variant="outlined">
              Team Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTicketingSystemView = () => (
    <div className="w-full flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* New Ticket Form */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Typography variant="h5" className="mb-6 text-center">
              Submit New Ticket
            </Typography>
            
            <div className="space-y-4">
              <FormControl fullWidth variant="outlined">
                <InputLabel>Subject</InputLabel>
                <Select
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  label="Subject"
                >
                  <MenuItem value="Technical Issue">Technical Issue</MenuItem>
                  <MenuItem value="Billing Inquiry">Billing Inquiry</MenuItem>
                  <MenuItem value="General Question">General Question</MenuItem>
                  <MenuItem value="Feedback">Feedback</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                label="Description"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={ticketDescription}
                onChange={(e) => setTicketDescription(e.target.value)}
                placeholder="Please provide detailed information about your issue..."
              />
              
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={ticketPriority}
                  label="Priority"
                  onChange={(e) => setTicketPriority(e.target.value as 'Low' | 'Medium' | 'High')}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
              
              <Button
                variant="outlined"
                startIcon={<AttachFile />}
                component="label"
                fullWidth
              >
                Attach File
                <input type="file" hidden multiple />
              </Button>
              
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={() => {
                  if (ticketSubject.trim() && ticketDescription.trim()) {
                    setTicketSubject('');
                    setTicketDescription('');
                    setTicketPriority('Medium');
                    toast.success('Ticket submitted successfully!');
                  } else {
                    toast.error('Please fill in all required fields');
                  }
                }}
              >
                Submit Ticket
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* My Tickets List */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Typography variant="h6" className="mb-4">
              My Tickets
            </Typography>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Ticket ID</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Last Update</TableCell>
                    <TableCell>View Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell>{ticket.id}</TableCell>
                      <TableCell>
                        <Typography variant="body2" className="max-w-xs truncate">
                          {ticket.subject}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={ticket.priority}
                          color={
                            ticket.priority === 'High' ? 'error' :
                            ticket.priority === 'Medium' ? 'warning' : 'default'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={ticket.status}
                          color={
                            ticket.status === 'Open' ? 'error' :
                            ticket.status === 'In Progress' ? 'warning' : 'success'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{ticket.lastUpdate}</TableCell>
                      <TableCell>
                        <IconButton 
                          size="small"
                          onClick={() => toast.info('Ticket details coming soon!')}
                        >
                          <Visibility />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderMainContent = () => {
    switch (activeView) {
      case 'welcome':
        return renderWelcomeView();
      case 'profile':
        return renderProfileView();
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
      case 'affiliate-section':
        return renderAffiliateSectionView();
      case 'referral-section':
        return renderReferralSectionView();
      case 'general-scholarship':
        return renderGeneralScholarshipView();
      case 'request-scholarship':
        return renderRequestScholarshipView();
      case 'connecting-team':
        return renderConnectingTeamView();
      case 'ticketing-system':
        return renderTicketingSystemView();
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
              onClick={() => setActiveView('profile')}
            />
            <Typography 
              variant="h6" 
              className="cursor-pointer font-semibold"
              onClick={() => setActiveView('profile')}
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
          zIndex: 30,
          '& .MuiDrawer-paper': {
            width: 256,
            boxSizing: 'border-box',
            top: 64,
            height: 'calc(100vh - 64px)',
            backgroundColor: 'white',
            boxShadow: '2px 0 4px rgba(0,0,0,0.1)',
            zIndex: 30
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
            <ListItemButton onClick={() => handleSidebarToggle('referral')}>
              <ListItemText primary="Referral / Affiliate" />
              {sidebarExpanded.referral ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>

          <Collapse in={sidebarExpanded.referral} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton 
                sx={{ pl: 4 }}
                onClick={() => setActiveView('affiliate-section')}
                className={activeView === 'affiliate-section' ? 'bg-blue-50 shadow-md' : ''}
              >
                <ListItemText primary="Affiliate Section" />
              </ListItemButton>
              <ListItemButton 
                sx={{ pl: 4 }}
                onClick={() => setActiveView('referral-section')}
                className={activeView === 'referral-section' ? 'bg-blue-50 shadow-md' : ''}
              >
                <ListItemText primary="Referral Section" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItem disablePadding>
            <ListItemButton onClick={() => handleSidebarToggle('scholarship')}>
              <ListItemText primary="Scholarship" />
              {sidebarExpanded.scholarship ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>

          <Collapse in={sidebarExpanded.scholarship} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton 
                sx={{ pl: 4 }}
                onClick={() => setActiveView('general-scholarship')}
                className={activeView === 'general-scholarship' ? 'bg-blue-50 shadow-md' : ''}
              >
                <ListItemText primary="General Scholarship Items" />
              </ListItemButton>
              <ListItemButton 
                sx={{ pl: 4 }}
                onClick={() => setActiveView('request-scholarship')}
                className={activeView === 'request-scholarship' ? 'bg-blue-50 shadow-md' : ''}
              >
                <ListItemText primary="Request a Specific Scholarship" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => setActiveView('connecting-team')}
              className={activeView === 'connecting-team' ? 'bg-blue-50 shadow-md' : ''}
            >
              <ListItemText primary="Connecting with a team" />
            </ListItemButton>
          </ListItem>
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

      {/* Account Invisible Modal */}
      <Dialog open={invisibleAccountModalOpen} onClose={() => setInvisibleAccountModalOpen(false)}>
        <DialogTitle>Make Account Invisible</DialogTitle>
        <DialogContent>
          <div className="flex flex-col space-y-4 py-4">
            <div className="flex items-center space-x-2">
              <IconButton onClick={() => setInvisibleReason('private')}>
                {invisibleReason === 'private' ? <RadioButtonChecked /> : <RadioButtonUnchecked />}
              </IconButton>
              <Typography>I prefer to keep my account private at all times</Typography>
            </div>
            <div className="flex items-center space-x-2">
              <IconButton onClick={() => setInvisibleReason('temporary')}>
                {invisibleReason === 'temporary' ? <RadioButtonChecked /> : <RadioButtonUnchecked />}
              </IconButton>
              <Typography>I don't want my account to be visible at this time</Typography>
            </div>
            <TextField
              margin="dense"
              label="Why do you want to make your account invisible?"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              value={customInvisibleReason}
              onChange={(e) => setCustomInvisibleReason(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInvisibleAccountModalOpen(false)}>Cancel</Button>
          <Button variant="contained" color="warning">Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Account Modal */}
      <Dialog open={deleteAccountModalOpen} onClose={() => setDeleteAccountModalOpen(false)}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <div className="flex flex-col space-y-4 py-4">
            <FormControl fullWidth variant="outlined">
              <InputLabel>Reason for deletion</InputLabel>
              <Select
                value={deleteReason}
                onChange={(e) => setDeleteReason(e.target.value)}
                label="Reason for deletion"
              >
                <MenuItem value="privacy">Privacy concerns</MenuItem>
                <MenuItem value="no-need">No longer need the service</MenuItem>
                <MenuItem value="bad-experience">Bad user experience</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            {deleteReason === 'other' && (
              <TextField
                margin="dense"
                label="Please explain"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={customDeleteReason}
                onChange={(e) => setCustomDeleteReason(e.target.value)}
              />
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteAccountModalOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error">Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full h-16 bg-white shadow-md flex items-center justify-between px-4"
        style={{ zIndex: 100 }}
      >
        <Button 
          variant="text" 
          color="primary"
          onClick={() => {
            // Simulate logout redirect
            alert('Redirecting to login page...');
          }}
        >
          Logout
        </Button>
        
        <Tooltip title="Open Support Tickets">
          <IconButton 
            onClick={() => setActiveView('ticketing-system')}
            className="text-primary"
          >
            <MailOutline />
          </IconButton>
        </Tooltip>
      </footer>
    </div>
  );
};

export default MasterDetailCompleteDashboard;