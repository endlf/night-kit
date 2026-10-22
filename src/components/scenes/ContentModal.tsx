import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { MediaContent } from '../../data/types';
import './ContentModal.css';

interface ContentModalProps {
  content: MediaContent;
  onClose: () => void;
}

const getFileName = (content: MediaContent): string => {
  if (content.caption) return content.caption;
  try {
    const u = new URL(content.url, window.location.href);
    const path = u.pathname.split('/').pop() || 'file';
    return decodeURIComponent(path);
  } catch {
    return '下载文件';
  }
};

const getExt = (content: MediaContent): string => {
  try {
    const u = new URL(content.url, window.location.href);
    const path = u.pathname.split('/').pop() || '';
    const ext = path.split('.').pop()?.toLowerCase() || '';
    return ext;
  } catch {
    return '';
  }
};

const ContentModal: React.FC<ContentModalProps> = ({ content, onClose }) => {
  const mediaRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  useEffect(() => {
    if (content.type === 'text') {
      const t = setTimeout(() => setRevealed(true), 800);
      return () => clearTimeout(t);
    }
  }, [content.type]);

  const isPdf = content.type === 'document' && getExt(content) === 'pdf';
  const isEbook = content.type === 'document' && !isPdf;

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = content.url;
    a.download = getFileName(content);
    a.target = '_blank';
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const showDownload = content.type !== 'text';

  return (
    <motion.div
      className="content-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClose}
    >
      <motion.div
        className={`content-modal__container ${content.type === 'text' ? 'content-modal__container--letter' : ''}`}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        ref={mediaRef}
      >
        {content.type === 'photo' && (
          <img
            src={content.url}
            alt={content.caption || ''}
            className="content-modal__image"
          />
        )}

        {content.type === 'video' && (
          <video
            src={content.url}
            controls
            autoPlay
            className="content-modal__video"
          />
        )}

        {content.type === 'audio' && (
          <div className="content-modal__audio">
            <div className="audio-visual">
              <div className="audio-visual__icon">♪</div>
              {content.caption && (
                <p className="audio-visual__caption">{content.caption}</p>
              )}
            </div>
            <audio src={content.url} controls autoPlay className="content-modal__player" />
          </div>
        )}

        {content.type === 'document' && isPdf && (
          <iframe
            src={content.url}
            className="content-modal__pdf"
            title={content.caption || 'PDF'}
          />
        )}

        {content.type === 'document' && isEbook && (
          <div className="content-modal__ebook">
            <div className="ebook-icon">📖</div>
            <p className="ebook-name">{getFileName(content)}</p>
            <p className="ebook-hint">电子书文件，下载后阅读</p>
          </div>
        )}

        {content.type === 'text' && (
          <div className={`letter ${revealed ? 'letter--revealed' : ''}`}>
            <div className="letter__paper">
              <div className="letter__lines" />
              <div className="letter__content">
                {content.url.split('\n').map((line, i) => (
                  <p key={i} className="letter__line">{line || '\u00A0'}</p>
                ))}
              </div>
              {content.caption && (
                <div className="letter__sign">— {content.caption}</div>
              )}
            </div>
          </div>
        )}

        {content.caption && content.type !== 'audio' && content.type !== 'text' && (
          <div className="content-modal__caption">{content.caption}</div>
        )}

        {/* Download button */}
        {showDownload && (
          <button className="content-modal__download" onClick={handleDownload}>
            ↓ 下载文件
          </button>
        )}
      </motion.div>

      <button className="content-modal__close" onClick={onClose}>
        ✕
      </button>
    </motion.div>
  );
};

export default ContentModal;
