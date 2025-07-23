import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Free: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        자유발화
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Typography variant="body1" paragraph>
          자유롭게 말하며 발음과 억양을 연습합니다.
        </Typography>
        {/* 여기에 실제 자유발화 컨텐츠를 추가할 수 있습니다 */}
      </Box>
    </Container>
  );
};

export default Free; 