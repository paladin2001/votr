import React from 'react';
import { Container, Grid, Card, CardContent, Typography, CardActionArea, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  RecordVoiceOver as LipRollingIcon,
  MusicNote as HummingIcon,
} from '@mui/icons-material';
import VowelsIcon from '../components/icons/VowelsIcon';
import DoubleVoiceIcon from '../components/icons/DoubleVoiceIcon';

const practiceMenus = [
  {
    title: '입술털기',
    path: 'lip-rolling',
    description: '입술을 떨면서 소리를 내는 연습',
    icon: <LipRollingIcon sx={{ fontSize: 32 }} />
  },
  {
    title: '허밍',
    path: 'humming',
    description: '코로 소리를 내는 연습',
    icon: <HummingIcon sx={{ fontSize: 32 }} />
  },
  {
    title: '모음',
    path: 'vowels',
    description: '모음 발음 연습',
    icon: <VowelsIcon sx={{ fontSize: 32 }} />
  },
  {
    title: '복성',
    path: 'double-voice',
    description: '두 가지 소리를 동시에 내는 연습',
    icon: <DoubleVoiceIcon sx={{ fontSize: 32 }} />
  }
];

const Practice: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        mt: 2,
        mb: 7,
        height: 'calc(100vh - 120px)',
        overflow: 'hidden'
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 2 }}>
        발성 연습
      </Typography>
      <Grid container spacing={1.5}>
        {practiceMenus.map((menu) => (
          <Grid 
            key={menu.path}
            sx={{ 
              width: { xs: '100%', sm: '50%' },
              p: 0.5
            }}
          >
            <Card 
              sx={{ 
                height: '100%',
                backgroundColor: '#e3f2fd',
                '&:hover': {
                  backgroundColor: '#bbdefb'
                }
              }}
            >
              <CardActionArea 
                onClick={() => navigate(`/practice/${menu.path}`)}
                sx={{ height: '100%' }}
              >
                <CardContent sx={{ py: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    {menu.icon}
                    <Typography variant="h6" component="h2">
                      {menu.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {menu.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Practice; 