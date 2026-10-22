import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useStore } from './store/useStore';
import DarkScreen from './components/scenes/DarkScreen';
import CampfireWorld from './components/scenes/CampfireWorld';
import EmotionViewer from './components/scenes/EmotionViewer';
import BirthdaySurprise from './components/scenes/BirthdaySurprise';
import Admin from './components/admin/Admin';
import './styles/global.css';

const App: React.FC = () => {
  const { phase, selectedScene } = useStore();

  // Check if we're on the admin route
  const isAdmin = window.location.pathname === '/admin';

  if (isAdmin) {
    return <Admin />;
  }

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {phase === 'dark' && <DarkScreen key="dark" />}

        {(phase === 'campfire' || phase === 'emotion') && (
          <CampfireWorld key="campfire" />
        )}

        {phase === 'emotion' && selectedScene && (
          <EmotionViewer key="emotion" scene={selectedScene} />
        )}

        {phase === 'birthday' && <BirthdaySurprise key="birthday" />}
      </AnimatePresence>
    </div>
  );
};

export default App;
