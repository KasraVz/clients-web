import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Chip,
  LinearProgress,
  Badge,
  IconButton,
  Divider,
  Paper
} from '@mui/material';
import {
  Search as SearchIcon,
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  BookOnline,
  ConfirmationNumber,
  ExpandLess,
  ExpandMore,
  Share,
  Notifications,
  History,
  MoreHoriz,
  Info
} from '@mui/icons-material';

const MasterDetailCompleteDashboard: React.FC = () => {
  const [dashboardExpanded, setDashboardExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data
  const userData = {
    name: 'Pashmak Pashmakian',
    email: 'Pashmak@Yahoo.com',
    avatar: '/api/placeholder/80/80',
    isVerified: false
  };

  const certifications = [
    {
      id: 1,
      name: 'Certification 1',
      date: 'Aug 5, 2025',
      number: '645573534',
      score: 80
    },
    {
      id: 2,
      name: 'Certification 2',
      date: 'Aug 7, 2025',
      number: '645573534',
      score: 70
    },
    {
      id: 3,
      name: 'Certification 3',
      date: 'Aug 3, 2025',
      number: '645573534',
      score: 60
    }
  ];

  const testScores = [
    { name: 'Test 1', score: '9/10' },
    { name: 'Test 2', score: '8/10' },
    { name: 'Test 3', score: '7/10' }
  ];

  const notifications = [
    'Please Upload your passport picture to verified',
    'Please Upload your passport picture to verified',
    'Please Upload your passport picture to verified'
  ];

  const bookedTests = [
    { name: 'Test1', date: 'Aug 20, 2025' },
    { name: 'Test1', date: 'Aug 20, 2025' }
  ];

  const testHistory = [
    { name: 'Test1', date: 'Aug 20, 2025', score: '8/10' },
    { name: 'Test1', date: 'Aug 20, 2025', score: '8/10' }
  ];

  const CircularProgressWithLabel = ({ value }: { value: number }) => (
    <Box position="relative" display="inline-flex" alignItems="center" justifyContent="center">
      <svg width={120} height={120} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={60}
          cy={60}
          r={45}
          stroke="#e0e0e0"
          strokeWidth={8}
          fill="transparent"
        />
        <circle
          cx={60}
          cy={60}
          r={45}
          stroke="#4caf50"
          strokeWidth={8}
          fill="transparent"
          strokeDasharray={`${2 * Math.PI * 45}`}
          strokeDashoffset={`${2 * Math.PI * 45 * (1 - value / 10)}`}
          strokeLinecap="round"
        />
      </svg>
      <Box
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4" component="div" color="text.secondary" fontWeight="bold">
          {value}/10
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Left Sidebar */}
      <Box
        sx={{
          width: 240,
          backgroundColor: 'white',
          borderRight: '1px solid #e0e0e0',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Logo */}
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h6" fontWeight="bold" color="primary">
            Supsindex
          </Typography>
        </Box>

        {/* Search */}
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="search anything"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#999' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#f8f9fa',
                '& fieldset': {
                  borderColor: '#e0e0e0',
                },
              }
            }}
          />
        </Box>

        {/* Navigation */}
        <List sx={{ flex: 1, px: 1 }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setDashboardExpanded(!dashboardExpanded)}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
              {dashboardExpanded ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>

          <Collapse in={dashboardExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <BookOnline fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="booked" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ConfirmationNumber fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Ticket" />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex' }}>
        {/* Center Content */}
        <Box sx={{ flex: 1, p: 3 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" fontWeight="500" color="#666">
              partner dashboard
            </Typography>
            <Typography variant="body2" color="#666">
              Monday, August 18
            </Typography>
          </Box>

          {/* Identity Information */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="600" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <Box component="span" sx={{ mr: 1 }}>📋</Box>
                Identity information
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  src={userData.avatar}
                  sx={{ width: 60, height: 60, mr: 2 }}
                />
                <Box>
                  <Typography variant="h6" fontWeight="600">
                    {userData.name}
                  </Typography>
                  <Typography variant="body2" color="#666" sx={{ mb: 1 }}>
                    {userData.email}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: '#ff9800',
                        mr: 1
                      }}
                    />
                    <Typography variant="body2" color="#666">
                      Unverified
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="600" sx={{ mb: 3 }}>
                Certifications
              </Typography>
              
              {certifications.map((cert) => (
                <Box key={cert.id} sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  py: 2,
                  borderBottom: '1px solid #f0f0f0'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box component="span" sx={{ mr: 2 }}>📜</Box>
                    <Box>
                      <Typography variant="body1" fontWeight="500" color="primary">
                        {cert.name}
                      </Typography>
                      <Typography variant="body2" color="#666">
                        {cert.date}
                      </Typography>
                      <Typography variant="body2" color="#999">
                        No: {cert.number}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" fontWeight="600" sx={{ mr: 2 }}>
                      {cert.score}/100
                    </Typography>
                    <IconButton size="small">
                      <Share fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              ))}
              
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                  See all 12 Certifications ▼
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Score Band */}
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="600" sx={{ mb: 3 }}>
                Score band
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1 }}>
                  {testScores.map((test, index) => (
                    <Box key={index} sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      mb: 1
                    }}>
                      <Typography variant="body2" color="#666">
                        {test.name}:
                      </Typography>
                      <Typography variant="body2" fontWeight="500">
                        {test.score}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                
                <Box sx={{ ml: 4 }}>
                  <CircularProgressWithLabel value={8} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Right Sidebar */}
        <Box
          sx={{
            width: 300,
            backgroundColor: 'white',
            borderLeft: '1px solid #e0e0e0',
            p: 2
          }}
        >
          {/* Notifications */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Notifications sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight="600">
                  Notifications
                </Typography>
              </Box>
              
              {notifications.map((notification, index) => (
                <Box key={index} sx={{ 
                  display: 'flex', 
                  alignItems: 'flex-start',
                  mb: 2
                }}>
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: '#2196f3',
                      mr: 1,
                      mt: 1,
                      flexShrink: 0
                    }}
                  />
                  <Typography variant="body2" color="#666">
                    {notification}
                  </Typography>
                </Box>
              ))}
              
              <Typography variant="body2" color="primary" sx={{ textAlign: 'right', cursor: 'pointer' }}>
                More ▼
              </Typography>
            </CardContent>
          </Card>

          {/* Booked Tests */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BookOnline sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight="600">
                  Booked tests
                </Typography>
              </Box>
              
              {bookedTests.map((test, index) => (
                <Box key={index} sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2
                }}>
                  <Box>
                    <Typography variant="body1" fontWeight="500">
                      {test.name}
                    </Typography>
                    <Typography variant="body2" color="#666">
                      {test.date}
                    </Typography>
                  </Box>
                  <IconButton size="small">
                    <Info fontSize="small" />
                  </IconButton>
                </Box>
              ))}
              
              <Typography variant="body2" color="primary" sx={{ textAlign: 'right', cursor: 'pointer' }}>
                More ▼
              </Typography>
            </CardContent>
          </Card>

          {/* Test History */}
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <History sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight="600">
                  Test history
                </Typography>
              </Box>
              
              {testHistory.map((test, index) => (
                <Box key={index} sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2
                }}>
                  <Box>
                    <Typography variant="body1" fontWeight="500">
                      {test.name}
                    </Typography>
                    <Typography variant="body2" color="#666">
                      {test.date}
                    </Typography>
                  </Box>
                  <Typography variant="body1" fontWeight="600">
                    {test.score}
                  </Typography>
                </Box>
              ))}
              
              <Typography variant="body2" color="primary" sx={{ textAlign: 'right', cursor: 'pointer' }}>
                More ▼
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default MasterDetailCompleteDashboard;