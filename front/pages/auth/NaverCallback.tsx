import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  CircularProgress, 
  Typography, 
  Container, 
  Alert, 
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';

interface NaverCallbackProps {
  onAuthenticated?: (isAuthenticated: boolean) => void;
}

interface User {
  id: number;
  email: string;
  nickname: string;
  profileImage: string;
  isNewUser: boolean;
}

interface AuthResponse {
  isNewUser: boolean;
  user: User;
}

interface ErrorResponse {
  message: string;
}

const NaverCallback: React.FC<NaverCallbackProps> = ({ onAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [nickname, setNickname] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 모바일 환경 감지 함수
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  const handleAdditionalInfoSubmit = async () => {
    if (!nickname.trim()) {
      setError('닉네임을 입력해주세요.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/users/nickname', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname: nickname.trim() }),
        credentials: 'include',
      });

      if (response.ok) {
        onAuthenticated?.(true);
        // PC 환경에서만 부모 창에 메시지 전송
        if (window.opener) {
          window.opener.postMessage({
            type: 'NAVER_LOGIN_SUCCESS',
            user: user
          }, window.location.origin);
          // 팝업 창 닫기
          window.close();
        } else {
          // 모바일 환경에서는 바로 홈으로 이동
          navigate('/home');
        }
      } else {
        try {
          const errorData: ErrorResponse = await response.json();
          setError(errorData.message || '닉네임 저장에 실패했습니다.');
        } catch (jsonError) {
          console.error('Error parsing error response:', jsonError);
          setError(`닉네임 저장에 실패했습니다. (${response.status})`);
        }
      }
    } catch (error) {
      console.error('Error saving nickname:', error);
      setError('서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // URL에서 code와 state 파라미터 추출
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        const state = params.get('state');

        if (!code || !state) {
          throw new Error('Missing required parameters');
        }

        // 백엔드로 인증 요청
        const response = await fetch('http://localhost:8080/api/auth/naver/callback', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code, state }),
        });

        if (!response.ok) {
          throw new Error('Authentication failed');
        }

        const data = await response.json();

        if (isMobile()) {
          // 모바일 환경에서는 홈으로 직접 리다이렉트
          navigate('/home', { replace: true });
        } else {
          // PC 환경에서는 부모 창에 메시지 전송
          if (window.opener) {
            window.opener.postMessage(
              { type: 'NAVER_LOGIN_SUCCESS', user: data.user },
              window.location.origin
            );
            window.close();
          } else {
            navigate('/home', { replace: true });
          }
        }
      } catch (error) {
        console.error('Callback error:', error);
        setError('로그인 처리 중 오류가 발생했습니다.');
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 3000);
      }
    };

    handleCallback();
  }, [navigate, location]);

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
        {isLoading && (
          <>
            <CircularProgress />
            <Typography variant="h6" sx={{ mt: 2 }}>
              로그인 처리 중...
            </Typography>
          </>
        )}
      </Box>

      {/* 추가 정보 입력 다이얼로그 */}
      <Dialog 
        open={showAdditionalInfo} 
        onClose={() => {}}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>추가 정보 입력</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            서비스 이용을 위해 닉네임을 입력해주세요.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="닉네임"
            type="text"
            fullWidth
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            variant="outlined"
            error={!!error}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleAdditionalInfoSubmit} 
            variant="contained" 
            color="primary"
            disabled={!nickname.trim()}
          >
            시작하기
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default NaverCallback; 