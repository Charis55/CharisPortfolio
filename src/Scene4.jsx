import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import PhoneFrame from './PhoneFrame';

// Helper component for odometer-style counter
function StepCounter({ target, duration }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => Math.round(latest).toLocaleString());

  useEffect(() => {
    const controls = animate(count, target, { duration: duration, ease: "easeOut" });
    return controls.stop;
  }, []);

  return <motion.span>{rounded}</motion.span>;
}

const particles = [...Array(30)].map((_, i) => {
  const angle = (i / 30) * Math.PI * 2;
  const distance = 80 + Math.random() * 100;
  const scaleMax = Math.random() * 1.5 + 0.5;
  return { angle, distance, scaleMax, id: i };
});

function Particles() {

  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0 }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
          animate={{ 
            x: Math.cos(p.angle) * p.distance, 
            y: Math.sin(p.angle) * p.distance,
            scale: [0, p.scaleMax, 0],
            opacity: [1, 1, 0]
          }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            position: 'absolute',
            width: 6, height: 6,
            background: '#FFD700',
            borderRadius: '50%',
            boxShadow: '0 0 10px #FFD700'
          }}
        />
      ))}
    </div>
  );
}

export default function Scene4({ deviceModel }) {
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    // Trigger explosion when step counter finishes (duration: 2s)
    const timeout = setTimeout(() => setShowParticles(true), 2000);
    return () => clearTimeout(timeout);
  }, []);

  const rings = [
    { color: '#FF6B6B', radius: 80, stroke: 16 }, // Coral
    { color: '#6C63FF', radius: 60, stroke: 16 }, // Purple
    { color: '#00E5FF', radius: 40, stroke: 16 }, // Teal
  ];

  // Random graph heights
  const graphBars = [0.4, 0.7, 0.5, 0.9, 0.6, 1.0, 0.8];

  return (
    <PhoneFrame is3D={false} deviceModel={deviceModel}>
      <div style={{ width: '100%', height: '100%', background: '#0A0A0F', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Activity Rings */}
        <div style={{ position: 'relative', width: 200, height: 200 }}>
          <svg width="200" height="200" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)' }}>
            {rings.map((ring, i) => (
              <g key={i}>
                {/* Background Track */}
                <circle
                  cx="100" cy="100" r={ring.radius}
                  fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={ring.stroke}
                />
                {/* Animated Fill */}
                <motion.circle
                  cx="100" cy="100" r={ring.radius}
                  fill="none" stroke={ring.color} strokeWidth={ring.stroke}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: i * 0.2, ease: "easeInOut" }}
                  style={{ filter: `drop-shadow(0 0 8px ${ring.color})` }}
                />
              </g>
            ))}
          </svg>
          
          {/* Inner Text */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} style={{ fontSize: 12, color: '#A0A0B0', fontWeight: 'bold' }}>
              TODAY
            </motion.div>
          </div>
        </div>

        {/* Step Counter */}
        <div style={{ marginTop: 40, textAlign: 'center', position: 'relative' }}>
          <div style={{ fontSize: 14, color: '#A0A0B0', marginBottom: 8, letterSpacing: 2 }}>DAILY STEPS</div>
          <div style={{ fontSize: 48, fontWeight: 900, color: 'white', textShadow: '0 0 20px rgba(255,255,255,0.5)' }}>
            <StepCounter target={10000} duration={2} />
          </div>

          {/* Golden Particle Explosion */}
          {showParticles && <Particles />}
        </div>

        {/* Weekly Load Graph */}
        <div style={{ marginTop: 50, width: '100%' }}>
          <div style={{ fontSize: 12, color: '#A0A0B0', marginBottom: 16, letterSpacing: 1 }}>WEEKLY LOAD</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: 100, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            {graphBars.map((height, i) => (
              <div key={i} style={{ width: 20, height: '100%', display: 'flex', alignItems: 'flex-end', position: 'relative' }}>
                {/* Bouncing Audio Bar */}
                <motion.div
                  className="audio-bar"
                  style={{
                    width: '100%',
                    height: `${height * 100}%`,
                    background: i === 5 ? '#10B981' : '#6C63FF', // Highlight one bar
                    borderRadius: '4px 4px 0 0',
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, color: '#A0A0B0', fontSize: 10 }}>
            <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span style={{color: 'white', fontWeight: 'bold'}}>S</span><span>S</span>
          </div>
        </div>

      </div>
    </PhoneFrame>
  );
}
