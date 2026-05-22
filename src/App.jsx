import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar, Hero, About, Experience, Skills, Education, Projects } from './components';
import { BackgroundGraphics } from './BackgroundGraphics';
import { AntigravityCanvas } from './AntigravityCanvas';

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

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isScrolling.current) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (activeIndex < sections.length - 1) {
          isScrolling.current = true;
          setDirection(1);
          setActiveIndex(prev => prev + 1);
          setTimeout(() => { isScrolling.current = false }, 600);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (activeIndex > 0) {
          isScrolling.current = true;
          setDirection(-1);
          setActiveIndex(prev => prev - 1);
          setTimeout(() => { isScrolling.current = false }, 1000);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  useEffect(() => {
    const handleWheel = (e) => {
      // Don't intercept scroll if scrolling quickly or inside transitions
      if (isScrolling.current) return;
      
      const activeSectionEl = document.getElementById(sections[activeIndex].id);
      let isScrollable = false;
      if (activeSectionEl) {
          // Check if section actually needs internal scrolling
          const overflowY = window.getComputedStyle(activeSectionEl).overflowY;
          isScrollable = (overflowY === 'auto' || overflowY === 'scroll') && 
                               activeSectionEl.scrollHeight > activeSectionEl.clientHeight + 5;
          
          if (isScrollable) {
              const isAtTop = activeSectionEl.scrollTop <= 5;
              const isAtBottom = Math.abs(activeSectionEl.scrollHeight - activeSectionEl.scrollTop - activeSectionEl.clientHeight) <= 5;
              
              // If user is trying to scroll down but has not reached the bottom yet, let native scroll work
              if (e.deltaY > 0 && !isAtBottom) return; 
              // If user is trying to scroll up but has not reached the top yet, let native scroll work
              if (e.deltaY < 0 && !isAtTop) return;
          }
      }

      // Wheel threshold to trigger full page morphing slide transition
      // Use moderate threshold (12) for scrollable sections at boundary limits to prevent premature transitions
      const threshold = isScrollable ? 12 : 3;
      if (e.deltaY > threshold) {
        if (activeIndex < sections.length - 1) {
          isScrolling.current = true;
          setDirection(1);
          setActiveIndex(prev => prev + 1);
          setTimeout(() => { isScrolling.current = false }, 600); 
        }
      } else if (e.deltaY < -threshold) {
        if (activeIndex > 0) {
          isScrolling.current = true;
          setDirection(-1);
          setActiveIndex(prev => prev - 1);
          setTimeout(() => { isScrolling.current = false }, 600);
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
            const overflowY = window.getComputedStyle(activeSectionEl).overflowY;
            const isScrollable = (overflowY === 'auto' || overflowY === 'scroll') && 
                                 activeSectionEl.scrollHeight > activeSectionEl.clientHeight + 5;
            if (isScrollable) {
                const isAtTop = activeSectionEl.scrollTop <= 5;
                const isAtBottom = Math.abs(activeSectionEl.scrollHeight - activeSectionEl.scrollTop - activeSectionEl.clientHeight) <= 5;
                
                if (deltaY > 0 && !isAtBottom) return;
                if (deltaY < 0 && !isAtTop) return;
            }
        }

        // Swiping gesture threshold
        if (deltaY > 40) {
            if (activeIndex < sections.length - 1) {
              isScrolling.current = true;
              setDirection(1);
              setActiveIndex(prev => prev + 1);
              setTimeout(() => { isScrolling.current = false }, 600);
            }
        } else if (deltaY < -40) {
            if (activeIndex > 0) {
              isScrolling.current = true;
              setDirection(-1);
              setActiveIndex(prev => prev - 1);
              setTimeout(() => { isScrolling.current = false }, 600);
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

  // Activate reveal effects whenever section transitions complete or mount
  useEffect(() => {
    const activeSectionId = sections[activeIndex].id;
    // Brief delay to allow DOM mounting after transition triggers
    const timer = setTimeout(() => {
      const activeEl = document.getElementById(activeSectionId);
      if (activeEl) {
        const revealEls = activeEl.querySelectorAll('.reveal, .morph-scale, .morph-left, .morph-right');
        revealEls.forEach(el => {
          el.classList.add('active');
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  // Keynote spring variants (Apple stack effect)
  const slideVariants = {
    enter: (direction) => ({
      y: direction > 0 ? '100%' : '-100%',
      scale: 0.95,
      opacity: 0,
      filter: 'blur(12px)'
    }),
    center: {
      zIndex: 1,
      y: 0,
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        y: { type: "spring", stiffness: 320, damping: 32 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.6, ease: "easeOut" },
        filter: { duration: 0.5 }
      }
    },
    exit: (direction) => ({
      zIndex: 0,
      y: direction < 0 ? '40%' : '-40%',
      scale: 0.92,
      opacity: 0,
      filter: 'blur(10px)',
      transition: {
        y: { type: "spring", stiffness: 320, damping: 32 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.6, ease: "easeIn" },
        filter: { duration: 0.4 }
      }
    })
  };

  const ActiveComponent = sections[activeIndex].Component;

  const handleNavigate = useCallback((id) => {
    const idx = sections.findIndex(s => s.id === id);
    if (idx !== -1 && idx !== activeIndex) {
        setDirection(idx > activeIndex ? 1 : -1);
        setActiveIndex(idx);
    }
  }, [activeIndex]);

  return (
    <>
      <BackgroundGraphics activeIndex={activeIndex} />
      <AntigravityCanvas />
      <Navbar 
        activeSection={sections[activeIndex].id} 
        onNavigate={handleNavigate} 
      />
      <div className="slideshow-container">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ position: 'absolute', width: '100%', height: '100%' }}
            >
              <ActiveComponent onNavigate={handleNavigate} />
            </motion.div>
          </AnimatePresence>
      </div>
    </>
  );
}

export default App;
