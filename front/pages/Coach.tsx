import React from 'react';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';

// 샘플 데이터
const coachData = [
  {
    date: '2024년 03월 15일',
    feedbacks: [
      {
        time: '09:30',
        content: '발음이 매우 정확합니다. 특히 모음 발음이 깔끔해졌네요.',
        type: 'positive'
      },
      {
        time: '14:20',
        content: '억양이 조금 부자연스러운 부분이 있습니다. 문장 끝부분의 높낮이를 조절해보세요.',
        type: 'improvement'
      },
      {
        time: '18:45',
        content: '전체적으로 좋은 연습이었습니다. 내일도 이어서 연습해보세요!',
        type: 'positive'
      }
    ]
  },
  {
    date: '2024년 03월 14일',
    feedbacks: [
      {
        time: '10:15',
        content: '발성 연습이 효과적이었습니다. 목소리가 더 선명해졌어요.',
        type: 'positive'
      },
      {
        time: '15:30',
        content: '자음 발음에서 약간의 개선이 필요합니다. 특히 \'ㄹ\' 발음에 집중해보세요.',
        type: 'improvement'
      },
      {
        time: '19:20',
        content: '오늘도 열심히 연습하셨네요. 내일은 새로운 연습을 시작해볼까요?',
        type: 'positive'
      }
    ]
  }
];

const Coach: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 2, mb: 7 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        AI 코치 피드백
      </Typography>
      
      {coachData.map((dayData, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2,
              color: 'primary.main',
              fontWeight: 'bold'
            }}
          >
            {dayData.date}
          </Typography>
          
          {dayData.feedbacks.map((feedback, feedbackIndex) => (
            <Box 
              key={feedbackIndex}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                mb: 2,
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 20,
                  top: 0,
                  bottom: 0,
                  width: 2,
                  backgroundColor: 'primary.light',
                  opacity: 0.3
                }
              }}
            >
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'text.secondary',
                  ml: 3,
                  mb: 0.5
                }}
              >
                {feedback.time}
              </Typography>
              
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  ml: 3,
                  mr: 1,
                  backgroundColor: feedback.type === 'positive' ? '#e3f2fd' : '#fff3e0',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: -8,
                    top: 12,
                    width: 16,
                    height: 16,
                    backgroundColor: feedback.type === 'positive' ? '#e3f2fd' : '#fff3e0',
                    transform: 'rotate(45deg)',
                    zIndex: 0
                  }
                }}
              >
                <Typography variant="body1">
                  {feedback.content}
                </Typography>
              </Paper>
            </Box>
          ))}
          
          {index < coachData.length - 1 && (
            <Divider sx={{ my: 3 }} />
          )}
        </Box>
      ))}
    </Container>
  );
};

export default Coach; 