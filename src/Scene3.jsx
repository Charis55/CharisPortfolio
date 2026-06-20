import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Barcode } from 'lucide-react';
import PhoneFrame from './PhoneFrame';

export default function Scene3({ deviceModel }) {
  const [step, setStep] = useState(0); // 0: scanning, 1: card pops out, 2: log meal tapped, 3: confirmation

  useEffect(() => {
    const sequence = [
      setTimeout(() => setStep(1), 2000), // Card pops out after 2s of scanning
      setTimeout(() => setStep(2), 3500), // Button "tapped" after 1.5s
      setTimeout(() => setStep(3), 3800)  // Confirmation overlay triggers
    ];
    return () => sequence.forEach(clearTimeout);
  }, []);

  return (
    <PhoneFrame is3D={false} deviceModel={deviceModel}>
      {/* Viewfinder Background */}
      <div style={{ position: 'absolute', inset: 0, background: '#12121A' }}>
        <div style={{
          position: 'absolute', top: '30%', left: '15%', right: '15%', height: 200,
          border: '2px solid rgba(255, 255, 255, 0.2)', borderRadius: 16,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          overflow: 'hidden'
        }}>
          {/* Abstract Barcode Pattern inside viewfinder */}
          <Barcode size={100} color="rgba(255,255,255,0.4)" strokeWidth={1} />
          
          {/* Sweeping Laser Line */}
          {step === 0 && (
            <div className="laser-scan" style={{
              position: 'absolute', width: '100%', height: 2, background: '#FF0055',
              boxShadow: '0 0 15px #FF0055, 0 0 30px #FF0055'
            }} />
          )}
        </div>
      </div>

      <AnimatePresence>
        {/* Product Card Pop-Out */}
        {step >= 1 && step < 3 && (
          <motion.div 
            initial={{ y: 200, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 200, opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            className="glass-panel"
            style={{
              position: 'absolute', bottom: 40, left: 20, right: 20, padding: 24,
              background: 'rgba(20,20,30,0.95)', border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 20, color: '#FFF' }}>Quest Protein Bar</h3>
                <p style={{ margin: '4px 0 0 0', fontSize: 14, color: '#A0A0B0' }}>Cookies & Cream</p>
              </div>
              <div style={{ background: '#6C63FF', padding: '4px 12px', borderRadius: 20, fontSize: 14, fontWeight: 'bold' }}>
                21g Protein
              </div>
            </div>

            <p style={{ marginTop: 16, fontSize: 10, color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
              Powered by Open Food Facts
            </p>

            <motion.div 
              animate={step === 2 ? { scale: 0.95, background: '#0E9F6E' } : { scale: 1, background: '#10B981' }}
              transition={{ duration: 0.1 }}
              style={{
                marginTop: 20, width: '100%', padding: '16px 0', borderRadius: 12,
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                color: 'white', fontWeight: 'bold', fontSize: 16, cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)'
              }}
            >
              LOG MEAL
            </motion.div>
          </motion.div>
        )}

        {/* Log Confirmation Overlay */}
        {step >= 3 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: 'absolute', inset: 0, background: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(10px)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
            }}
          >
            {/* Vibrant Green Circle */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ type: 'spring', damping: 10, stiffness: 200 }}
              style={{
                width: 120, height: 120, borderRadius: '50%', background: '#10B981',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                boxShadow: '0 0 50px rgba(16, 185, 129, 0.6)'
              }}
            >
              <motion.div
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
              >
                <Check size={64} color="white" strokeWidth={3} />
              </motion.div>
            </motion.div>

            {/* Floating KCAL Text */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: [0, 1, 0], y: -50 }}
              transition={{ delay: 0.6, duration: 2, ease: "easeOut" }}
              style={{
                color: '#10B981', fontSize: '36px', fontWeight: '900', marginTop: 24,
                textShadow: '0 0 20px rgba(16, 185, 129, 0.8)'
              }}
            >
              +450 KCAL
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>
    </PhoneFrame>
  );
}
