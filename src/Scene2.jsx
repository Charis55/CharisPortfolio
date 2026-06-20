import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PhoneFrame from './PhoneFrame';

export default function Scene2({ deviceModel }) {
  const path = "M 50 300 L 150 250 L 200 150 L 250 180 L 300 100 L 350 50";
  const [flicker, setFlicker] = useState(true);

  useEffect(() => {
    const int = setInterval(() => setFlicker(f => !f), 2000);
    return () => clearInterval(int);
  }, []);

  return (
    <PhoneFrame deviceModel={deviceModel} is3D={true}>
      {/* 3D Map Container */}
      <motion.div 
        initial={{ rotateX: 60, rotateZ: -30, scale: 2, y: 100 }}
        animate={{ 
          rotateX: 45, 
          rotateZ: [-30, -28, -32, -30, -25, -28], 
          scale: 1.5,
          y: -50,
          x: -50
        }}
        transition={{ duration: 6, ease: "linear" }}
        style={{
          width: '200%', height: '200%', background: '#0A0A0F',
          position: 'absolute', top: '-50%', left: '-50%',
          backgroundImage: `
            linear-gradient(rgba(108, 99, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108, 99, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transformStyle: 'preserve-3d',
          boxShadow: 'inset 0 0 150px #0A0A0F'
        }}
      >
        <svg style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
          {/* Base Trail (dim) */}
          <path d={path} fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Thick Glowing Purple trail */}
          <motion.path 
            d={path} 
            fill="none" 
            stroke="#6C63FF" 
            strokeWidth="12" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ filter: 'drop-shadow(0 0 20px #6C63FF)' }}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, ease: "easeInOut" }}
          />

          {/* Vibrant Green Neon Dot */}
          <motion.circle 
            r="10" fill="#10B981"
            style={{ filter: 'drop-shadow(0 0 15px #10B981)' }}
            initial={{ cx: 50, cy: 300 }}
            animate={{ 
              cx: [50, 150, 200, 250, 300, 350], 
              cy: [300, 250, 150, 180, 100, 50] 
            }}
            transition={{ duration: 4, ease: "easeInOut" }}
          />
          <motion.circle 
            r="16" fill="rgba(16, 185, 129, 0.3)"
            initial={{ cx: 50, cy: 300 }}
            animate={{ 
              cx: [50, 150, 200, 250, 300, 350], 
              cy: [300, 250, 150, 180, 100, 50],
              scale: [1, 1.5, 1] 
            }}
            transition={{ duration: 4, ease: "easeInOut" }}
          />
        </svg>

        {/* Floating UI Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: -45, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, rotateX: -45, scale: 1 }}
          transition={{ delay: 1, duration: 0.8, type: "spring" }}
          className="glass-panel"
          style={{
            position: 'absolute', top: '150px', left: '220px',
            background: 'rgba(10,10,15,0.85)', padding: '16px 24px', borderRadius: '16px',
            border: '1px solid rgba(108,99,255,0.3)', backdropFilter: 'blur(16px)',
            color: 'white', display: 'flex', gap: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.8), 0 0 30px rgba(108,99,255,0.2)',
            transformStyle: 'preserve-3d',
            transform: 'translateZ(50px)'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '10px', color: '#A0A0B0', fontWeight: '600', letterSpacing: '1px', marginBottom: '4px' }}>PACE</span>
            <motion.span 
              animate={{ opacity: flicker ? 1 : 0.8 }}
              transition={{ duration: 0.1 }}
              className="text-gradient"
              style={{ fontSize: '28px', fontWeight: '900' }}
            >
              4:30
            </motion.span>
          </div>
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '10px', color: '#A0A0B0', fontWeight: '600', letterSpacing: '1px', marginBottom: '4px' }}>DISTANCE</span>
            <motion.span 
              animate={{ opacity: !flicker ? 1 : 0.8 }}
              transition={{ duration: 0.1 }}
              style={{ fontSize: '28px', fontWeight: '900', color: '#FFFFFF' }}
            >
              5.2<span style={{fontSize: '14px', color: '#A0A0B0', marginLeft: '2px'}}>km</span>
            </motion.span>
          </div>
        </motion.div>
      </motion.div>
    </PhoneFrame>
  );
}
