import React from 'react';
import { Container, Grid, Card, CardContent, Typography, CardActionArea, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  MenuBook as ScriptIcon,
  Repeat as FollowIcon,
  Mic as FreeSpeechIcon
} from '@mui/icons-material';

const speechMenus = [
  {
    title: '대본읽기',
    path: 'script',
    description: '제공된 대본을 따라 읽는 연습',
    icon: <ScriptIcon sx={{ fontSize: 32 }} />
  },
  {
    title: '따라하기',
    path: 'follow',
    description: '음성을 듣고 따라하는 연습',
    icon: <FollowIcon sx={{ fontSize: 32 }} />
  },
  {
    title: '자유발화',
    path: 'free',
    description: '자유롭게 말하는 연습',
    icon: <FreeSpeechIcon sx={{ fontSize: 32 }} />
  }
];

const Speech: React.FC = () => {
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
        발화 연습
      </Typography>
      <Grid container spacing={1.5}>
        {speechMenus.map((menu) => (
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
                onClick={() => navigate(`/speech/${menu.path}`)}
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

export default Speech; 