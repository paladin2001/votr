import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import {
  School as PracticeIcon,
  RecordVoiceOver as SpeechIcon,
  Psychology as CoachIcon
} from '@mui/icons-material';

const Service: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 2, mb: 7 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        서비스 설명
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Votr 소개
        </Typography>
        <Typography paragraph>
          Votr는 AI 기반의 음성 훈련 서비스입니다. 발성과 발화 연습을 통해 더 나은 목소리와 발음을 가질 수 있도록 도와드립니다.
        </Typography>
      </Paper>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <Paper sx={{ p: 3, flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <PracticeIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">발성 연습</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            기본적인 발성 연습을 통해 목소리의 기초를 다집니다. 입술털기, 허밍, 모음, 복성 등 다양한 연습을 제공합니다.
          </Typography>
        </Paper>

        <Paper sx={{ p: 3, flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SpeechIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">발화 연습</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            실제 말하기 연습을 통해 발음과 억양을 개선합니다. 대본읽기, 따라하기, 자유발화 등 다양한 방식으로 연습할 수 있습니다.
          </Typography>
        </Paper>

        <Paper sx={{ p: 3, flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CoachIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">AI 코치</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            AI 코치가 연습 내용을 분석하고 개선점을 제시합니다. 발음, 억양, 속도 등 다양한 측면에서 피드백을 제공합니다.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Service; 