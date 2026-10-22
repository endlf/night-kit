import React from 'react';
import './Characters.css';

interface CharacterProps {
  index: number;
  className?: string;
  onSpeak?: (index: number) => void;
}

const Characters: React.FC<CharacterProps> = ({ index, className = '', onSpeak }) => {
  const handleClick = () => {
    onSpeak?.(index);
  };

  const renderCharacter = () => {
    switch (index) {
      case 0:
        // Girl 1: glasses, medium dark hair, teal sweater - waving
        return (
          <svg viewBox="0 0 70 90" className="character__svg">
            {/* Body - sitting pose */}
            <ellipse cx="35" cy="72" rx="15" ry="14" fill="#4a6670" />
            {/* Arms */}
            <path d="M22 65 Q15 55 12 48" stroke="#4a6670" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M48 65 Q55 55 52 45" stroke="#4a6670" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Hand waving */}
            <circle cx="12" cy="46" r="3" fill="#f5e0cc" />
            {/* Head */}
            <circle cx="35" cy="38" r="13" fill="#f5e0cc" />
            {/* Hair - medium length, straight with bangs */}
            <path d="M22 32 Q22 20 35 18 Q48 20 48 32 L48 45 Q46 48 44 45 L44 35 Q44 25 35 23 Q26 25 26 35 L26 45 Q24 48 22 45 Z" fill="#2a1a0a" />
            <path d="M23 33 Q28 30 35 30 Q42 30 47 33" stroke="#2a1a0a" strokeWidth="2" fill="none" />
            {/* Face */}
            <circle cx="31" cy="38" r="1.8" fill="#1a0a00" />
            <circle cx="39" cy="38" r="1.8" fill="#1a0a00" />
            <path d="M33 42 Q35 44 37 42" stroke="#1a0a00" strokeWidth="1" fill="none" />
            {/* Blush */}
            <circle cx="28" cy="41" r="2.5" fill="rgba(255,150,130,0.2)" />
            <circle cx="42" cy="41" r="2.5" fill="rgba(255,150,130,0.2)" />
            {/* Glasses */}
            <circle cx="31" cy="38" r="5" stroke="#666" strokeWidth="0.8" fill="none" />
            <circle cx="39" cy="38" r="5" stroke="#666" strokeWidth="0.8" fill="none" />
            <line x1="36" y1="38" x2="34" y2="38" stroke="#666" strokeWidth="0.8" />
          </svg>
        );

      case 1:
        // Girl 2: dark straight hair with bangs, cream sweater - both hands up
        return (
          <svg viewBox="0 0 70 90" className="character__svg">
            {/* Body */}
            <ellipse cx="35" cy="72" rx="15" ry="14" fill="#e8e0d4" />
            {/* Arms up */}
            <path d="M22 62 Q18 50 20 40" stroke="#e8e0d4" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M48 62 Q52 50 50 40" stroke="#e8e0d4" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Hands */}
            <circle cx="20" cy="38" r="3" fill="#f5e0cc" />
            <circle cx="50" cy="38" r="3" fill="#f5e0cc" />
            {/* Head */}
            <circle cx="35" cy="38" r="13" fill="#f5e0cc" />
            {/* Hair - straight with bangs */}
            <path d="M22 32 Q22 18 35 16 Q48 18 48 32 L48 50 Q46 53 44 50 L44 35 Q44 23 35 21 Q26 23 26 35 L26 50 Q24 53 22 50 Z" fill="#1a0a00" />
            {/* Bangs */}
            <path d="M24 30 Q30 26 35 26 Q40 26 46 30" fill="#1a0a00" />
            <line x1="28" y1="28" x2="27" y2="33" stroke="#1a0a00" strokeWidth="1.5" />
            <line x1="35" y1="26" x2="35" y2="32" stroke="#1a0a00" strokeWidth="1.5" />
            <line x1="42" y1="28" x2="43" y2="33" stroke="#1a0a00" strokeWidth="1.5" />
            {/* Face */}
            <circle cx="31" cy="38" r="1.8" fill="#1a0a00" />
            <circle cx="39" cy="38" r="1.8" fill="#1a0a00" />
            <path d="M33 42 Q35 44.5 37 42" stroke="#1a0a00" strokeWidth="1" fill="none" />
            {/* Blush */}
            <circle cx="28" cy="41" r="2.5" fill="rgba(255,150,130,0.2)" />
            <circle cx="42" cy="41" r="2.5" fill="rgba(255,150,130,0.2)" />
          </svg>
        );

      case 2:
        // Girl 3: glasses, long wavy dark hair, dark blue sweater - peace sign
        return (
          <svg viewBox="0 0 70 90" className="character__svg">
            {/* Body */}
            <ellipse cx="35" cy="72" rx="15" ry="14" fill="#2a3a4a" />
            {/* Arms */}
            <path d="M22 65 Q18 55 15 50" stroke="#2a3a4a" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M48 62 Q55 48 58 38" stroke="#2a3a4a" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Hand with peace sign */}
            <circle cx="58" cy="36" r="3" fill="#f5e0cc" />
            <line x1="56" y1="33" x2="55" y2="27" stroke="#f5e0cc" strokeWidth="2" strokeLinecap="round" />
            <line x1="60" y1="33" x2="61" y2="27" stroke="#f5e0cc" strokeWidth="2" strokeLinecap="round" />
            {/* Head */}
            <circle cx="35" cy="38" r="13" fill="#f5e0cc" />
            {/* Hair - long wavy */}
            <path d="M22 32 Q22 18 35 16 Q48 18 48 32 L49 55 Q47 60 44 55 Q42 48 44 40 L44 35 Q44 23 35 21 Q26 23 26 35 L26 40 Q28 48 26 55 Q23 60 21 55 Z" fill="#1a0a00" />
            {/* Wavy hair details */}
            <path d="M21 45 Q19 50 21 55" stroke="#1a0a00" strokeWidth="3" fill="none" />
            <path d="M49 45 Q51 50 49 55" stroke="#1a0a00" strokeWidth="3" fill="none" />
            {/* Face */}
            <circle cx="31" cy="38" r="1.8" fill="#1a0a00" />
            <circle cx="39" cy="38" r="1.8" fill="#1a0a00" />
            <path d="M33 42 Q35 44 37 42" stroke="#1a0a00" strokeWidth="1" fill="none" />
            {/* Blush */}
            <circle cx="28" cy="41" r="2.5" fill="rgba(255,150,130,0.2)" />
            <circle cx="42" cy="41" r="2.5" fill="rgba(255,150,130,0.2)" />
            {/* Glasses */}
            <circle cx="31" cy="38" r="5" stroke="#666" strokeWidth="0.8" fill="none" />
            <circle cx="39" cy="38" r="5" stroke="#666" strokeWidth="0.8" fill="none" />
            <line x1="36" y1="38" x2="34" y2="38" stroke="#666" strokeWidth="0.8" />
          </svg>
        );

      case 3:
        // Girl 4: curly hair, red earrings, yellow cardigan - waving
        return (
          <svg viewBox="0 0 70 90" className="character__svg">
            {/* Body */}
            <ellipse cx="35" cy="72" rx="15" ry="14" fill="#d4a840" />
            {/* White collar */}
            <path d="M28 60 Q35 56 42 60" stroke="#fff" strokeWidth="2" fill="none" />
            {/* Arms */}
            <path d="M22 65 Q15 55 10 48" stroke="#d4a840" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M48 65 Q55 55 58 48" stroke="#d4a840" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Hands */}
            <circle cx="10" cy="46" r="3" fill="#f5e0cc" />
            <circle cx="58" cy="46" r="3" fill="#f5e0cc" />
            {/* Head */}
            <circle cx="35" cy="38" r="13" fill="#f5e0cc" />
            {/* Hair - curly */}
            <circle cx="23" cy="30" r="5" fill="#1a0a00" />
            <circle cx="35" cy="22" r="5" fill="#1a0a00" />
            <circle cx="47" cy="30" r="5" fill="#1a0a00" />
            <circle cx="20" cy="38" r="4.5" fill="#1a0a00" />
            <circle cx="50" cy="38" r="4.5" fill="#1a0a00" />
            <circle cx="22" cy="46" r="4" fill="#1a0a00" />
            <circle cx="48" cy="46" r="4" fill="#1a0a00" />
            <circle cx="28" cy="24" r="4" fill="#1a0a00" />
            <circle cx="42" cy="24" r="4" fill="#1a0a00" />
            {/* Face */}
            <circle cx="31" cy="38" r="1.8" fill="#1a0a00" />
            <circle cx="39" cy="38" r="1.8" fill="#1a0a00" />
            <path d="M33 42 Q35 44.5 37 42" stroke="#1a0a00" strokeWidth="1" fill="none" />
            {/* Blush */}
            <circle cx="28" cy="41" r="2.5" fill="rgba(255,150,130,0.2)" />
            <circle cx="42" cy="41" r="2.5" fill="rgba(255,150,130,0.2)" />
            {/* Earrings */}
            <circle cx="21" cy="40" r="2" fill="#cc3333" />
            <circle cx="49" cy="40" r="2" fill="#cc3333" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`character ${className} character--clickable`}
      data-index={index}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') handleClick(); }}
    >
      {renderCharacter()}
    </div>
  );
};

export default Characters;
