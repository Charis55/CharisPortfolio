import React from 'react';
import { motion } from 'framer-motion';

export default function PhoneFrame({ children, is3D = false, deviceModel = 'iphone' }) {
  const isGalaxy = deviceModel === 'galaxy';

  return (
    <motion.div
      initial={is3D ? { rotateX: 0, rotateY: 0, scale: 0.8 } : { opacity: 0, scale: 0.95 }}
      animate={is3D ? { rotateX: 45, rotateZ: -15, rotateY: 15, scale: 1 } : { opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="glass-panel glow-shadow"
      style={{
        width: isGalaxy ? 385 : 375,
        height: isGalaxy ? 832 : 812,
        borderRadius: isGalaxy ? 12 : 48,
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(108, 99, 255, 0.3)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(108, 99, 255, 0.2)'
      }}
    >
      {/* Notch / Camera Hole */}
      <div style={{
        position: 'absolute',
        top: isGalaxy ? 12 : 10,
        left: '50%',
        transform: 'translateX(-50%)',
        width: isGalaxy ? 14 : 110,
        height: isGalaxy ? 14 : 32,
        backgroundColor: '#0A0A0F',
        borderRadius: isGalaxy ? '50%' : 16,
        zIndex: 50,
        border: isGalaxy ? '1px solid rgba(255,255,255,0.05)' : 'none',
        boxShadow: isGalaxy ? 'inset 0 2px 4px rgba(0,0,0,0.8)' : 'none'
      }} />
      
      {/* Content Area */}
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        {children}
      </div>
    </motion.div>
  );
}
