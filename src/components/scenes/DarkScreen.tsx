import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import './DarkScreen.css';

const DarkScreen: React.FC = () => {
  const { openKit } = useStore();

  return (
    <motion.div
      className="dark-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
    >
      <div className="dark-screen__image" />

      <motion.div
        className="dark-screen__overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <p className="dark-screen__subtitle">给某些很难熬的夜晚</p>

        <motion.button
          className="dark-screen__button"
          onClick={openKit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          打开急救箱
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default DarkScreen;
