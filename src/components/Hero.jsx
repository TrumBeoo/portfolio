import React, { useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  IconButton,
  Avatar,
  Chip,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  KeyboardArrowDown as ArrowDownIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import { useSound } from '../hooks/useSound';
import { useInView } from 'react-intersection-observer';

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionChip = motion(Chip);

const Hero = () => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
  const { playLoadSound, playButtonSound, playHoverSound } = useSound();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const hasPlayedLoadSound = useRef(false);

  useEffect(() => {
    if (window.VANTA && window.THREE) {
      vantaEffect.current = window.VANTA.NET({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x3fc6ff,
        backgroundColor: 0x151e3c
      });
    }

    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []);

  useEffect(() => {
    if (inView && !hasPlayedLoadSound.current) {
      setTimeout(() => {
        playLoadSound();
        hasPlayedLoadSound.current = true;
      }, 500);
    }
  }, [inView, playLoadSound]);

  return (
    <Box
      ref={(el) => {
        vantaRef.current = el;
        ref(el);
      }}
      id="hero"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        pt: 8,
      }}
    >
      {/* Animated Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 6,
            alignItems: 'center',
          }}
        >
          {/* Left Content */}
          <MotionBox
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <MotionChip
              label="IT Business Analyst Intern"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontWeight: 600,
                backdropFilter: 'blur(10px)',
                mb: 3,
              }}
            />

            <MotionTypography
              variant="h1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              sx={{
                color: 'white',
                mb: 2,
              }}
            >
              Xin chào! Tôi là{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(45deg, #00f7ffff, #d3ff4eff)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Trung
              </Box>
            </MotionTypography>

            <Box sx={{ minHeight: 80, mb: 4 }}>
              <TypeAnimation
                sequence={[
                  'Sinh viên Công nghệ thông tin',
                  2000,
                  'Yêu thích phân tích nghiệp vụ - kinh doanh',
                  2000,
                  'Cầu nối giữa kỹ thuật và kinh doanh',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                style={{
                  fontSize: '1.5rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  display: 'block',
                }}
              />
            </Box>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
              <Link to="/projects" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={playButtonSound}
                  onMouseEnter={playHoverSound}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Xem Projects
                </Button>
              </Link>
              <Button
                variant="outlined"
                size="large"
                href="/cv/CV.pdf"
                download
                onClick={playButtonSound}
                onMouseEnter={playHoverSound}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Tải CV
              </Button>
            </Stack>

            {/* Social Links */}
            <Stack direction="row" spacing={2}>
              {[
                { icon: GitHubIcon, url: 'https://github.com/TrumBeoo' },
                { icon: LinkedInIcon, url: '' },
                { icon: EmailIcon, url: '' },
              ].map((social, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <IconButton
                    component="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playButtonSound}
                    onMouseEnter={playHoverSound}
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      backdropFilter: 'blur(10px)',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.3)',
                        transform: 'translateY(-3px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <social.icon />
                  </IconButton>
                </motion.div>
              ))}
            </Stack>
          </MotionBox>

          {/* Right Content - Profile Image */}
          <MotionBox
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            sx={{ 
              display: 'flex', 
              justifyContent: 'center',
            }}
          >
            <Box
              component={motion.div}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              sx={{
                width: { xs: 320, md: 440 },
                height: { xs: 320, md: 440 },
                perspective: '1000px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover .flip-container': {
                  transform: 'rotateY(180deg)',
                },
              }}
            >
              <Box
                className="flip-container"
                sx={{
                  position: 'relative',
                  width: { xs: 280, md: 400 },
                  height: { xs: 280, md: 400 },
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s',
                }}
              >
                {/* Front Side */}
                <Box
                  component="img"
                  src="/images/me.png"
                  alt="Trịnh Xuân Trung"
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    backfaceVisibility: 'hidden',
                  }}
                />
                
                {/* Back Side */}
                <Box
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: 'linear-gradient(135deg, rgba(0, 238, 255, 0.8), rgba(255, 255, 255, 0.35))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    color: 'white',
                    textAlign: 'center',
                    p: 3,
                  }}
                >
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Trịnh Xuân Trung
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    IT Business Analyst Intern
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Passionate about bridging technology and business
                  </Typography>
                </Box>
              </Box>
            </Box>
          </MotionBox>
        </Box>

        {/* Scroll Indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <Link to="/about">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <IconButton sx={{ color: 'white' }}>
                <ArrowDownIcon fontSize="large" />
              </IconButton>
            </motion.div>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;