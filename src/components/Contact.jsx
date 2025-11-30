import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  IconButton,
  Stack,
  Alert,
  Card,
  CardContent,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Send as SendIcon,
  Message as MessageIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useSound } from '../hooks/useSound';

const MotionPaper = motion(Paper);
const MotionBox = motion(Box);
const MotionCard = motion(Card);

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { playLoadSound, playButtonSound, playHoverSound, playSuccessSound } = useSound();
  const hasPlayedLoadSound = React.useRef(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [showAlert, setShowAlert] = useState(false);

  const contactInfo = [
    {
      icon: EmailIcon,
      title: 'Email',
      value: 'txtrung30302@gmail.com',
      link: 'mailto:txtrung30302@gmail.com',
      color: '#2563eb',
    },
    {
      icon: PhoneIcon,
      title: 'Điện thoại',
      value: '+84 9977522265',
      link: 'tel:+84997752265',
      color: '#10b981',
    },
    {
      icon: LocationIcon,
      title: 'Địa chỉ',
      value: 'Quảng Ninh, Việt Nam',
      link: '#',
      color: '#f59e0b',
    },
  ];

  const socialLinks = [
    {
      icon: LinkedInIcon,
      url: 'https://linkedin.com/in/',
      color: '#0077b5',
    },
    {
      icon: GitHubIcon,
      url: 'https://github.com/TrumBeoo',
      color: '#333',
    },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playSuccessSound();
    console.log('Form submitted:', formData);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

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
      id="contact"
      sx={{
        minHeight: '100vh',
        py: 8,
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth={false} sx={{ width: '100%', px: 4 }}>
        {/* Section Title */}
        <MotionBox
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          sx={{
            textAlign: 'center',
            mt: 5,
            mb:8,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Typography 
            variant="h2" 
            sx={{
              color: 'white',
              fontWeight: 800,
              fontSize: '4rem',
              mb: 2,
              background: 'linear-gradient(45deg, #fff, #e0e7ff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: 'none',
            }}
          >
            Liên Hệ
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              fontWeight: 400,
              fontSize: '1.2rem',
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
          
          </Typography>
        </MotionBox>

        <Grid container spacing={6} sx={{ position: 'relative', zIndex: 1, justifyContent: 'center' }}>
          {/* Contact Cards */}
          <Grid item sx={{ width: '400px' }}>
            <Stack spacing={3}>
              {contactInfo.map((info, index) => (
                <MotionCard
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  component="a"
                  href={info.link}
                  onClick={playButtonSound}
                  onMouseEnter={playHoverSound}
                  sx={{
                    textDecoration: 'none',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 3,
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                    },
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: 2,
                          background: `linear-gradient(135deg, ${info.color}, ${info.color}cc)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2,
                        }}
                      >
                        <info.icon sx={{ color: 'white', fontSize: 24 }} />
                      </Box>
                      <Typography 
                        variant="h6" 
                        sx={{
                          color: 'white',
                          fontWeight: 600,
                        }}
                      >
                        {info.title}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body2" 
                      sx={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '0.9rem',
                      }}
                    >
                      {info.value}
                    </Typography>
                  </CardContent>
                </MotionCard>
              ))}
              
              {/* Social Links */}
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                sx={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 3,
                  p: 3,
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{
                    color: 'white',
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  Kết nối với tôi
                </Typography>
                <Stack direction="row" spacing={2}>
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    >
                      <IconButton
                        component="a"
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={playButtonSound}
                        onMouseEnter={playHoverSound}
                        sx={{
                          width: 50,
                          height: 50,
                          background: `linear-gradient(135deg, ${social.color}20, ${social.color}10)`,
                          border: `1px solid ${social.color}30`,
                          color: social.color,
                          '&:hover': {
                            background: `linear-gradient(135deg, ${social.color}, ${social.color}dd)`,
                            color: 'white',
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
            </Stack>
          </Grid>

          {/* Contact Form */}
          <Grid item sx={{ width: '600px' }}>
            <MotionPaper
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              sx={{ 
                p: 4,
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                borderRadius: 3,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #3b5df3ff)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                  }}
                >
                  <MessageIcon sx={{ color: 'white', fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography 
                    variant="h5" 
                    sx={{
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '1.5rem',
                    }}
                  >
                    Gửi Tin Nhắn
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.85rem',
                    }}
                  >
                    Phản hồi trong 24h
                  </Typography>
                </Box>
              </Box>

              {showAlert && (
                <Alert 
                  severity="success" 
                  sx={{ 
                    mb: 3,
                    background: 'rgba(76, 175, 80, 0.1)',
                    border: '1px solid rgba(76, 175, 80, 0.3)',
                    color: '#4caf50',
                  }}
                >
                  Tin nhắn đã được gửi thành công!
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={2.5}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                      fullWidth
                      label="Họ và tên"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      size="small"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          background: 'rgba(255, 255, 255, 0.05)',
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#667eea',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                        },
                        '& .MuiOutlinedInput-input': {
                          color: 'white',
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      size="small"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          background: 'rgba(255, 255, 255, 0.05)',
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#667eea',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                        },
                        '& .MuiOutlinedInput-input': {
                          color: 'white',
                        },
                      }}
                    />
                  </Box>
                  <TextField
                    fullWidth
                    label="Chủ đề"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.05)',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#667eea',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiOutlinedInput-input': {
                        color: 'white',
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Tin nhắn"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.05)',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#667eea',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiOutlinedInput-input': {
                        color: 'white',
                      },
                    }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    startIcon={<SendIcon />}
                    onMouseEnter={playHoverSound}
                    sx={{
                      py: 1.2,
                      background: 'linear-gradient(135deg, #3b5df3ff)',
                      color: 'white',
                      borderRadius: 2,
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      textTransform: 'none',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    Gửi Tin Nhắn
                  </Button>
                </Stack>
              </Box>
            </MotionPaper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;