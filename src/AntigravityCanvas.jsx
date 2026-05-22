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
        const spacing = 38; // Spacing between dashes in pixels (optimized grid)
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
            'rgba(41, 151, 255, 0.7)',  // Neon Blue
            'rgba(164, 41, 255, 0.7)',  // Soft Purple
            'rgba(255, 41, 92, 0.7)',   // Hot Pink
            'rgba(41, 255, 151, 0.6)'    // Vibrant Teal/Green
        ];

        const initDashes = () => {
            dashes = [];
            const rect = canvas.getBoundingClientRect();
            const cols = Math.floor(rect.width / spacing) + 2;
            const rows = Math.floor(rect.height / spacing) + 2;

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    // Organic offset similar to Google Antigravity vector field
                    const offsetX = (Math.random() - 0.5) * 10;
                    const offsetY = (Math.random() - 0.5) * 10;
                    
                    const baseX = c * spacing + offsetX;
                    const baseY = r * spacing + offsetY;

                    dashes.push({
                        x: baseX,
                        y: baseY,
                        currentX: baseX,
                        currentY: baseY,
                        angle: Math.random() * Math.PI * 2,
                        color: colors[Math.floor(Math.random() * colors.length)],
                        phase: Math.random() * Math.PI * 2, // Subtle idle breathing
                        speed: 0.015 + Math.random() * 0.02
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
                let targetAngle = dash.angle;
                let targetX = dash.x;
                let targetY = dash.y;

                // Subtle idle float animation when mouse is far or inactive
                dash.phase += dash.speed;
                const idleOffset = Math.sin(dash.phase) * 1.5;
                targetY += idleOffset;

                if (mouse.active) {
                    const dx = mouse.x - dash.x;
                    const dy = mouse.y - dash.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    // Magnetic / Gravitational field radius of 280px
                    const influenceRadius = 280;
                    if (dist < influenceRadius) {
                        // Point towards mouse!
                        targetAngle = Math.atan2(dy, dx);

                        // Calculate linear factor based on distance (stronger closer to mouse)
                        const factor = (influenceRadius - dist) / influenceRadius;
                        
                        // Slightly displace the dash away from mouse (anti-gravity push)
                        const pushStrength = 14 * factor;
                        targetX = dash.x - (dx / dist) * pushStrength;
                        targetY = dash.y - (dy / dist) * pushStrength + idleOffset;
                    } else {
                        // Slowly align back to dynamic horizontal wave
                        targetAngle = Math.sin(dash.phase * 0.15) * 0.15;
                    }
                } else {
                    // Slowly align back to dynamic horizontal wave
                    targetAngle = Math.sin(dash.phase * 0.15) * 0.15;
                }

                // Smoothly interpolate angle with shortest arc rotation
                let diff = targetAngle - dash.angle;
                while (diff < -Math.PI) diff += Math.PI * 2;
                while (diff > Math.PI) diff -= Math.PI * 2;
                dash.angle += diff * 0.1; // Smooth ease-out rotation

                // Smoothly interpolate position (fluid spring ease)
                dash.currentX += (targetX - dash.currentX) * 0.08;
                dash.currentY += (targetY - dash.currentY) * 0.08;

                // Draw dash
                ctx.save();
                ctx.translate(dash.currentX, dash.currentY);
                ctx.rotate(dash.angle);

                // Draw capsule/dash
                ctx.beginPath();
                ctx.fillStyle = dash.color;
                
                // Draw rounded rectangle/capsule
                const x = -dashLength / 2;
                const y = -dashWidth / 2;
                const r = dashWidth / 2;
                
                ctx.arc(x + r, y + r, r, Math.PI / 2, (Math.PI * 3) / 2);
                ctx.lineTo(x + dashLength - r, y);
                ctx.arc(x + dashLength - r, y + r, r, (Math.PI * 3) / 2, Math.PI / 2);
                ctx.lineTo(x + dashLength - r, y + dashWidth);
                ctx.lineTo(x + r, y + dashWidth);
                ctx.closePath();
                ctx.fill();

                ctx.restore();
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
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
                pointerEvents: 'none',
                opacity: 0.65
            }}
        />
    );
};
