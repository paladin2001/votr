import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const LipRolling: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        입술털기 연습
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Typography variant="body1" paragraph>
          입술털기는 발성의 기초가 되는 중요한 연습입니다.
        </Typography>
        {/* 여기에 실제 연습 컨텐츠를 추가할 수 있습니다 */}
      </Box>
    </Container>
  );
};

export default LipRolling; 