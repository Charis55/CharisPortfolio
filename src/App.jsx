import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar, Hero, About, Experience, Skills, Education, Projects, Footer } from './components';
import { BackgroundGraphics } from './BackgroundGraphics';

const sections = [
  { id: 'hero', Component: Hero },
  { id: 'about', Component: About },
  { id: 'experience', Component: Experience },
  { id: 'skills', Component: Skills },
  { id: 'education', Component: Education },
  { id: 'projects', Component: Projects }
];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for down, -1 for up
  const isScrolling = useRef(false);

  useEffect(() => {
    const handleWheel = (e) => {
      if (isScrolling.current) return;
      
      const activeSectionEl = document.getElementById(sections[activeIndex].id);
      if (activeSectionEl) {
          const isAtTop = activeSectionEl.scrollTop === 0;
          const isAtBottom = activeSectionEl.scrollHeight - activeSectionEl.scrollTop <= activeSectionEl.clientHeight + 2;
          
          if (e.deltaY > 0 && !isAtBottom) return; 
          if (e.deltaY < 0 && !isAtTop) return;    
      }

      if (e.deltaY > 15) {
        if (activeIndex < sections.length - 1) {
          isScrolling.current = true;
          setDirection(1);
          setActiveIndex(prev => prev + 1);
          setTimeout(() => { isScrolling.current = false }, 1200); 
        }
      } else if (e.deltaY < -15) {
        if (activeIndex > 0) {
          isScrolling.current = true;
          setDirection(-1);
          setActiveIndex(prev => prev - 1);
          setTimeout(() => { isScrolling.current = false }, 1200);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    
    let touchStartY = 0;
    const handleTouchStart = (e) => {
        touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e) => {
        if (isScrolling.current) return;
        const touchEndY = e.touches[0].clientY;
        const deltaY = touchStartY - touchEndY;
        
        const activeSectionEl = document.getElementById(sections[activeIndex].id);
        if (activeSectionEl) {
            const isAtTop = activeSectionEl.scrollTop === 0;
            const isAtBottom = activeSectionEl.scrollHeight - activeSectionEl.scrollTop <= activeSectionEl.clientHeight + 2;
            
            if (deltaY > 0 && !isAtBottom) return;
            if (deltaY < 0 && !isAtTop) return;
        }

        if (deltaY > 30) {
            if (activeIndex < sections.length - 1) {
              isScrolling.current = true;
              setDirection(1);
              setActiveIndex(prev => prev + 1);
              setTimeout(() => { isScrolling.current = false }, 1200);
            }
        } else if (deltaY < -30) {
            if (activeIndex > 0) {
              isScrolling.current = true;
              setDirection(-1);
              setActiveIndex(prev => prev - 1);
              setTimeout(() => { isScrolling.current = false }, 1200);
            }
        }
    };
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [activeIndex]);

  const slideVariants = {
    enter: (direction) => ({
      y: direction > 0 ? '100vh' : '-100vh',
      scale: 0.9,
      opacity: 0,
      filter: 'blur(10px)'
    }),
    center: {
      zIndex: 1,
      y: 0,
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        y: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.6, ease: "easeOut" },
        filter: { duration: 0.4 }
      }
    },
    exit: (direction) => ({
      zIndex: 0,
      y: direction < 0 ? '100vh' : '-100vh',
      scale: 0.9,
      opacity: 0,
      filter: 'blur(10px)',
      transition: {
        y: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.6, ease: "easeIn" },
        filter: { duration: 0.4 }
      }
    })
  };

  const ActiveComponent = sections[activeIndex].Component;

  return (
    <>
      <BackgroundGraphics activeIndex={activeIndex} />
      <Navbar 
        activeSection={sections[activeIndex].id} 
        onNavigate={(id) => {
          const idx = sections.findIndex(s => s.id === id);
          if (idx !== -1 && idx !== activeIndex) {
              setDirection(idx > activeIndex ? 1 : -1);
              setActiveIndex(idx);
          }
        }} 
      />
      <div className="slideshow-container">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ position: 'absolute', width: '100%', height: '100%' }}
            >
              <ActiveComponent />
              {activeIndex === sections.length - 1 && <Footer />}
            </motion.div>
          </AnimatePresence>
      </div>
    </>
  );
}

export default App;
