import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Init from './pages/Init';
import NaverCallback from './pages/auth/NaverCallback';
import Home from './pages/Home';
import Practice from './pages/Practice';
import LipRolling from './pages/practice/LipRolling';
import Humming from './pages/practice/Humming';
import Vowels from './pages/practice/Vowels';
import DoubleVoice from './pages/practice/DoubleVoice';
import Speech from './pages/Speech';
import Script from './pages/speech/Script';
import Follow from './pages/speech/Follow';
import Free from './pages/speech/Free';
import Coach from './pages/Coach';
import Status from './pages/Status';
import Setting from './pages/Setting';
import Info from './pages/Info';
import Guide from './pages/info/Guide';
import Service from './pages/info/Service';
import Terms from './pages/info/Terms';
import BottomNav from './components/BottomNav';
import TopBar from './components/TopBar';

// Create theme instance
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [nickname, setNickname] = useState('사용자');
  const [alarmEnabled, setAlarmEnabled] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthentication = (authenticated: boolean) => {
    setIsAuthenticated(authenticated);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {isAuthenticated && <TopBar nickname={nickname} alarmEnabled={alarmEnabled} />}
        <Box sx={{ 
          pb: isAuthenticated ? 7 : 0,
          pt: isAuthenticated ? '56px' : 0
        }}>
          <Routes>
            <Route path="/" element={<Init onAuthenticated={handleAuthentication} />} />
            <Route path="/auth/naver/callback" element={<NaverCallback onAuthenticated={handleAuthentication} />} />
            <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
            <Route path="/practice" element={isAuthenticated ? <Practice /> : <Navigate to="/" />} />
            <Route path="/practice/lip-rolling" element={isAuthenticated ? <LipRolling /> : <Navigate to="/" />} />
            <Route path="/practice/humming" element={isAuthenticated ? <Humming /> : <Navigate to="/" />} />
            <Route path="/practice/vowels" element={isAuthenticated ? <Vowels /> : <Navigate to="/" />} />
            <Route path="/practice/double-voice" element={isAuthenticated ? <DoubleVoice /> : <Navigate to="/" />} />
            <Route path="/speech" element={isAuthenticated ? <Speech /> : <Navigate to="/" />} />
            <Route path="/speech/script" element={isAuthenticated ? <Script /> : <Navigate to="/" />} />
            <Route path="/speech/follow" element={isAuthenticated ? <Follow /> : <Navigate to="/" />} />
            <Route path="/speech/free" element={isAuthenticated ? <Free /> : <Navigate to="/" />} />
            <Route path="/coach" element={isAuthenticated ? <Coach /> : <Navigate to="/" />} />
            <Route path="/status" element={isAuthenticated ? <Status /> : <Navigate to="/" />} />
            <Route path="/setting" element={isAuthenticated ? 
              <Setting 
                nickname={nickname}
                alarmEnabled={alarmEnabled}
                onNicknameChange={setNickname}
                onAlarmChange={setAlarmEnabled}
              /> : <Navigate to="/" />
            } />
            <Route path="/info" element={isAuthenticated ? <Info /> : <Navigate to="/" />} />
            <Route path="/info/guide" element={isAuthenticated ? <Guide /> : <Navigate to="/" />} />
            <Route path="/info/service" element={isAuthenticated ? <Service /> : <Navigate to="/" />} />
            <Route path="/info/terms" element={isAuthenticated ? <Terms /> : <Navigate to="/" />} />
          </Routes>
        </Box>
        {isAuthenticated && <BottomNav />}
      </Router>
    </ThemeProvider>
  );
}

export default App;
