import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundGraphics = ({ activeIndex }) => {
  // Define color palettes or positions for different sections to make it dynamic
  const variants1 = {
    hero: { x: '-10vw', y: '-10vh', scale: 1, backgroundColor: '#2997ff' },
    about: { x: '50vw', y: '20vh', scale: 1.5, backgroundColor: '#ff295c' },
    experience: { x: '10vw', y: '60vh', scale: 1.2, backgroundColor: '#a429ff' },
    skills: { x: '60vw', y: '-10vh', scale: 0.8, backgroundColor: '#29ff97' },
    education: { x: '-20vw', y: '40vh', scale: 1.4, backgroundColor: '#ff9729' },
    projects: { x: '40vw', y: '50vh', scale: 1, backgroundColor: '#2997ff' }
  };

  const variants2 = {
    hero: { x: '70vw', y: '60vh', scale: 1.2, backgroundColor: '#a429ff' },
    about: { x: '-20vw', y: '80vh', scale: 0.9, backgroundColor: '#2997ff' },
    experience: { x: '70vw', y: '-20vh', scale: 1.5, backgroundColor: '#ff295c' },
    skills: { x: '-10vw', y: '50vh', scale: 1.1, backgroundColor: '#ff9729' },
    education: { x: '60vw', y: '70vh', scale: 1.3, backgroundColor: '#29ff97' },
    projects: { x: '-30vw', y: '10vh', scale: 0.8, backgroundColor: '#a429ff' }
  };

  const sectionKeys = ['hero', 'about', 'experience', 'skills', 'education', 'projects'];
  const currentKey = sectionKeys[activeIndex] || 'hero';

  return (
    <div className="background-graphics-container">
      <motion.div
        className="bg-blob blob-1"
        variants={variants1}
        animate={currentKey}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <motion.div
        className="bg-blob blob-2"
        variants={variants2}
        animate={currentKey}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />
      <div className="bg-overlay-noise"></div>
    </div>
  );
};
