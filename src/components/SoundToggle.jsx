import React, { useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { VolumeUp, VolumeOff } from '@mui/icons-material';

const SoundToggle = ({ onToggle }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleToggle = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    onToggle(newState);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 1000,
      }}
    >
      <Tooltip title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}>
        <IconButton
          onClick={handleToggle}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          {soundEnabled ? <VolumeUp /> : <VolumeOff />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default SoundToggle;