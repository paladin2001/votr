import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const Terms: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 2, mb: 7 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        서비스 이용약관
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          제1조 (목적)
        </Typography>
        <Typography paragraph>
          이 약관은 Votr(이하 "회사")가 제공하는 음성 훈련 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          제2조 (서비스의 내용)
        </Typography>
        <Typography paragraph>
          회사가 제공하는 서비스는 다음과 같습니다:
        </Typography>
        <Box component="ul" sx={{ pl: 3 }}>
          <Typography component="li" paragraph>
            발성 연습 서비스 (입술털기, 허밍, 모음, 복성 등)
          </Typography>
          <Typography component="li" paragraph>
            발화 연습 서비스 (대본읽기, 따라하기, 자유발화)
          </Typography>
          <Typography component="li" paragraph>
            AI 기반 음성 분석 및 피드백 서비스
          </Typography>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          제3조 (서비스 이용)
        </Typography>
        <Typography paragraph>
          서비스 이용은 회사의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간을 원칙으로 합니다.
        </Typography>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          제4조 (개인정보보호)
        </Typography>
        <Typography paragraph>
          회사는 관련법령이 정하는 바에 따라 이용자의 개인정보를 보호하기 위해 노력합니다. 개인정보의 보호 및 사용에 대해서는 관련법 및 회사의 개인정보처리방침이 적용됩니다.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Terms; 