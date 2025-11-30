import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Group as GroupIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const Activities = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const activities = [
    {
      title: 'Cuộc thi Phân tích Hệ thống',
      organization: 'Đại học Công nghệ Thông tin',
      date: '2024',
      description: 'Tham gia cuộc thi phân tích và thiết kế hệ thống quản lý thư viện',
      achievement: 'Giải Ba',
      image: '/images/competition.jpg',
      tags: ['System Analysis', 'UML', 'Database Design'],
      icon: TrophyIcon,
      color: '#f59e0b',
    },
    {
      title: 'Nhóm Nghiên cứu BA',
      organization: 'IT Club',
      date: '2023 - 2024',
      description: 'Thành viên nhóm nghiên cứu về Business Analysis và Digital Transformation',
      achievement: 'Thành viên tích cực',
      image: '/images/research.jpg',
      tags: ['Research', 'BA Methodology', 'Digital Transform'],
      icon: GroupIcon,
      color: '#8b5cf6',
    },
    {
      title: 'Workshop UX/UI Design',
      organization: 'Design Community',
      date: '2023',
      description: 'Tham gia workshop về thiết kế giao diện người dùng và trải nghiệm người dùng',
      achievement: 'Hoàn thành xuất sắc',
      image: '/images/workshop.jpg',
      tags: ['UX/UI', 'Figma', 'User Research'],
      icon: SchoolIcon,
      color: '#10b981',
    },
  ];

  return (
    <Box
      id="activities"
      sx={{
        py: 10,
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Title */}
        <MotionBox
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          sx={{
            textAlign: 'center',
            mb: 8,
          }}
        >
          <Typography variant="h2" gutterBottom>
            Hoạt Động
          </Typography>
          <Box
            sx={{
              width: 80,
              height: 4,
              bgcolor: 'primary.main',
              mx: 'auto',
              borderRadius: 2,
            }}
          />
        </MotionBox>

        {/* Activities Grid */}
        <Grid container spacing={4}>
          {activities.map((activity, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <MotionCard
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={activity.image}
                  alt={activity.title}
                  sx={{
                    objectFit: 'cover',
                  }}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: `${activity.color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                      }}
                    >
                      <activity.icon sx={{ color: activity.color, fontSize: 20 }} />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {activity.date}
                    </Typography>
                  </Box>

                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    {activity.title}
                  </Typography>

                  <Typography variant="body2" color="primary.main" gutterBottom>
                    {activity.organization}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {activity.description}
                  </Typography>

                  <Chip
                    label={activity.achievement}
                    size="small"
                    sx={{
                      bgcolor: `${activity.color}20`,
                      color: activity.color,
                      fontWeight: 500,
                      mb: 2,
                    }}
                  />

                  <Stack direction="row" flexWrap="wrap" gap={0.5}>
                    {activity.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.7rem' }}
                      />
                    ))}
                  </Stack>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Activities;