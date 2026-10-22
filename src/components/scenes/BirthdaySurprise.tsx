import React from 'react';
import { motion } from 'framer-motion';
import config from '../../data/config';
import './BirthdaySurprise.css';

const BirthdaySurprise: React.FC = () => {
  return (
    <motion.div
      className="birthday-surprise"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* Stars background */}
      <div className="birthday-surprise__stars">
        {Array.from({ length: 200 }).map((_, i) => (
          <div
            key={i}
            className="star star--bright"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Aurora - more visible */}
      <div className="birthday-surprise__aurora">
        <div className="aurora__band aurora__band--1" />
        <div className="aurora__band aurora__band--2" />
        <div className="aurora__band aurora__band--3" />
      </div>

      {/* Content */}
      <div className="birthday-surprise__content">
        <motion.p
          className="birthday-surprise__intro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {config.birthdaySurprise.message}
        </motion.p>

        {/* Photo gallery */}
        {config.birthdaySurprise.photos.length > 0 && (
          <motion.div
            className="birthday-gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {config.birthdaySurprise.photos.map((photo, i) => (
              <motion.div
                key={photo.id}
                className="birthday-gallery__item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
              >
                <img src={photo.url} alt={photo.caption || ''} />
                {photo.caption && <p>{photo.caption}</p>}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Videos */}
        {config.birthdaySurprise.videos.map((video, i) => (
          <motion.div
            key={video.id}
            className="birthday-video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <video src={video.url} controls />
          </motion.div>
        ))}

        {/* Audio messages */}
        {config.birthdaySurprise.audios.map((audio, i) => (
          <motion.div
            key={audio.id}
            className="birthday-audio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4 + i * 0.5, duration: 1 }}
          >
            <audio src={audio.url} controls />
            {audio.caption && <p>{audio.caption}</p>}
          </motion.div>
        ))}

        {/* Final message */}
        <motion.div
          className="birthday-surprise__ending"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <p className="birthday-surprise__wish">生日快乐。</p>
          <p className="birthday-surprise__promise">
            无论今晚是什么天气，我们都在这里。
          </p>
        </motion.div>
      </div>

      {/* Slow pull back effect - simulating camera pulling away */}
      <motion.div
        className="birthday-surprise__pullback"
        initial={{ scale: 1 }}
        animate={{ scale: 0.85 }}
        transition={{ delay: 2, duration: 4, ease: 'easeInOut' }}
      />
    </motion.div>
  );
};

export default BirthdaySurprise;
