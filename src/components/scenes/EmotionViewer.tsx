import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import type { EmotionScene, MediaContent } from '../../data/types';
import { loadUploads } from '../../utils/storage';
import ContentModal from './ContentModal';
import './EmotionViewer.css';

interface EmotionViewerProps {
  scene: EmotionScene;
}

interface MergedItem {
  content: MediaContent;
  friendName: string;
}

const EmotionViewer: React.FC<EmotionViewerProps> = ({ scene }) => {
  const { backToCampfire } = useStore();
  const [showObject, setShowObject] = useState(false);
  const [selectedContent, setSelectedContent] = useState<MergedItem | null>(null);
  const [uploadedItems, setUploadedItems] = useState<MediaContent[]>([]);

  useEffect(() => {
    let cancelled = false;
    loadUploads().then(all => {
      if (!cancelled) setUploadedItems(all[scene.id] || []);
    });
    return () => { cancelled = true; };
  }, [scene.id]);

  // Config content + localStorage uploads, merged
  const configItems: MergedItem[] = scene.friends.flatMap(f =>
    f.contents.map(c => ({ content: c, friendName: f.name }))
  );
  const uploadItems: MergedItem[] = uploadedItems.map(c => ({ content: c, friendName: '' }));
  const allItems: MergedItem[] = [...uploadItems, ...configItems];

  return (
    <motion.div
      className="emotion-viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onAnimationComplete={() => setTimeout(() => setShowObject(true), 400)}
    >
      <div className="emotion-viewer__bg" />

      {/* Title */}
      <motion.h2
        className="emotion-viewer__title"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {scene.title}
      </motion.h2>

      {/* Content list */}
      <AnimatePresence>
        {showObject && !selectedContent && (
          <motion.div
            className="emotion-viewer__box"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className="emotion-viewer__hint">点进去看看</p>

            {allItems.length === 0 ? (
              <p className="emotion-viewer__empty">还没有内容</p>
            ) : (
              <div className="emotion-viewer__list">
                {allItems.map((item, i) => (
                  <motion.button
                    key={item.content.id}
                    className="emotion-item"
                    onClick={() => setSelectedContent(item)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="emotion-item__name">
                      {item.content.caption || `${item.friendName} 留下的`}
                    </span>
                    <span className="emotion-item__type">
                      {item.content.type === 'photo' && '照片'}
                      {item.content.type === 'video' && '视频'}
                      {item.content.type === 'audio' && '语音'}
                      {item.content.type === 'text' && '信'}
                      {item.content.type === 'document' && '文档'}
                    </span>
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content modal */}
      <AnimatePresence>
        {selectedContent && (
          <ContentModal
            content={selectedContent.content}
            onClose={() => setSelectedContent(null)}
          />
        )}
      </AnimatePresence>

      {/* Back */}
      <motion.button
        className="emotion-viewer__back"
        onClick={backToCampfire}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        回到篝火
      </motion.button>
    </motion.div>
  );
};

export default EmotionViewer;
