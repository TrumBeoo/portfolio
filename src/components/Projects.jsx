import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useSound } from '../hooks/useSound';

const MotionBox = motion(Box);

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cardsRef = useRef([]);
  const styleRef = useRef(null);
  const [flippedCards, setFlippedCards] = React.useState(new Set());
  const flippedCardsRef = useRef(new Set());
  const [selectedCard, setSelectedCard] = React.useState(null);
  const { playClickSound, playHoverSound, playLoadSound } = useSound();
  const hasPlayedLoadSound = useRef(false);

  const projectData = [
    { 
      title: 'Hệ thống Quản lý Thư viện', 
      tech: 'React, Node.js, MySQL, Express', 
      desc: 'Hệ thống quản lý thư viện trường đại học với tính năng mượn/trả sách, quản lý độc giả và báo cáo thống kê.',
      features: ['Quản lý sách', 'Mượn/trả sách', 'Báo cáo thống kê'],
      duration: '3 tháng',
      role: 'Full-stack Developer'
    },
    { 
      title: 'Ứng dụng Quản lý Bán hàng', 
      tech: 'Vue.js, Firebase, Stripe API', 
      desc: 'Ứng dụng quản lý bán hàng cho cửa hàng nhỏ với tích hợp thanh toán và quản lý kho.',
      features: ['Quản lý sản phẩm', 'Thanh toán online', 'Quản lý đơn hàng'],
      duration: '2 tháng',
      role: 'Frontend Developer'
    },
    { 
      title: 'Dashboard Phân tích Dữ liệu', 
      tech: 'React, D3.js, Python, FastAPI', 
      desc: 'Dashboard phân tích dữ liệu kinh doanh với biểu đồ tương tác và báo cáo real-time.',
      features: ['Biểu đồ tương tác', 'Real-time data', 'Export báo cáo'],
      duration: '4 tháng',
      role: 'Data Analyst'
    },
    { 
      title: 'Ứng dụng Mạng xã hội', 
      tech: 'React Native, Socket.io, MongoDB', 
      desc: 'Ứng dụng mạng xã hội di động với chat real-time, chia sẻ ảnh và video.',
      features: ['Chat real-time', 'Chia sẻ media', 'News feed'],
      duration: '5 tháng',
      role: 'Mobile Developer'
    },
    { 
      title: 'Website Portfolio Cá nhân', 
      tech: 'Next.js, Tailwind CSS, Framer Motion', 
      desc: 'Website portfolio cá nhân với animation mượt mà và thiết kế responsive.',
      features: ['Responsive design', 'Smooth animations', 'SEO optimized'],
      duration: '1 tháng',
      role: 'Frontend Developer'
    },
    { 
      title: 'Hệ thống Chat Doanh nghiệp', 
      tech: 'Socket.io, React, Redis, Docker', 
      desc: 'Hệ thống chat doanh nghiệp với tính năng chia sẻ file, video call và quản lý nhóm.',
      features: ['Video call', 'File sharing', 'Group management'],
      duration: '6 tháng',
      role: 'Backend Developer'
    }
  ];

  const handleCardClick = (index) => {
    playClickSound();
    setSelectedCard(index);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  const handleCardHover = () => {
    playHoverSound();
  };

  const handleCardMouseLeave = (index) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      newSet.delete(index);
      flippedCardsRef.current = newSet;
      return newSet;
    });
  };

  useEffect(() => {
    if (inView && !hasPlayedLoadSound.current) {
      setTimeout(() => {
        playLoadSound();
        hasPlayedLoadSound.current = true;
      }, 300);
    }
  }, [inView, playLoadSound]);

  useEffect(() => {
    const cards = cardsRef.current;
    const style = styleRef.current;
    let x;

    const handleMouseMove = (e, card) => {
      const pos = [e.offsetX, e.offsetY];
      e.preventDefault();
      
      const l = pos[0];
      const t = pos[1];
      const h = card.offsetHeight;
      const w = card.offsetWidth;
      const px = Math.abs(Math.floor(100 / w * l) - 100);
      const py = Math.abs(Math.floor(100 / h * t) - 100);
      const pa = (50 - px) + (50 - py);
      
      const lp = (50 + (px - 50) / 1.5);
      const tp = (50 + (py - 50) / 1.5);
      const px_spark = (50 + (px - 50) / 7);
      const py_spark = (50 + (py - 50) / 7);
      const p_opc = 20 + (Math.abs(pa) * 1.5);
      const ty = ((tp - 50) / 2) * -1;
      const tx = ((lp - 50) / 1.5) * 0.5;
      
      const grad_pos = `background-position: ${lp}% ${tp}%;`;
      const sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`;
      const opc = `opacity: ${p_opc / 100};`;
      const tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg)`;
      
      const styleContent = `
        .holo-card:hover:after { ${sprk_pos} ${opc} }
      `;
      
      cards.forEach(c => c.classList.remove('active'));
      card.classList.remove('animated');
      card.style.cssText = tf;
      if (style) style.innerHTML = styleContent;
      
      clearTimeout(x);
    };

    const handleMouseOut = (card, index) => {
      if (style) style.innerHTML = '';
      if (!flippedCardsRef.current.has(index)) {
        card.style.cssText = '';
      }
      x = setTimeout(() => {
        card.classList.add('animated');
      }, 2500);
    };

    cards.forEach((card, index) => {
      if (card) {
        card.addEventListener('mousemove', (e) => handleMouseMove(e, card));
        card.addEventListener('mouseout', () => handleMouseOut(card, index));
        card.addEventListener('mouseenter', handleCardHover);
      }
    });

    return () => {
      cards.forEach((card, index) => {
        if (card) {
          card.removeEventListener('mousemove', (e) => handleMouseMove(e, card));
          card.removeEventListener('mouseout', () => handleMouseOut(card, index));
          card.removeEventListener('mouseenter', handleCardHover);
        }
      });
    };
  }, []);

  return (
    <Box
      id="projects"
      sx={{
        minHeight: '100vh',
        py: 8,
        backgroundColor: '#333844',
        display: 'flex',
        alignItems: 'center',
        fontFamily: '"Heebo", sans-serif',
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: '1400px' }}>
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
            variant="h1" 
            sx={{
              color: 'white',
              fontWeight: 400,
              fontSize: '2.5rem',
              mb: 4,
              display: 'block',
              margin: '30px 0',
            }}
          >
            My Projects
          </Typography>
        </MotionBox>

        <style ref={styleRef} className="hover"></style>

        <Box 
          className="cards"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
            gap: 2,
            flexWrap: 'wrap',
            maxWidth: '1200px',
            mx: 'auto',
          }}
        >
          {[
            { class: 'project1', delay: 0, image: '/images/project/1.jpg' },
            { class: 'project2', delay: 0.25, image: '/images/project/2.jpg' },
            { class: 'project3', delay: 0.5, image: '/images/project/3.jpg' },
            { class: 'project4', delay: 0.75, image: '/images/project/4.jpg' },
            { class: 'project5', delay: 1, image: '/images/project/5.jpg' },
            { class: 'project6', delay: 1.25, image: '/images/project/6.jpg' }
          ].map((card, index) => (
            <Box
              key={index}
              className="three-d-wrapper"
              sx={{
                perspective: '1000px',
                isolation: 'isolate',
                transform: 'translate3d(0.1px, 0.1px, 0.1px)',
              }}
            >
              <Box
                ref={el => cardsRef.current[index] = el}
                className={`holo-card ${card.class} animated ${flippedCards.has(index) ? 'flipped' : ''}`}
                onClick={() => handleCardClick(index)}
                onMouseLeave={() => handleCardMouseLeave(index)}
                style={{
                  transform: flippedCards.has(index) ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.6s ease'
                }}
                sx={{
                  cursor: 'pointer',
                  width: { xs: '280px', md: '320px' },
                  height: { xs: '200px', md: '240px' },
                  position: 'relative',
                  overflow: 'hidden',
                  margin: '20px',
                  zIndex: 10,
                  touchAction: 'none',
                  isolation: 'isolate',
                  borderRadius: '12px',
                  border: '3px solid #2a2a2a',
                  boxShadow: '-5px -5px 5px -5px var(--color1), 5px 5px 5px -5px var(--color2), 0 55px 35px -20px rgba(0, 0, 0, 0.5)',
                  transition: 'box-shadow 0.2s ease',
                  willChange: 'transform, filter',
                  backgroundColor: '#1a1a1a',
                  backgroundImage: 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 100%)',
                  
                  transformOrigin: 'center',
                  transformStyle: 'preserve-3d',
                  
                  '&.flipped': {
                    transform: 'rotateY(180deg) !important',
                    transition: 'transform 0.6s ease !important',
                    boxShadow: '0 0 30px rgba(0, 150, 255, 0.6), -5px -5px 5px -5px var(--color1), 5px 5px 5px -5px var(--color2)',
                  },
                  
                  '&:active': {
                    transform: 'translateY(-2px) scale(0.98)',
                    boxShadow: '0 0 25px rgba(0, 255, 150, 0.5), -5px -5px 5px -5px var(--color1), 5px 5px 5px -5px var(--color2)',
                  },
                  
                  '&:not(.flipped)': {
                    transition: 'transform 0.6s ease, box-shadow 0.2s ease',
                  },
                  
                  '--color1': index < 2 ? '#667eea' : index < 4 ? '#f4791f' : index < 5 ? '#54a29e' : '#ec9bb6',
                  '--color2': index < 2 ? '#764ba2' : index < 4 ? '#f4791f' : index < 5 ? '#a79d66' : '#ccac6f',
                  
                  '&:hover': {
                    boxShadow: '-20px -20px 30px -25px var(--color1), 20px 20px 30px -25px var(--color2), -7px -7px 10px -5px var(--color1), 7px 7px 10px -5px var(--color2), 0 0 13px 4px rgba(255,255,255,0.3), 0 55px 35px -20px rgba(0, 0, 0, 0.5)',
                    transform: 'translateY(-5px)',
                  },
                  

                  
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    right: '8px',
                    bottom: '8px',
                    backgroundImage: `url(${card.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    borderRadius: '6px',
                    zIndex: 3,
                  },
                  
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: 0,
                    backgroundPosition: '50% 50%',
                    backgroundSize: '300% 300%',
                    backgroundImage: 'linear-gradient(115deg, transparent 0%, var(--color1) 25%, transparent 47%, transparent 53%, var(--color2) 75%, transparent 100%)',
                    opacity: 0.15,
                    zIndex: 2,
                    filter: 'brightness(.8) contrast(1.2)',
                    borderRadius: '12px',
                    backgroundRepeat: 'no-repeat',
                    mixBlendMode: 'soft-light',
                    transition: 'all .33s ease',
                  },
                  
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: 0,
                    backgroundImage: 'linear-gradient(125deg, #ff008420 15%, #fca40020 30%, #ffff0020 40%, #00ff8a15 60%, #00cfff20 70%, #cc4cfa20 85%)',
                    backgroundPosition: '50% 50%',
                    backgroundSize: '160%',
                    backgroundBlendMode: 'overlay',
                    zIndex: 4,
                    filter: 'brightness(1.2) contrast(1.1)',
                    transition: 'all .33s ease',
                    mixBlendMode: 'soft-light',
                    opacity: 0.2,
                    borderRadius: '12px',
                    backgroundRepeat: 'no-repeat',
                  },
                  
                  '&.active:after, &:hover:after': {
                    filter: 'brightness(1) contrast(1)',
                    opacity: 1,
                  },
                  
                  '&.active, &:hover': {
                    animation: 'none',
                  },
                  
                  '&:not(.flipped).active, &:not(.flipped):hover': {
                    transition: 'box-shadow 0.1s ease-out',
                  },
                  
                  '&.active::before, &:hover::before': {
                    animation: 'none',
                    filter: 'brightness(1.1) contrast(1.1) saturate(1.2)',
                    transition: 'filter 0.3s ease',
                  },
                  
                  '&.animated': {
                    transition: 'none',
                    animation: 'holoCard 12s ease 0s 1',
                    '&:before': {
                      transition: 'none',
                      animation: 'holoGradient 12s ease 0s 1',
                    },
                    '&:after': {
                      transition: 'none',
                      animation: 'holoSparkle 12s ease 0s 1',
                    },
                  },
                  
                  [`&:nth-of-type(${index + 1})`]: {
                    '&, &:before, &:after': {
                      animationDelay: `${card.delay}s`,
                    },
                  },
                  
                  '@keyframes holoSparkle': {
                    '0%, 100%': { opacity: 0.75, backgroundPosition: '50% 50%', filter: 'brightness(1.2) contrast(1.25)' },
                    '5%, 8%': { opacity: 1, backgroundPosition: '40% 40%', filter: 'brightness(.8) contrast(1.2)' },
                    '13%, 16%': { opacity: 0.5, backgroundPosition: '50% 50%', filter: 'brightness(1.2) contrast(.8)' },
                    '35%, 38%': { opacity: 1, backgroundPosition: '60% 60%', filter: 'brightness(1) contrast(1)' },
                    '55%': { opacity: 0.33, backgroundPosition: '45% 45%', filter: 'brightness(1.2) contrast(1.25)' },
                  },
                  
                  '@keyframes holoGradient': {
                    '0%, 100%': { opacity: 0.5, backgroundPosition: '50% 50%', filter: 'brightness(.5) contrast(1)' },
                    '5%, 9%': { backgroundPosition: '100% 100%', opacity: 1, filter: 'brightness(.75) contrast(1.25)' },
                    '13%, 17%': { backgroundPosition: '0% 0%', opacity: 0.88 },
                    '35%, 39%': { backgroundPosition: '100% 100%', opacity: 1, filter: 'brightness(.5) contrast(1)' },
                    '55%': { backgroundPosition: '0% 0%', opacity: 1, filter: 'brightness(.75) contrast(1.25)' },
                  },
                  
                  '@keyframes holoCard': {
                    '0%, 100%': { transform: 'rotateZ(0deg) rotateX(0deg) rotateY(0deg)' },
                    '5%, 8%': { transform: 'rotateZ(0deg) rotateX(6deg) rotateY(-20deg)' },
                    '13%, 16%': { transform: 'rotateZ(0deg) rotateX(-9deg) rotateY(32deg)' },
                    '35%, 38%': { transform: 'rotateZ(3deg) rotateX(12deg) rotateY(20deg)' },
                    '55%': { transform: 'rotateZ(-3deg) rotateX(-12deg) rotateY(-27deg)' },
                  },
                }}
              >
                {/* Front side */}
                <Box
                  className="card-front"
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    borderRadius: '12px',
                  }}
                />
                
                {/* Back side */}
                <Box
                  className="card-back"
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    backgroundColor: '#1a1a1a',
                    borderRadius: '12px',
                    border: '3px solid #2a2a2a',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600, color: 'var(--color1)', fontSize: '1.1rem' }}>
                    {projectData[index].title}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, color: '#888', fontSize: '0.75rem' }}>
                    {projectData[index].role} • {projectData[index].duration}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1.5, color: '#ccc', fontSize: '0.8rem', fontWeight: 500 }}>
                    {projectData[index].tech}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1.5, color: '#aaa', lineHeight: 1.3, fontSize: '0.75rem' }}>
                    {projectData[index].desc}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: 'center' }}>
                    {projectData[index].features.map((feature, i) => (
                      <Typography key={i} variant="caption" sx={{ 
                        bgcolor: 'rgba(255,255,255,0.1)', 
                        px: 1, 
                        py: 0.5, 
                        borderRadius: 1, 
                        fontSize: '0.65rem',
                        color: '#ddd'
                      }}>
                        {feature}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Click Image Modal */}
        {selectedCard !== null && (
          <Box
            onClick={handleCloseModal}
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              cursor: 'pointer',
            }}
          >
            <Box
              sx={{
                maxWidth: '80vw',
                maxHeight: '80vh',
                display: 'flex',
                gap: 4,
                alignItems: 'center',
                animation: 'fadeIn 0.3s ease-out',
                '@keyframes fadeIn': {
                  from: { opacity: 0, transform: 'scale(0.9)' },
                  to: { opacity: 1, transform: 'scale(1)' },
                },
              }}
            >
              {/* Large Image */}
              <Box
                sx={{
                  width: '500px',
                  height: '350px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
                  backgroundImage: `url(/images/project/${selectedCard + 1}.jpg)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
              
              {/* Project Details */}
              <Box
                sx={{
                  maxWidth: '400px',
                  color: 'white',
                  padding: '20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: '#fff' }}>
                  {projectData[selectedCard].title}
                </Typography>
                
                <Typography variant="body1" sx={{ mb: 2, color: '#ddd', fontWeight: 500 }}>
                  {projectData[selectedCard].role} • {projectData[selectedCard].duration}
                </Typography>
                
                <Typography variant="h6" sx={{ mb: 1, color: '#4fc3f7', fontSize: '1rem' }}>
                  Công nghệ sử dụng:
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: '#fff', fontWeight: 500 }}>
                  {projectData[selectedCard].tech}
                </Typography>
                
                <Typography variant="h6" sx={{ mb: 1, color: '#4fc3f7', fontSize: '1rem' }}>
                  Mô tả:
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: '#ccc', lineHeight: 1.6 }}>
                  {projectData[selectedCard].desc}
                </Typography>
                
                <Typography variant="h6" sx={{ mb: 2, color: '#4fc3f7', fontSize: '1rem' }}>
                  Tính năng chính:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {projectData[selectedCard].features.map((feature, i) => (
                    <Typography key={i} variant="body2" sx={{ 
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      '&:before': {
                        content: '"•"',
                        color: '#4fc3f7',
                        fontWeight: 'bold',
                        marginRight: '8px',
                      }
                    }}>
                      {feature}
                    </Typography>
                  ))}
                </Box>
                
                <Typography variant="body2" sx={{ mt: 3, color: '#888', textAlign: 'center', fontStyle: 'italic' }}>
                  Click anywhere to close
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Projects;