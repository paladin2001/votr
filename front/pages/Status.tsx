import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Mic as MicIcon,
  RecordVoiceOver as RecordVoiceOverIcon,
  AccessTime as AccessTimeIcon
} from '@mui/icons-material';
import { format, addMonths, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import ko from 'date-fns/locale/ko';

interface DailyStats {
  date: Date;
  practiceTime: number;
  speechTime: number;
}

const Status = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));

  // 샘플 데이터 생성
  const generateSampleData = (startDate: Date, endDate: Date): DailyStats[] => {
    const days: Date[] = [];
    let currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days.map((date: Date) => ({
      date,
      practiceTime: Math.floor(Math.random() * 60), // 0-59분
      speechTime: Math.floor(Math.random() * 30)    // 0-29분
    }));
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const dailyStats = generateSampleData(monthStart, monthEnd);

  // 월별 총계 계산
  const monthlyTotal = dailyStats.reduce((acc, day) => ({
    practiceTime: acc.practiceTime + day.practiceTime,
    speechTime: acc.speechTime + day.speechTime
  }), { practiceTime: 0, speechTime: 0 });

  const handlePrevMonth = () => {
    setCurrentDate(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => addMonths(prev, 1));
  };

  const handleMonthChange = (event: SelectChangeEvent) => {
    const [year, month] = event.target.value.split('-');
    setCurrentDate(new Date(parseInt(year), parseInt(month) - 1));
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* 월 선택 및 네비게이션 */}
      <Paper elevation={0} sx={{ p: 2, mb: 3, backgroundColor: '#90caf9' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <IconButton onClick={handlePrevMonth}>
            <ChevronLeftIcon />
          </IconButton>
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <Select
              value={format(currentDate, 'yyyy-MM')}
              onChange={handleMonthChange}
              label="월 선택"
            >
              {Array.from({ length: 12 }, (_, i) => {
                const date = new Date();
                date.setMonth(date.getMonth() - i);
                return (
                  <MenuItem key={i} value={format(date, 'yyyy-MM')}>
                    {format(date, 'yyyy년 MM월', { locale: ko })}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <IconButton onClick={handleNextMonth}>
            <ChevronRightIcon />
          </IconButton>
        </Box>

        {/* 월별 총계 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
          <Box>
            <Typography variant="h6" color="primary">
              {monthlyTotal.practiceTime}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              총 연습 시간 (분)
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" color="primary">
              {monthlyTotal.speechTime}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              총 발화 시간 (분)
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* 일별 통계 */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            일별 통계
          </Typography>
          <List>
            {dailyStats.map((day, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={format(day.date, 'M월 d일 (EEEE)', { locale: ko })}
                    secondary={
                      <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <MicIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                          <Typography variant="body2" color="text.secondary">
                            {day.practiceTime}분
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <RecordVoiceOverIcon sx={{ fontSize: 16, color: 'secondary.main' }} />
                          <Typography variant="body2" color="text.secondary">
                            {day.speechTime}분
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
                {index < dailyStats.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Status; 