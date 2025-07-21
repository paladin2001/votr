import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container,
  Paper,
  Alert,
  Snackbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Mic as MicIcon } from '@mui/icons-material';

interface InitProps {
  onAuthenticated?: (isAuthenticated: boolean) => void;
}

const Init: React.FC<InitProps> = ({ onAuthenticated }) => {
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 모바일 환경 감지 함수
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 환경 변수 확인
    const clientId = process.env.REACT_APP_NAVER_CLIENT_ID;
    const apiUrl = process.env.REACT_APP_API_URL;
    
    // 환경 변수가 없으면 에러 메시지 표시
    if (!clientId) {
      setError('네이버 클라이언트 ID가 설정되지 않았습니다. .env 파일을 확인해주세요.');
    }

    // PC 환경에서만 메시지 이벤트 리스너 등록
    if (!isMobile()) {
      const handleMessage = (event: MessageEvent) => {
        // 메시지 출처 확인
        if (event.origin !== window.location.origin) return;
        
        // 로그인 성공 메시지 처리
        if (event.data.type === 'NAVER_LOGIN_SUCCESS') {
          // 팝업 창 닫기
          if (event.source && 'close' in event.source) {
            (event.source as Window).close();
          }
          
          // 사용자 정보 처리
          if (event.data.user) {
            setIsAuthenticated(true);
            if (onAuthenticated) {
              onAuthenticated(true);
            }
            // 필요한 경우 추가 페이지로 이동
            navigate('/home');
          }
        }
      };

      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    }

    // 로그인 상태 확인
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/auth/check', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };

    checkAuthStatus();
  }, [navigate, onAuthenticated]);

  const handleNaverLogin = () => {
    try {
      // Naver OAuth 클라이언트 ID
      const clientId = process.env.REACT_APP_NAVER_CLIENT_ID;
      
      if (!clientId) {
        setError('네이버 클라이언트 ID가 설정되지 않았습니다. .env 파일을 확인해주세요.');
        return;
      }

      // 리다이렉트 URI
      const redirectUri = `${window.location.origin}/auth/naver/callback`;
      
      // 상태값 (CSRF 방지용)
      const state = Math.random().toString(36).substring(2);
      
      // Naver OAuth URL 구성
      const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&state=${state}`;
      
      if (isMobile()) {
        // 모바일 환경에서는 전체 페이지 리다이렉트
        window.location.replace(naverAuthUrl);
      } else {
        // PC 환경에서는 팝업 창으로 열기
        const width = 500;
        const height = 600;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
        
        window.open(
          naverAuthUrl,
          'naverLogin',
          `width=${width},height=${height},left=${left},top=${top}`
        );
      }
    } catch (error) {
      console.error('Naver login error:', error);
      setError('네이버 로그인 처리 중 오류가 발생했습니다.');
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  // 이미 로그인된 경우 홈으로 리다이렉트
  if (isAuthenticated) {
    return null;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <MicIcon
            sx={{
              fontSize: 80,
              color: 'primary.main',
              marginBottom: 2,
            }}
          />
          <Typography component="h1" variant="h4" gutterBottom>
            Vocal Training
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
            Improve Your Voice by AI Coach
          </Typography>
          <Button
            fullWidth
            variant="contained"
            onClick={handleNaverLogin}
            sx={{ 
              mt: 2,
              backgroundColor: '#03C75A',
              '&:hover': {
                backgroundColor: '#02b351'
              }
            }}
          >
            네이버로 시작하기
          </Button>
        </Paper>
      </Box>
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Init; 