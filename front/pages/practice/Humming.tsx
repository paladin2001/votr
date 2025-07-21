import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Humming: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        허밍 연습
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Typography variant="body1" paragraph>
          허밍은 코를 통한 발성 연습으로, 공명을 이해하는데 도움이 됩니다.
        </Typography>
        {/* 여기에 실제 연습 컨텐츠를 추가할 수 있습니다 */}
      </Box>
    </Container>
  );
};

export default Humming; 