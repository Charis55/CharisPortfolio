import React, { useEffect, useState } from 'react';
import { Navbar, Hero, About, Experience, Skills, Education, Projects, Footer } from './components';

function App() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    // Active section observer
    const sectionElements = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveSection(entry.target.id);
            }
        });
    }, { threshold: 0.3 });

    sectionElements.forEach(el => sectionObserver.observe(el));
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // Parallax effect on hero background glows
    const handleScroll = () => {
        const scrolled = window.scrollY;
        const glows = document.querySelectorAll('.glow');
        
        glows.forEach((glow, index) => {
            const speed = (index + 1) * 0.1;
            if (index === 2) {
                glow.style.transform = `translate(-50%, calc(-50% + ${scrolled * speed * 0.5}px))`;
            } else {
                glow.style.transform = `translateY(${scrolled * speed}px)`;
            }
        });

        // Rotate timeline wheel and fill track
        const wheel = document.getElementById('timeline-wheel');
        const track = document.getElementById('timeline-track');
        const fill = document.getElementById('timeline-fill');
        
        if (wheel && track && fill) {
            // Rotate wheel
            wheel.style.transform = `rotate(${scrolled * 0.5}deg)`;
            
            // Calculate fill height based on wheel position inside track
            const trackRect = track.getBoundingClientRect();
            const wheelRect = wheel.getBoundingClientRect();
            
            let fillHeight = wheelRect.top - trackRect.top + (wheelRect.height / 2);
            
            if (fillHeight < 0) fillHeight = 0;
            if (fillHeight > trackRect.height) fillHeight = trackRect.height;
            
            fill.style.height = `${fillHeight}px`;
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealElements.forEach(el => revealOnScroll.unobserve(el));
    };
  }, []);

  return (
    <>
      <Navbar activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Projects />
      </main>
      <Footer />
    </>
  );
}

export default App;
