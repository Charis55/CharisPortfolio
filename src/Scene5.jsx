import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PhoneFrame from './PhoneFrame';
import { MessageCircle, Trophy } from 'lucide-react';

export default function Scene5({ deviceModel }) {
  const [step, setStep] = useState(0); 
  // 0: scrolling cards
  // 1: 6AMERS clicked and expanding
  // 2: Chat active
  // 3: Shift to leaderboard
  // 4: Charis takes #1

  useEffect(() => {
    const sequence = [
      setTimeout(() => setStep(1), 1500), // Click 6AMERS
      setTimeout(() => setStep(2), 2000), // Chat bubbles fly in
      setTimeout(() => setStep(3), 4000), // Shift to Leaderboard
      setTimeout(() => setStep(4), 5000)  // Charis goes to #1
    ];
    return () => sequence.forEach(clearTimeout);
  }, []);

  return (
    <PhoneFrame is3D={false} deviceModel={deviceModel}>
      <div style={{ width: '100%', height: '100%', background: '#0A0A0F', position: 'relative', overflow: 'hidden' }}>
        
        {/* Phase 1 & 2: Club Cards & Chat */}
        <AnimatePresence>
          {step < 3 && (
            <motion.div 
              key="clubs"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              style={{ width: '100%', height: '100%', position: 'absolute' }}
            >
              {/* Header */}
              <div style={{ padding: '40px 20px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0, color: 'white', fontSize: 24 }}>Clubs</h2>
                <MessageCircle color="white" />
              </div>

              {/* Horizontal Scroll Cards */}
              {step === 0 && (
                <motion.div 
                  initial={{ x: 200 }}
                  animate={{ x: -100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  style={{ display: 'flex', gap: 20, padding: '0 20px' }}
                >
                  <div className="glass-panel" style={{ minWidth: 200, height: 250, padding: 20 }}>
                    <h3 style={{ color: 'white' }}>Night Runners</h3>
                  </div>
                  <motion.div 
                    whileTap={{ scale: 0.95 }}
                    className="glass-panel glow-shadow" 
                    style={{ minWidth: 200, height: 250, padding: 20, background: 'rgba(108, 99, 255, 0.2)', border: '1px solid #6C63FF' }}
                  >
                    <h3 style={{ color: 'white' }}>6AMERS</h3>
                    <p style={{ color: '#A0A0B0', fontSize: 12 }}>342 Members</p>
                  </motion.div>
                  <div className="glass-panel" style={{ minWidth: 200, height: 250, padding: 20 }}>
                    <h3 style={{ color: 'white' }}>Weekend Warriors</h3>
                  </div>
                </motion.div>
              )}

              {/* Expanded Chat Interface */}
              {step >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 100, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", damping: 20, stiffness: 100 }}
                  style={{
                    position: 'absolute', inset: 0, background: '#12121A', zIndex: 10,
                    display: 'flex', flexDirection: 'column'
                  }}
                >
                  <div style={{ padding: '40px 20px 20px', background: 'rgba(108, 99, 255, 0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <h2 style={{ margin: 0, color: '#6C63FF' }}>6AMERS</h2>
                    <p style={{ margin: 0, color: '#A0A0B0', fontSize: 12 }}>Live Chat</p>
                  </div>
                  
                  <div style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'flex-end', paddingBottom: 40 }}>
                    {step >= 2 && (
                      <>
                        <motion.div 
                          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
                          style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '16px 16px 16px 0', maxWidth: '80%' }}
                        >
                          <div style={{ fontSize: 10, color: '#A0A0B0', marginBottom: 4 }}>Elvis</div>
                          <div style={{ color: 'white', fontSize: 14 }}>Just crushed my 10k! Who's next? 🔥</div>
                        </motion.div>
                        <motion.div 
                          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                          style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '16px 16px 16px 0', maxWidth: '80%' }}
                        >
                          <div style={{ fontSize: 10, color: '#A0A0B0', marginBottom: 4 }}>Anthony</div>
                          <div style={{ color: 'white', fontSize: 14 }}>Loading... watch the leaderboard.</div>
                        </motion.div>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Phase 3 & 4: Leaderboard */}
          {step >= 3 && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={{ width: '100%', height: '100%', position: 'absolute', padding: '40px 20px 20px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 30 }}>
                <Trophy color="#FFD700" />
                <h2 style={{ margin: 0, color: 'white' }}>Leaderboard</h2>
              </div>

              <div style={{ position: 'relative', height: 300 }}>
                {/* User 2 (Gets displaced) */}
                <motion.div
                  animate={step >= 4 ? { y: 80, scale: 0.95, opacity: 0.7 } : { y: 0, scale: 1, opacity: 1 }}
                  transition={{ type: "spring", damping: 15, stiffness: 100 }}
                  className="glass-panel"
                  style={{ position: 'absolute', top: 0, width: '100%', padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
                    <div style={{ fontSize: 24, fontWeight: 'bold', color: '#A0A0B0' }}>#1</div>
                    <div>
                      <div style={{ color: 'white', fontWeight: 'bold' }}>Marcus</div>
                      <div style={{ color: '#A0A0B0', fontSize: 12 }}>12,450 XP</div>
                    </div>
                  </div>
                </motion.div>

                {/* Charis (Takes #1) */}
                <motion.div
                  initial={{ y: 80 }}
                  animate={step >= 4 ? { y: 0 } : { y: 80 }}
                  transition={{ type: "spring", damping: 15, stiffness: 100 }}
                  className="glass-panel"
                  style={{ 
                    position: 'absolute', top: 0, width: '100%', padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: step >= 4 ? 'rgba(108, 99, 255, 0.2)' : 'var(--glass-bg)',
                    border: step >= 4 ? '1px solid #6C63FF' : '1px solid var(--glass-border)',
                    zIndex: 10
                  }}
                >
                  <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
                    <motion.div 
                      animate={step >= 4 ? { color: '#FFD700' } : { color: '#A0A0B0' }}
                      style={{ fontSize: 24, fontWeight: 'bold' }}
                    >
                      {step >= 4 ? '#1' : '#2'}
                    </motion.div>
                    <div>
                      <div style={{ color: 'white', fontWeight: 'bold' }}>Charis</div>
                      <div style={{ color: '#10B981', fontSize: 12 }}>12,600 XP</div>
                    </div>
                  </div>
                  {/* Reputation Badge */}
                  {step >= 4 && (
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', damping: 10, delay: 0.3 }}
                      style={{
                        width: 30, height: 30, background: '#FFD700', borderRadius: '50%',
                        boxShadow: '0 0 20px #FFD700', display: 'flex', justifyContent: 'center', alignItems: 'center'
                      }}
                    >
                      <Trophy size={16} color="#0A0A0F" />
                    </motion.div>
                  )}
                </motion.div>

                {/* User 3 */}
                <motion.div
                  animate={step >= 4 ? { y: 160 } : { y: 160 }}
                  className="glass-panel"
                  style={{ position: 'absolute', top: 0, width: '100%', padding: 20, opacity: 0.5 }}
                >
                  <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
                    <div style={{ fontSize: 24, fontWeight: 'bold', color: '#A0A0B0' }}>#3</div>
                    <div>
                      <div style={{ color: 'white', fontWeight: 'bold' }}>Sarah</div>
                      <div style={{ color: '#A0A0B0', fontSize: 12 }}>11,200 XP</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PhoneFrame>
  );
}
