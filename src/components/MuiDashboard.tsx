import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Avatar,
  Typography,
  Badge,
  IconButton,
  Container,
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
  
  Chip,
  Tooltip,
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
} from '@mui/icons-material';

const drawerWidth = 256;

type DetailView = 'fast-trak' | 'special-offer' | 'reports' | 'certifications' | null;

interface UserData {
  name: string;
  email: string;
  profilePhoto: string | null;
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

const userData: UserData = {
  name: "John Smith",
  email: "john.smith@example.com",
  profilePhoto: null,
};

const reports: Report[] = [
  { id: 'R001', testDate: '2024-01-15', publishDate: '2024-01-20', testName: 'Financial Planning Assessment', status: 'Valid', isPurchased: true },
  { id: 'R002', testDate: '2024-02-10', publishDate: '2024-02-15', testName: 'Investment Strategy Analysis', status: 'Expired', isPurchased: false },
  { id: 'R003', testDate: '2024-03-05', publishDate: '2024-03-10', testName: 'Risk Management Evaluation', status: 'Valid', isPurchased: true },
];

const certifications: Certification[] = [
  { id: 'C001', testDate: '2024-01-15', testName: 'Certified Financial Planner', status: 'Valid', isPurchased: true },
  { id: 'C002', testDate: '2024-02-10', testName: 'Investment Advisor Certification', status: 'Expired', isPurchased: false },
  { id: 'C003', testDate: '2024-03-05', testName: 'Risk Assessment Specialist', status: 'Valid', isPurchased: true },
];

export const MuiDashboard = () => {
  const [activeView, setActiveView] = useState<DetailView>(null);
  const [supsindexOpen, setSupsindexOpen] = useState(false);
  const [certsOpen, setCertsOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(2);

  const handleNotificationClick = () => {
    setNotificationCount(0);
  };

  const renderFastTrakView = () => (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card elevation={2}>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Fast Trak Tour
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Accelerate your certification journey with our Fast Trak program. 
            Get access to premium study materials, personalized coaching, and 
            priority scheduling for your examinations.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );

  const renderSpecialOfferView = () => (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
        <Box sx={{ minWidth: 280, maxWidth: 320, flex: '1 1 300px' }}>
          <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Premium Package
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Get access to all certification materials, unlimited practice tests, and priority support.
              </Typography>
              <Button variant="contained" color="primary" fullWidth>
                Learn More
              </Button>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ minWidth: 280, maxWidth: 320, flex: '1 1 300px' }}>
          <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Group Discount
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Save 30% when you register 5 or more team members for certification programs.
              </Typography>
              <Button variant="contained" color="secondary" fullWidth>
                Get Started
              </Button>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ minWidth: 280, maxWidth: 320, flex: '1 1 300px' }}>
          <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Early Bird Special
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Register for next quarter's exams and save 20% on all certification fees.
              </Typography>
              <Button variant="outlined" color="primary" fullWidth>
                Register Now
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );

  const renderReportsView = () => (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Reports
          </Typography>
          <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Report ID</TableCell>
                  <TableCell>Test Date</TableCell>
                  <TableCell>Publish Date</TableCell>
                  <TableCell>Test Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id} hover>
                    <TableCell>{report.id}</TableCell>
                    <TableCell>{report.testDate}</TableCell>
                    <TableCell>{report.publishDate}</TableCell>
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
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <Tooltip title="Preview">
                          <IconButton
                            size="small"
                            disabled={!report.isPurchased}
                            color="primary"
                          >
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={report.isPurchased ? "Download" : "Purchase required"}>
                          <IconButton
                            size="small"
                            disabled={!report.isPurchased}
                            color="primary"
                          >
                            <Download />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={report.isPurchased ? "Send to" : "Purchase required"}>
                          <IconButton
                            size="small"
                            disabled={!report.isPurchased}
                            color="primary"
                            onClick={() => setShareModalOpen(true)}
                          >
                            <Share />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  );

  const renderCertificationsView = () => (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Certifications
          </Typography>
          <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Cert ID</TableCell>
                  <TableCell>Test Date</TableCell>
                  <TableCell>Test Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {certifications.map((cert) => (
                  <TableRow key={cert.id} hover>
                    <TableCell>{cert.id}</TableCell>
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
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <Tooltip title="Preview">
                          <IconButton
                            size="small"
                            disabled={!cert.isPurchased}
                            color="primary"
                          >
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={cert.isPurchased ? "Download" : "Purchase required"}>
                          <IconButton
                            size="small"
                            disabled={!cert.isPurchased}
                            color="primary"
                          >
                            <Download />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={cert.isPurchased ? "Share to" : "Purchase required"}>
                          <IconButton
                            size="small"
                            disabled={!cert.isPurchased}
                            color="primary"
                            onClick={() => setShareModalOpen(true)}
                          >
                            <Share />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  );

  const renderMainContent = () => {
    if (!activeView) {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            textAlign: 'center',
          }}
        >
          <Container maxWidth="sm">
            <img 
              src="/lovable-uploads/8a0dff28-ea84-44a3-a3c2-fe796bcb4004.png" 
              alt="Supsindex Logo" 
              style={{ width: '100%', maxWidth: 300, opacity: 0.7, marginBottom: 24 }}
            />
            <Typography variant="h6" color="text.secondary">
              Click an item in the sidebar to get started
            </Typography>
          </Container>
        </Box>
      );
    }

    switch (activeView) {
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
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Header */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: 1,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 40, height: 40 }}>
              {userData.name.split(' ').map(n => n[0]).join('')}
            </Avatar>
            <Typography variant="h6" component="div">
              {userData.name}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit" onClick={() => setActiveView(null)}>
              <Home />
            </IconButton>
            <IconButton color="inherit" onClick={handleNotificationClick}>
              <Badge badgeContent={notificationCount} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            overflow: 'hidden',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', p: 1 }}>
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
                  sx={{ pl: 4 }}
                  selected={activeView === 'fast-trak'}
                  onClick={() => setActiveView('fast-trak')}
                >
                  <ListItemText primary="Fast Trak" />
                </ListItemButton>
                <ListItemButton 
                  sx={{ pl: 4 }}
                  selected={activeView === 'special-offer'}
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
                  sx={{ pl: 4 }}
                  selected={activeView === 'reports'}
                  onClick={() => setActiveView('reports')}
                >
                  <ListItemText primary="Reports" />
                </ListItemButton>
                <ListItemButton 
                  sx={{ pl: 4 }}
                  selected={activeView === 'certifications'}
                  onClick={() => setActiveView('certifications')}
                >
                  <ListItemText primary="Certifications" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Toolbar />
        <Box sx={{ flexGrow: 1, overflow: 'auto', overflowX: 'hidden' }}>
          {renderMainContent()}
        </Box>
      </Box>

      {/* Share Modal */}
      <Dialog open={shareModalOpen} onClose={() => setShareModalOpen(false)}>
        <DialogTitle>Share Options</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 250 }}>
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
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShareModalOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};