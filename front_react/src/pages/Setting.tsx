import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Switch,
  FormControlLabel,
  Paper,
  Divider,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';

interface SettingProps {
  nickname: string;
  alarmEnabled: boolean;
  onNicknameChange: (nickname: string) => void;
  onAlarmChange: (enabled: boolean) => void;
}

const Setting: React.FC<SettingProps> = ({ 
  nickname, 
  alarmEnabled, 
  onNicknameChange, 
  onAlarmChange 
}) => {
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onNicknameChange(event.target.value);
  };

  const handleAlarmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onAlarmChange(event.target.checked);
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users/nickname', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          nickname: nickname.trim()
        }),
      });

      if (response.ok) {
        setShowSnackbar(true);
      } else {
        const errorData = await response.text();
        console.error('Failed to save nickname:', response.status, errorData);
        setShowSnackbar(true);
      }
    } catch (error) {
      console.error('Error saving nickname:', error);
      setShowSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2, mb: 7 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h1">
          설정
        </Typography>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          sx={{ minWidth: '100px' }}
        >
          저장
        </Button>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          프로필 설정
        </Typography>
        <Box>
          <TextField
            fullWidth
            label="닉네임"
            value={nickname}
            onChange={handleNicknameChange}
            variant="outlined"
          />
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          알림 설정
        </Typography>
        <Box>
          <FormControlLabel
            control={
              <Switch
                checked={alarmEnabled}
                onChange={handleAlarmChange}
                color="primary"
              />
            }
            label="일일 연습 알림"
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            매일 정해진 시간에 연습 알림을 받습니다.
          </Typography>
        </Box>
      </Paper>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          설정이 저장되었습니다.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Setting; 