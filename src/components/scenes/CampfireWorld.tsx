import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import config from '../../data/config';
import { loadUploads } from '../../utils/storage';
import SoundToggle from '../ui/SoundToggle';
import './CampfireWorld.css';

interface Speech {
  name: string;
  text: string;
}

const CampfireWorld: React.FC = () => {
  const { selectScene, goToBirthday } = useStore();
  const [showContent, setShowContent] = useState(false);
  const [hiddenStarClicks, setHiddenStarClicks] = useState(0);
  const [speech, setSpeech] = useState<Speech | null>(null);
  const [panelOpen, setPanelOpen] = useState(true);
  const [hasContent, setHasContent] = useState<Record<string, boolean>>({});
  const speechTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lineIndicesRef = useRef<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    loadUploads().then(uploads => {
      const map: Record<string, boolean> = {};
      config.scenes.forEach(scene => {
        const uploaded = (uploads[scene.id] || []).length;
        const fromConfig = scene.friends.reduce((sum, f) => sum + f.contents.length, 0);
        map[scene.id] = uploaded + fromConfig > 0;
      });
      setHasContent(map);
    });
  }, []);

  const showSpeech = useCallback((name: string, text: string) => {
    setSpeech({ name, text });
    if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    speechTimerRef.current = setTimeout(() => setSpeech(null), 4000);
  }, []);

  const handleCharacterClick = useCallback((index: number) => {
    const charConfig = config.characters?.[index];
    if (!charConfig || !charConfig.lines.length) return;
    const idx = lineIndicesRef.current[index];
    const line = charConfig.lines[idx % charConfig.lines.length];
    lineIndicesRef.current[index] = idx + 1;
    showSpeech(charConfig.name, line);
  }, [showSpeech]);

  const handleNothingButton = useCallback(() => {
    showSpeech('我们', '我们在。你不需要把自己说明白，也不需要表现得很好，才能来找我们。');
  }, [showSpeech]);

  useEffect(() => {
    return () => {
      if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    };
  }, []);

  const handleHiddenStar = () => {
    const next = hiddenStarClicks + 1;
    setHiddenStarClicks(next);
    if (next >= 3) goToBirthday();
  };

  return (
    <motion.div
      className="campfire-world"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Scene background image */}
      <div className="scene-bg" />

      {/* Subtle dark gradient at bottom for readability */}
      <div className="scene-vignette" />

      {/* Hidden star for birthday easter egg */}
      <motion.button
        className="hidden-star"
        onClick={handleHiddenStar}
        whileHover={{ scale: 2 }}
        title=""
      />

      {/* Character click zones (爷爷 大哥 九十 约翰, left to right) */}
      <AnimatePresence>
        {showContent && (
          <>
            {[0, 1, 2, 3].map((i) => (
              <motion.button
                key={`char-${i}`}
                className={`char-zone char-zone--${i}`}
                onClick={() => handleCharacterClick(i)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Collapsible sign panel */}
      <AnimatePresence>
        {showContent && (
          <>
            {/* Toggle tab — always visible on the right edge */}
            <motion.button
              className={`panel-tab ${panelOpen ? 'panel-tab--open' : ''}`}
              onClick={(e) => { e.stopPropagation(); setPanelOpen(!panelOpen); }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              {panelOpen ? '收起' : '情绪'}
            </motion.button>

            {/* Panel */}
            <AnimatePresence>
              {panelOpen && (
                <motion.div
                  className="sign-panel"
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 60, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {config.scenes.map((scene, i) => (
                    <motion.button
                      key={scene.id}
                      className="sign-zone"
                      onClick={() => selectScene(scene)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.03, duration: 0.3 }}
                    >
                      <span className="sign-zone__label">{scene.title}</span>
                      {hasContent[scene.id] && (
                        <span className="sign-zone__dot" />
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Backdrop — click to close panel */}
            {panelOpen && (
              <div
                className="panel-backdrop"
                onClick={() => setPanelOpen(false)}
              />
            )}
          </>
        )}
      </AnimatePresence>

      {/* "以上都不是" button — always visible, separate from emotion options */}
      <AnimatePresence>
        {showContent && (
          <motion.button
            className="nothing-button"
            onClick={handleNothingButton}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.4 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            以上都不是，我只想确认你们还在。
          </motion.button>
        )}
      </AnimatePresence>

      {/* Centered speech bubble */}
      <AnimatePresence>
        {speech && (
          <motion.div
            className="center-speech"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="center-speech__name">{speech.name}</span>
            <span className="center-speech__text">{speech.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sound toggle */}
      <SoundToggle />
    </motion.div>
  );
};

export default CampfireWorld;
