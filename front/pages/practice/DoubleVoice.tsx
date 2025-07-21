import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const DoubleVoice: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        복성 연습
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Typography variant="body1" paragraph>
          복성은 두 가지 소리를 동시에 내는 고급 발성 기법입니다.
        </Typography>
        {/* 여기에 실제 연습 컨텐츠를 추가할 수 있습니다 */}
      </Box>
    </Container>
  );
};

export default DoubleVoice; 