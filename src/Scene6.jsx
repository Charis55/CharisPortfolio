import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Scene6() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = [
      setTimeout(() => setStep(1), 1000), // TERVIS appears
      setTimeout(() => setStep(2), 2500), // Green dot pulses
      setTimeout(() => setStep(3), 3500)  // Available on play store + fade
    ];
    return () => sequence.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ scale: 1.2, background: '#1A0A2A' }} // Purple reflection
      animate={step >= 3 ? { scale: 1, background: '#02020A' } : { scale: 1.2, background: '#1A0A2A' }} // Zoom out to midnight blue
      transition={{ duration: 3, ease: "easeOut" }}
      style={{
        width: '100%', height: '100%', 
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        position: 'relative', overflow: 'hidden'
      }}
    >
      {/* Purple Volumetric Glow */}
      <motion.div
        animate={step >= 3 ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 2 }}
        className="volumetric-rays"
      />

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
        
        {/* Massive Brand Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={step >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: '8vw', // massive
            letterSpacing: '4vw', // heavy letter spacing
            color: 'white',
            margin: 0,
            paddingLeft: '4vw', // Balance out the letter spacing on the right
            textShadow: '0 0 40px rgba(108, 99, 255, 0.8)'
          }}
        >
          TERVIS
        </motion.h1>

        {/* Green Start Dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={step >= 2 ? { scale: [0, 1.5, 1], opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            width: 24, height: 24, borderRadius: '50%', background: '#10B981',
            boxShadow: '0 0 30px #10B981',
            marginTop: 40
          }}
        />

        {/* Play Store CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={step >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            marginTop: 60,
            fontSize: 16,
            color: '#A0A0B0',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}
        >
          Available now on the Play Store.
        </motion.div>
      </div>

    </motion.div>
  );
}
