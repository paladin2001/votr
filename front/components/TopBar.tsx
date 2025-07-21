import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Badge } from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';

interface TopBarProps {
  nickname: string;
  alarmEnabled: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ nickname, alarmEnabled }) => {
  return (
    <AppBar 
      position="fixed" 
      color="default" 
      elevation={1}
      sx={{ 
        backgroundColor: '#1976d2',
        borderBottom: '1px solid #1565c0',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar 
        sx={{ 
          justifyContent: 'space-between',
          minHeight: '56px !important',
          px: 2
        }}
      >
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            color: '#ffffff',
            fontWeight: 600
          }}
        >
          {nickname}
        </Typography>
        <Box>
          <IconButton 
            sx={{ color: '#ffffff' }}
            size="small"
          >
            <Badge 
              color="error" 
              variant="dot" 
              invisible={alarmEnabled}
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar; 