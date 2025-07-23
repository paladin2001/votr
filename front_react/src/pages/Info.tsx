import React from 'react';
import { Container, Grid, Card, CardContent, Typography, CardActionArea, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Help as GuideIcon,
  Info as ServiceIcon,
  Description as TermsIcon
} from '@mui/icons-material';

const infoMenus = [
  {
    title: '사용법',
    path: 'guide',
    description: 'Votr 서비스의 기본적인 사용 방법을 알아봅니다.',
    icon: <GuideIcon sx={{ fontSize: 32 }} />
  },
  {
    title: '서비스 설명',
    path: 'service',
    description: 'Votr 서비스의 주요 기능과 특징을 소개합니다.',
    icon: <ServiceIcon sx={{ fontSize: 32 }} />
  },
  {
    title: '서비스 이용약관',
    path: 'terms',
    description: 'Votr 서비스 이용에 관한 약관을 확인합니다.',
    icon: <TermsIcon sx={{ fontSize: 32 }} />
  }
];

const Info: React.FC = () => {
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
        정보
      </Typography>
      <Grid container spacing={1.5}>
        {infoMenus.map((menu) => (
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
                onClick={() => navigate(`/info/${menu.path}`)}
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

export default Info; 