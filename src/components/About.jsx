import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Avatar,
  Stack,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  Cake as CakeIcon,
  LocationOn as LocationIcon,
  Favorite as FavoriteIcon,
  Code as CodeIcon,
  Storage as StorageIcon,
  Psychology as PsychologyIcon,
  Build as BuildIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useSound } from '../hooks/useSound';

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { playLoadSound, playHoverSound } = useSound();
  const hasPlayedLoadSound = React.useRef(false);

  React.useEffect(() => {
    if (inView && !hasPlayedLoadSound.current) {
      setTimeout(() => {
        playLoadSound();
        hasPlayedLoadSound.current = true;
      }, 300);
    }
  }, [inView, playLoadSound]);



  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Effects */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(0, 247, 255, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 80% 20%, rgba(211, 255, 78, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 8 }}>
        {/* 1. About Intro */}
        <MotionBox
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          sx={{ mb: 8 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <MotionBox
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onMouseEnter={playHoverSound}
              sx={{ display: 'inline-block', cursor: 'pointer' }}
            >
              <Avatar
                src="/images/me1.png"
                sx={{
                  width: { xs: 200, md: 250 },
                  height: { xs: 200, md: 250 },
                  border: '4px solid rgba(0, 247, 255, 0.3)',
                  boxShadow: '0 0 30px rgba(0, 247, 255, 0.3)',
                  mt: 8,
                }}
              />
            </MotionBox>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h3"
                  sx={{
                    color: 'white',
                    mb: 3,
                    fontWeight: 700,
                  }}
                >
                  Xin chào, tôi là{' '}
                  <Box
                    component="span"
                    sx={{
                      background: 'linear-gradient(45deg, #00f7ff, #d3ff4e)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Trịnh Xuân Trung
                  </Box>{' '}
                  👋
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                >
                  Hiện là sinh viên năm cuối ngành Công Nghệ Thông Tin, 
                  với niềm đam mê và mong muốn trở thành Thực tập sinh Business Analyst, 
                  luôn giữ thái độ chủ động, sự ham học hỏi, không ngừng tích lũy kinh nghiệm và hoàn thiện bản thân.
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: 1.8,
                  }}
                >
                  
                </Typography>
          </Box>
        </MotionBox>



        {/* 4. Career Goals */}
        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          sx={{ textAlign: 'center' }}
        >
            <Typography
              variant="h4"
              sx={{
                color: 'white',
                mb: 4,
                fontWeight: 600,
              }}
            >
              Định hướng & Mục tiêu nghề nghiệp
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: 1.8,
                maxWidth: 800,
                mx: 'auto',
                mb: 3,
              }}
            >
              Trở thành Business Analyst chuyên nghiệp, 
              có khả năng dẫn dắt yêu cầu trong các dự án lớn. 
              Phát triển chuyên môn sâu trong các lĩnh vực như Product Analysis, System Analysis, 
              phát huy hết khả năng làm việc để góp phần vào sự phát triển của công ty và việc tối ưu 
              quy trình nghiệp vụ giúp xây dựng giải pháp mang lại giá trị cho doanh nghiệp và người dùng.

            </Typography>
            <Box
              sx={{
                display: 'inline-block',
                p: 3,
                borderRadius: 3,
                background: 'linear-gradient(45deg, rgba(0, 247, 255, 0.1), rgba(211, 255, 78, 0.1))',
                border: '1px solid rgba(0, 247, 255, 0.3)',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: '#00f7ff',
                  fontWeight: 500,
                  fontStyle: 'italic',
                }}
              >
                "Luôn học hỏi, không ngừng sáng tạo, tạo ra giá trị thực tế"
              </Typography>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default About;