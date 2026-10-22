import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { toggleAmbient } from '../../utils/ambient';
import './SoundToggle.css';

const SoundToggle: React.FC = () => {
  const { isMusicOn, toggleMusic } = useStore();

  const handleClick = () => {
    const next = !isMusicOn;
    toggleMusic();
    toggleAmbient(next);
  };

  return (
    <motion.button
      className="sound-toggle"
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={isMusicOn ? '关闭环境音' : '开启环境音'}
    >
      <div className={`sound-toggle__icon ${isMusicOn ? 'sound-toggle__icon--on' : ''}`}>
        {isMusicOn ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </div>
    </motion.button>
  );
};

export default SoundToggle;
