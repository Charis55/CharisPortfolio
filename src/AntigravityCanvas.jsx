import React, { useEffect, useRef } from 'react';

export const AntigravityCanvas = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000, active: false });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId;
        let dashes = [];
        const spacing = 35; // Dense grid spacing for high-density reactive field
        const dashLength = 14;
        const dashWidth = 3;

        const resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            initDashes();
        };

        const colors = [
            'rgba(41, 151, 255, 0.8)',  // Neon Blue
            'rgba(164, 41, 255, 0.8)',  // Soft Purple
            'rgba(255, 41, 92, 0.8)',   // Hot Pink
            'rgba(41, 255, 151, 0.7)'    // Vibrant Teal/Green
        ];

        const initDashes = () => {
            dashes = [];
            const rect = canvas.getBoundingClientRect();
            const cols = Math.floor(rect.width / spacing) + 2;
            const rows = Math.floor(rect.height / spacing) + 2;

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    // Organic offset similar to Google Antigravity vector field
                    const offsetX = (Math.random() - 0.5) * 8;
                    const offsetY = (Math.random() - 0.5) * 8;
                    
                    const baseX = c * spacing + offsetX;
                    const baseY = r * spacing + offsetY;
                    // Stationary base angle (horizontal with slight organic variation)
                    const baseAngle = (Math.random() - 0.5) * 0.15;

                    dashes.push({
                        x: baseX,
                        y: baseY,
                        currentX: baseX,
                        currentY: baseY,
                        baseAngle: baseAngle,
                        angle: baseAngle,
                        color: colors[Math.floor(Math.random() * colors.length)],
                        phase: Math.random() * Math.PI * 2, // Pulse phase offset
                        pulseSpeed: 0.05 + Math.random() * 0.05,
                        currentOpacity: 0 // Invisible by default until cursor approaches
                    });
                }
            }
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                active: true
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current.active = false;
        };

        // Resize observer to ensure high responsiveness on window resize
        const resizeObserver = new ResizeObserver(() => {
            resizeCanvas();
        });
        resizeObserver.observe(canvas);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        // High-performance animation loop
        const render = () => {
            const rect = canvas.getBoundingClientRect();
            ctx.clearRect(0, 0, rect.width, rect.height);

            const mouse = mouseRef.current;

            dashes.forEach((dash) => {
                let targetAngle = dash.baseAngle;
                let targetX = dash.x;
                let targetY = dash.y;
                let targetOpacity = 0; // Complete silence/invisibility when cursor is far

                if (mouse.active) {
                    const dx = mouse.x - dash.x;
                    const dy = mouse.y - dash.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    // Magnetic / Gravitational field radius of 260px
                    const influenceRadius = 260;
                    if (dist < influenceRadius) {
                        // Point towards mouse!
                        targetAngle = Math.atan2(dy, dx);

                        // Calculate linear factor based on distance (stronger closer to mouse)
                        const factor = (influenceRadius - dist) / influenceRadius;
                        
                        // Fade in proportionally
                        targetOpacity = factor;

                        // Slide towards mouse/away from mouse (dynamic anti-gravity fluid bubble)
                        const pushStrength = 15 * factor;
                        targetX = dash.x - (dx / dist) * pushStrength;
                        targetY = dash.y - (dy / dist) * pushStrength;
                        
                        // Run pulsing animation phase when active
                        dash.phase += dash.pulseSpeed;
                    }
                }

                // Easing current opacity towards target
                dash.currentOpacity += (targetOpacity - dash.currentOpacity) * 0.12;

                // Only perform drawing & math calculation if the dash is visible to conserve CPU/GPU
                if (dash.currentOpacity > 0.005) {
                    // Easing target angle
                    let diff = targetAngle - dash.angle;
                    while (diff < -Math.PI) diff += Math.PI * 2;
                    while (diff > Math.PI) diff -= Math.PI * 2;
                    dash.angle += diff * 0.12; // Easing rotation

                    // Easing positions
                    dash.currentX += (targetX - dash.currentX) * 0.1;
                    dash.currentY += (targetY - dash.currentY) * 0.1;

                    // Calculate pulse amplitude (pulsing opacity + size)
                    const pulse = 0.65 + 0.35 * Math.sin(dash.phase);
                    const scalePulse = 0.85 + 0.15 * Math.sin(dash.phase);

                    // Draw dash
                    ctx.save();
                    ctx.translate(dash.currentX, dash.currentY);
                    ctx.rotate(dash.angle);

                    // Apply transparency and pulsing factor
                    ctx.globalAlpha = dash.currentOpacity * pulse;

                    // Draw capsule/dash
                    ctx.beginPath();
                    ctx.fillStyle = dash.color;
                    
                    // Draw rounded rectangle/capsule with dynamic scale pulsing
                    const activeLength = dashLength * scalePulse;
                    const activeWidth = dashWidth * scalePulse;

                    const x = -activeLength / 2;
                    const y = -activeWidth / 2;
                    const r = activeWidth / 2;
                    
                    ctx.arc(x + r, y + r, r, Math.PI / 2, (Math.PI * 3) / 2);
                    ctx.lineTo(x + activeLength - r, y);
                    ctx.arc(x + activeLength - r, y + r, r, (Math.PI * 3) / 2, Math.PI / 2);
                    ctx.lineTo(x + activeLength - r, y + activeWidth);
                    ctx.lineTo(x + r, y + activeWidth);
                    ctx.closePath();
                    ctx.fill();

                    ctx.restore();
                } else {
                    // Reset positions & angles when invisible to prevent drifting
                    dash.currentX = dash.x;
                    dash.currentY = dash.y;
                    dash.angle = dash.baseAngle;
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        // Initialize and start
        resizeCanvas();
        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 2,
                pointerEvents: 'none',
                opacity: 0.9
            }}
        />
    );
};
