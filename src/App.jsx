import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Scene1 from './Scene1';
import Scene2 from './Scene2';
import Scene3 from './Scene3';
import Scene4 from './Scene4';
import Scene5 from './Scene5';
import Scene6 from './Scene6';

const scenes = [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6];

function App() {
  const [currentScene, setCurrentScene] = useState(0);
  const deviceModel = currentScene % 2 === 0 ? 'iphone' : 'galaxy';

  const handleNextScene = (e) => {
    if (currentScene < scenes.length - 1) {
      setCurrentScene(prev => prev + 1);
    }
  };

  const handlePrevScene = (e) => {
    e.preventDefault();
    if (currentScene > 0) {
      setCurrentScene(prev => prev - 1);
    }
  };

  const CurrentComponent = scenes[currentScene];

  return (
    <div 
      className="app-container" 
      onClick={handleNextScene}
      onContextMenu={handlePrevScene}
      style={{ 
        width: '100%', 
        height: '100%', 
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        perspective: '1000px',
        background: '#0A0A0F'
      }}
    >
      <div style={{ zIndex: 10, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <AnimatePresence mode="wait">
          <CurrentComponent key={currentScene} deviceModel={deviceModel} />
        </AnimatePresence>
      </div>

      <div style={{ position: 'absolute', bottom: 20, right: 20, color: 'rgba(255,255,255,0.2)', fontSize: '12px', zIndex: 50 }}>
        Scene {currentScene + 1}/{scenes.length} - Left Click: Next | Right Click: Prev
      </div>
    </div>
  );
}

export default App;
