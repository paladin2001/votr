import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Script: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        대본읽기
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Typography variant="body1" paragraph>
          제공된 대본을 따라 읽으며 발음과 억양을 연습합니다.
        </Typography>
        {/* 여기에 실제 대본읽기 컨텐츠를 추가할 수 있습니다 */}
      </Box>
    </Container>
  );
};

export default Script; 