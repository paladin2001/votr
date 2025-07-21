import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import {
  Home as HomeIcon,
  School as PracticeIcon,
  RecordVoiceOver as SpeechIcon,
  Person as CoachIcon,
  BarChart as StatusIcon,
  Settings as SettingIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(`/${newValue}`);
  };

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0,
        backgroundColor: '#90caf9',
        borderTop: '1px solid #64b5f6'
      }} 
      elevation={3}
    >
      <BottomNavigation
        value={location.pathname.slice(1) || 'home'}
        onChange={handleChange}
        sx={{
          backgroundColor: '#90caf9',
          '& .MuiBottomNavigationAction-root': {
            color: '#1976d2',
            minWidth: 'auto',
            padding: '6px 0',
            '&.Mui-selected': {
              color: '#0d47a1'
            },
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.75rem',
              opacity: 1
            }
          },
          '& .MuiSvgIcon-root': {
            fontSize: '1.5rem'
          }
        }}
        showLabels
      >
        <BottomNavigationAction
          label="홈"
          value="home"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="연습"
          value="practice"
          icon={<PracticeIcon />}
        />
        <BottomNavigationAction
          label="발화"
          value="speech"
          icon={<SpeechIcon />}
        />
        <BottomNavigationAction
          label="코치"
          value="coach"
          icon={<CoachIcon />}
        />
        <BottomNavigationAction
          label="현황"
          value="status"
          icon={<StatusIcon />}
        />
        <BottomNavigationAction
          label="설정"
          value="setting"
          icon={<SettingIcon />}
        />
        <BottomNavigationAction
          label="정보"
          value="info"
          icon={<InfoIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav; 