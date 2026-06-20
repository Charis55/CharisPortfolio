import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const wordVariants = {
  hidden: { opacity: 0, scale: 4, filter: 'blur(20px)' },
  visible: { 
    opacity: 1, 
    scale: 1, 
    filter: 'blur(0px)',
    transition: { type: 'spring', damping: 14, stiffness: 250, duration: 0.3 }
  },
  exit: { 
    opacity: 0, 
    scale: 1.5, 
    filter: 'blur(10px)', 
    transition: { duration: 0.2, ease: "easeIn" } 
  }
};

const Typography = ({ text }) => (
  <motion.div 
    key={text} 
    variants={wordVariants} 
    initial="hidden" 
    animate="visible" 
    exit="exit"
    style={{ position: 'absolute', zIndex: 10 }}
    className="chromatic-aberration"
  >
    <h1 style={{ 
      color: '#FFFFFF', 
      fontSize: '8rem', 
      fontWeight: 900, 
      textTransform: 'uppercase',
      letterSpacing: '-2px',
      margin: 0
    }}>
      {text}
    </h1>
  </motion.div>
);

const TervisLogo = ({ pulse }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 0.5, 1, 0] }}
    transition={{ duration: 0.5, ease: "linear" }}
    style={{
      position: 'absolute',
      width: 300,
      height: 300,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(108,99,255,0.4) 0%, rgba(10,10,15,0) 70%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
      boxShadow: '0 0 100px rgba(108, 99, 255, 0.8)'
    }}
  >
    {/* Stylized T */}
    <svg width="120" height="120" viewBox="0 0 100 100">
      <motion.path 
        d="M 20 20 L 80 20 L 80 40 L 60 40 L 60 90 L 40 90 L 40 40 L 20 40 Z" 
        fill="#6C63FF"
        initial={{ scale: 0.8 }}
        animate={{ scale: pulse ? [1, 1.1, 1] : 1 }}
        transition={{ duration: 0.2 }}
      />
    </svg>
  </motion.div>
);

export default function Scene1() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Timing sequence for snap-zooms
    const sequence = [
      setTimeout(() => setStep(1), 500),   // MOVE.
      setTimeout(() => setStep(2), 1500),  // Logo flicker
      setTimeout(() => setStep(3), 2000),  // LOG.
      setTimeout(() => setStep(4), 3000),  // Logo flicker
      setTimeout(() => setStep(5), 3500),  // COMPETE.
      setTimeout(() => setStep(6), 4500),  // Final ambient logo
    ];
    return () => sequence.forEach(clearTimeout);
  }, []);


  return (
    <div style={{
      width: '100%', height: '100%', background: '#0A0A0F', 
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      position: 'relative', overflow: 'hidden'
    }}>
      <AnimatePresence mode="wait">
        {step === 1 && <Typography text="MOVE." />}
        {step === 2 && <TervisLogo pulse={true} />}
        {step === 3 && <Typography text="LOG." />}
        {step === 4 && <TervisLogo pulse={true} />}
        {step === 5 && <Typography text="COMPETE." />}
        {step === 6 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ position: 'absolute', zIndex: 1 }}
          >
            <div style={{
              width: 400, height: 400, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(108,99,255,0.2) 0%, rgba(10,10,15,0) 70%)',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              boxShadow: '0 0 150px rgba(108, 99, 255, 0.6)'
            }}>
              <svg width="150" height="150" viewBox="0 0 100 100">
                <path d="M 20 20 L 80 20 L 80 40 L 60 40 L 60 90 L 40 90 L 40 40 L 20 40 Z" fill="#6C63FF" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
