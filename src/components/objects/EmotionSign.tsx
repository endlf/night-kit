import React from 'react';
import { motion } from 'framer-motion';
import type { EmotionScene } from '../../data/types';
import './EmotionSign.css';

interface EmotionSignProps {
  scene: EmotionScene;
  direction: 'left' | 'right' | 'bottom';
  delay: number;
  onClick: () => void;
}

const EmotionSign: React.FC<EmotionSignProps> = ({ scene, direction, delay, onClick }) => {
  return (
    <motion.button
      className={`emotion-sign emotion-sign--${direction}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay + 0.5, duration: 0.8, ease: 'easeOut' }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }}
    >
      <div className="emotion-sign__plank">
        <span className="emotion-sign__text">{scene.title}</span>
      </div>
      <div className="emotion-sign__post" />
    </motion.button>
  );
};

export default EmotionSign;
