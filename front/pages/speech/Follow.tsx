import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Follow: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        따라하기
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Typography variant="body1" paragraph>
          음성을 듣고 따라하며 발음과 억양을 연습합니다.
        </Typography>
        {/* 여기에 실제 따라하기 컨텐츠를 추가할 수 있습니다 */}
      </Box>
    </Container>
  );
};

export default Follow; 