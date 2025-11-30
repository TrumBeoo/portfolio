import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Stack,
} from '@mui/material';
import {
  Verified as VerifiedIcon,
  OpenInNew as OpenIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useSound } from '../hooks/useSound';

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const Certificates = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { playLoadSound, playButtonSound, playHoverSound } = useSound();
  const hasPlayedLoadSound = React.useRef(false);

  React.useEffect(() => {
    if (inView && !hasPlayedLoadSound.current) {
      setTimeout(() => {
        playLoadSound();
        hasPlayedLoadSound.current = true;
      }, 300);
    }
  }, [inView, playLoadSound]);

  const certificates = [
    {
      title: 'Business Analysis Fundamentals',
      issuer: 'IIBA (International Institute of Business Analysis)',
      date: '2023',
      image: '/images/cert-ba.jpg',
      credentialId: 'BA-2023-001',
      skills: ['Requirements Analysis', 'Stakeholder Management', 'Process Modeling'],
      verifyUrl: '#',
    },
    {
      title: 'Agile Analysis Certification',
      issuer: 'Scrum Alliance',
      date: '2023',
      image: '/images/cert-agile.jpg',
      credentialId: 'AAC-2023-002',
      skills: ['Agile Methodology', 'User Stories', 'Sprint Planning'],
      verifyUrl: '#',
    },
    {
      title: 'SQL for Data Analysis',
      issuer: 'Coursera - Google',
      date: '2023',
      image: '/images/cert-sql.jpg',
      credentialId: 'SQL-2023-003',
      skills: ['SQL Queries', 'Database Design', 'Data Analysis'],
      verifyUrl: '#',
    },
    {
      title: 'UX/UI Design Principles',
      issuer: 'Adobe Certified Expert',
      date: '2024',
      image: '/images/cert-ux.jpg',
      credentialId: 'UX-2024-004',
      skills: ['User Experience', 'Wireframing', 'Prototyping'],
      verifyUrl: '#',
    },
  ];

  return (
    <Box
      id="certificates"
      sx={{
        minHeight: '100vh',
        py: 8,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: '1200px' }}>
        {/* Section Title */}
        <MotionBox
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          sx={{
            textAlign: 'center',
            mb: 6,
          }}
        >
          <Typography 
            variant="h2" 
            sx={{
              color: 'white',
              fontWeight: 700,
              fontSize: '3.5rem',
              mb: 2,
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
            🏆 Chứng Chỉ & Giải Thưởng
          </Typography>
          <Box
            sx={{
              width: 120,
              height: 6,
              background: 'linear-gradient(90deg, #00f7ff, #d3ff4e)',
              mx: 'auto',
              borderRadius: 3,
              boxShadow: '0 4px 15px rgba(0,247,255,0.4)',
            }}
          />
        </MotionBox>

        {/* Certificates Grid */}
        <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
          {certificates.map((cert, index) => (
            <Grid item key={index} sx={{ width: 580 }}>
              <MotionCard
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                onMouseEnter={playHoverSound}
                sx={{
                  width: 560,
                  height: 420,
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: 4,
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.02)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                  },
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={cert.image}
                  alt={cert.title}
                  sx={{
                    objectFit: 'cover',
                    borderRadius: '16px 16px 0 0',
                  }}
                />
                <CardContent sx={{ flexGrow: 1, p: 3, height: 240 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <VerifiedIcon sx={{ color: '#00f7ff', mr: 1, fontSize: 20 }} />
                    <Typography 
                      variant="caption" 
                      sx={{
                        color: '#00f7ff',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                      }}
                    >
                      Verified • {cert.date}
                    </Typography>
                  </Box>

                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.25rem',
                      color: '#2d3748',
                      mb: 1,
                    }}
                  >
                    {cert.title}
                  </Typography>

                  <Typography 
                    variant="body2" 
                    gutterBottom
                    sx={{
                      color: '#667eea',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                    }}
                  >
                    {cert.issuer}
                  </Typography>

                  <Typography 
                    variant="caption" 
                    sx={{ 
                      mb: 2, 
                      display: 'block',
                      color: '#718096',
                      fontSize: '0.75rem',
                    }}
                  >
                    Credential ID: {cert.credentialId}
                  </Typography>

                  <Stack direction="row" flexWrap="wrap" gap={0.8} sx={{ mb: 3 }}>
                    {cert.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        sx={{
                          fontSize: '0.7rem',
                          bgcolor: 'rgba(102, 126, 234, 0.1)',
                          color: '#667eea',
                          border: '1px solid rgba(102, 126, 234, 0.3)',
                          fontWeight: 500,
                        }}
                      />
                    ))}
                  </Stack>

                  <Button
                    startIcon={<OpenIcon />}
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                    onClick={playButtonSound}
                    sx={{
                      background: 'linear-gradient(45deg, #667eea, #764ba2)',
                      color: 'white',
                      py: 1,
                      borderRadius: 2,
                      fontWeight: 600,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Verify Certificate
                  </Button>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Certificates;