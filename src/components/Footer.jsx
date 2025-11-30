import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Stack,
  Divider,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  KeyboardArrowUp as ArrowUpIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', to: '/' },
    { name: 'About', to: '/about' },
    { name: 'Skills', to: '/skills' },
    { name: 'Projects', to: '/projects' },
    { name: 'Contact', to: '/contact' },
  ];

  const socialLinks = [
    {
      icon: GitHubIcon,
      url: 'https://github.com/yourprofile',
      label: 'GitHub',
    },
    {
      icon: LinkedInIcon,
      url: 'https://linkedin.com/in/yourprofile',
      label: 'LinkedIn',
    },
    {
      icon: EmailIcon,
      url: 'mailto:trinhxuantrung@example.com',
      label: 'Email',
    },
    {
      icon: PhoneIcon,
      url: 'tel:+84123456789',
      label: 'Phone',
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'grey.900',
        color: 'white',
        pt: 6,
        pb: 3,
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom fontWeight={700}>
              Trịnh Xuân Trung
            </Typography>
            <Typography variant="body2" color="grey.400" sx={{ mb: 3 }}>
              IT Business Analyst | Sinh viên Công nghệ Thông tin
            </Typography>
            <Typography variant="body2" color="grey.400">
              Cầu nối giữa kỹ thuật và kinh doanh, chuyển hóa nhu cầu thành giải pháp công nghệ hiệu quả.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Liên Kết Nhanh
            </Typography>
            <Stack spacing={1}>
              {quickLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'grey.400',
                      cursor: 'pointer',
                      '&:hover': {
                        color: 'primary.main',
                      },
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {link.name}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Contact & Social */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Kết Nối
            </Typography>
            <Stack spacing={2}>
              <Typography variant="body2" color="grey.400">
                trinhxuantrung@example.com
              </Typography>
              <Typography variant="body2" color="grey.400">
                +84 123 456 789
              </Typography>
              <Typography variant="body2" color="grey.400">
                TP. Hồ Chí Minh, Việt Nam
              </Typography>
            </Stack>

            {/* Social Icons */}
            <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  sx={{
                    color: 'grey.400',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateY(-3px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <social.icon />
                </IconButton>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'grey.800' }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="grey.500">
            © {currentYear} Trịnh Xuân Trung. All rights reserved.
          </Typography>

          <Link to="/">
            <IconButton
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                  transform: 'translateY(-3px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <ArrowUpIcon />
            </IconButton>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;