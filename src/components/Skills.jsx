import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  LinearProgress,
  Chip,
  Stack,
} from '@mui/material';
import {
  Business as BusinessIcon,
  Code as CodeIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useSound } from '../hooks/useSound';

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
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

  const businessSkills = [
    { name: 'Requirements Analysis', level: 90 },
    { name: 'BPMN & UML Modeling', level: 85 },
    { name: 'Wireframing (Figma)', level: 80 },
    { name: 'User Story Writing', level: 88 },
    { name: 'Agile/Scrum Process', level: 75 },
    { name: 'Communication & Presentation', level: 82 },
  ];

  const technicalSkills = [
    'SQL',
    'Database Design',
    'HTML/CSS/JavaScript',
    'Python',
    'Java',
    'Jira',
    'Trello',
    'Power BI',
    'Excel Advanced',
    'Git/GitHub',
    'Figma',
    'Draw.io',
  ];

  return (
    <Box
      id="skills"
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
            💪 Kỹ Năng Chuyên Môn
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

        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          {/* Business Skills */}
          <Grid item sx={{ width: 580 }}>
            <MotionPaper
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              sx={{
                p: 4,
                height: 500,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: 4,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                borderTop: '6px solid #00f7ff',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #00f7ff, #0ea5e9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 3,
                    boxShadow: '0 8px 20px rgba(0, 247, 255, 0.3)',
                  }}
                >
                  <BusinessIcon sx={{ color: 'white', fontSize: 28 }} />
                </Box>
                <Typography 
                  variant="h4" 
                  sx={{
                    fontWeight: 700,
                    color: '#2d3748',
                    fontSize: '1.8rem',
                  }}
                >
                  Business Skills
                </Typography>
              </Box>

              <Stack spacing={3}>
                {businessSkills.map((skill, index) => (
                  <Box key={skill.name}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1" fontWeight={500}>
                        {skill.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {skill.level}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={inView ? skill.level : 0}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        bgcolor: 'rgba(0, 247, 255, 0.1)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 5,
                          background: 'linear-gradient(90deg, #00f7ff, #0ea5e9)',
                          transition: 'transform 1s ease-in-out',
                          transitionDelay: `${index * 0.2}s`,
                          boxShadow: '0 2px 8px rgba(0, 247, 255, 0.3)',
                        },
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </MotionPaper>
          </Grid>

          {/* Technical Skills */}
          <Grid item sx={{ width: 580 }}>
            <MotionPaper
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              sx={{
                p: 4,
                height: 500,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: 4,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                borderTop: '6px solid #d3ff4e',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #d3ff4e, #84cc16)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 3,
                    boxShadow: '0 8px 20px rgba(211, 255, 78, 0.3)',
                  }}
                >
                  <CodeIcon sx={{ color: 'white', fontSize: 28 }} />
                </Box>
                <Typography 
                  variant="h4" 
                  sx={{
                    fontWeight: 700,
                    color: '#2d3748',
                    fontSize: '1.8rem',
                  }}
                >
                  Technical Skills
                </Typography>
              </Box>

              <Stack direction="row" flexWrap="wrap" gap={1.5}>
                {technicalSkills.map((skill, index) => (
                  <MotionBox
                    key={skill}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  >
                    <Chip
                      label={skill}
                      onMouseEnter={playHoverSound}
                      sx={{
                        bgcolor: 'rgba(211, 255, 78, 0.15)',
                        color: '#84cc16',
                        border: '2px solid rgba(211, 255, 78, 0.3)',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        px: 1,
                        py: 0.5,
                        cursor: 'pointer',
                        '&:hover': {
                          bgcolor: 'rgba(211, 255, 78, 0.25)',
                          transform: 'translateY(-3px) scale(1.05)',
                          boxShadow: '0 8px 20px rgba(211, 255, 78, 0.3)',
                        },
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    />
                  </MotionBox>
                ))}
              </Stack>
            </MotionPaper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Skills;