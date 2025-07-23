import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress, Typography, Container } from '@mui/material';

interface GoogleCallbackProps {
  onAuthenticated?: (isAuthenticated: boolean) => void;
}

const GoogleCallback: React.FC<GoogleCallbackProps> = ({ onAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      // URL에서 인증 코드 추출
      const params = new URLSearchParams(location.search);
      const code = params.get('code');

      if (!code) {
        console.error('No authorization code received');
        navigate('/');
        return;
      }

      try {
        // 백엔드로 인증 코드 전송
        const response = await fetch('http://localhost:8080/api/auth/google/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
          credentials: 'include',
        });

        if (response.ok) {
          // 인증 성공
          onAuthenticated?.(true);
          navigate('/home');
        } else {
          console.error('Authentication failed');
          navigate('/');
        }
      } catch (error) {
        console.error('Error during authentication:', error);
        navigate('/');
      }
    };

    handleCallback();
  }, [location, navigate, onAuthenticated]);

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          로그인 처리 중...
        </Typography>
      </Box>
    </Container>
  );
};

export default GoogleCallback; 