import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { 
  Mic as MicIcon,
  RecordVoiceOver as RecordVoiceOverIcon,
  Feedback as FeedbackIcon,
  PlayArrow as PlayArrowIcon,
  AccessTime as AccessTimeIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [showNicknameInput, setShowNicknameInput] = useState(false);

  // 샘플 데이터
  const todayStats = {
    practiceCount: 3,
    speechCount: 2,
    totalTime: 45
  };

  const recentActivities = [
    { type: 'practice', name: '입술 굴리기', time: '10분', date: '오늘' },
    { type: 'speech', name: '자유 발화', time: '15분', date: '어제' },
    { type: 'practice', name: '모음 연습', time: '20분', date: '어제' }
  ];

  const coachFeedback = {
    message: "입술 굴리기 연습이 많이 향상되었습니다. 다음에는 모음 연습에 더 집중해보세요.",
    date: "2024년 3월 15일"
  };

  const handleNicknameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) return;

    try {
      const response = await fetch('http://localhost:8080/api/users/nickname', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname: nickname.trim() }),
      });

      if (response.ok) {
        const user = await response.json();
        setNickname(user.nickname);
        setShowNicknameInput(false);
        // 성공 메시지 표시
        alert('닉네임이 저장되었습니다.');
      } else {
        // 에러 메시지 표시
        alert('닉네임 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error saving nickname:', error);
      alert('서버 연결에 실패했습니다.');
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* 닉네임 입력 다이얼로그 */}
      <Dialog open={showNicknameInput} onClose={() => setShowNicknameInput(false)}>
        <DialogTitle>닉네임을 입력해주세요</DialogTitle>
        <form onSubmit={handleNicknameSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              fullWidth
              label="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowNicknameInput(false)}>취소</Button>
            <Button type="submit" variant="contained" color="primary">
              확인
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* 오늘의 현황 */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            오늘의 현황
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
            <Box>
              <Typography variant="h4" color="primary">
                {todayStats.practiceCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                발성 연습
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" color="primary">
                {todayStats.speechCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                발화 연습
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" color="primary">
                {todayStats.totalTime}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                총 연습시간(분)
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* 최근 활동 */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            최근 활동
          </Typography>
          <List>
            {recentActivities.map((activity, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemIcon>
                    {activity.type === 'practice' ? <MicIcon /> : <RecordVoiceOverIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.name}
                    secondary={`${activity.time} • ${activity.date}`}
                  />
                  <PlayArrowIcon color="primary" />
                </ListItem>
                {index < recentActivities.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* 코치 피드백 */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <FeedbackIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">
              코치 피드백
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            {coachFeedback.message}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {coachFeedback.date}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Home; 