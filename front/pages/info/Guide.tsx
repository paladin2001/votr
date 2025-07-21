import React from 'react';
import { Container, Typography, Box, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { CheckCircle as CheckIcon } from '@mui/icons-material';

const Guide: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 2, mb: 7 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        사용법
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          기본 사용법
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="발성 연습" 
              secondary="입술털기, 허밍, 모음, 복성 등 기본적인 발성 연습을 통해 목소리를 단련합니다."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="발화 연습" 
              secondary="대본읽기, 따라하기, 자유발화를 통해 실제 말하기 연습을 합니다."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="AI 코치 피드백" 
              secondary="연습 후 AI 코치의 피드백을 받아 발음과 억양을 개선합니다."
            />
          </ListItem>
        </List>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          연습 팁
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="꾸준한 연습" 
              secondary="하루 10분씩이라도 매일 연습하는 것이 중요합니다."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="적절한 환경" 
              secondary="조용한 환경에서 마이크를 적절한 거리에 두고 연습하세요."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="피드백 활용" 
              secondary="AI 코치의 피드백을 꼼꼼히 확인하고 다음 연습에 반영하세요."
            />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default Guide; 