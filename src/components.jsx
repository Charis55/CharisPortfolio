import React from 'react';

export const Navbar = ({ activeSection }) => {
    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    };

    return (
        <nav className="navbar glass">
            <div className="nav-content">
                <span className="logo">Charis</span>
                <ul className="nav-links">
                    <li><a href="#about" className={activeSection === 'about' ? 'active-link' : ''} onClick={(e) => handleNavClick(e, '#about')}>About</a></li>
                    <li><a href="#experience" className={activeSection === 'experience' ? 'active-link' : ''} onClick={(e) => handleNavClick(e, '#experience')}>Experience</a></li>
                    <li><a href="#skills" className={activeSection === 'skills' ? 'active-link' : ''} onClick={(e) => handleNavClick(e, '#skills')}>Skills</a></li>
                    <li><a href="#education" className={activeSection === 'education' ? 'active-link' : ''} onClick={(e) => handleNavClick(e, '#education')}>Education</a></li>
                    <li><a href="#projects" className={activeSection === 'projects' ? 'active-link' : ''} onClick={(e) => handleNavClick(e, '#projects')}>Projects</a></li>
                </ul>
            </div>
        </nav>
    );
};

export const Hero = () => {
    return (
        <section id="hero" className="section hero-section">
            <div className="hero-content reveal">
                <h1 className="hero-title">OBUNEZI CHIDUGAM CHARIS.</h1>
                <p className="hero-subtitle">Software Engineering Student. Full Stack Developer. Problem Solver.</p>
                <div className="hero-cta">
                    <a href="#about" className="btn btn-primary">Discover My Work</a>
                </div>
            </div>
            <div className="glow glow-1"></div>
            <div className="glow glow-2"></div>
            <div className="glow glow-3"></div>
        </section>
    );
};

export const About = () => {
    return (
        <section id="about" className="section dark-section">
            <div className="container reveal">
                <h2 className="section-title">Professional Summary</h2>
                <p className="summary-text">
                    A dedicated student with some experience in HTML development and management, database management with SQL, and MySQL administration and maintenance. Proficient in using Software Development IDEs for efficient coding practices. Demonstrates strong critical thinking and problem analysis skills, coupled with the ability to collaborate effectively within groups. Adaptable and committed to student engagement, aiming to leverage technical skills in a dynamic work environment.
                </p>
                <div className="contact-grid">
                    <a href="mailto:obunezicharis@gmail.com" className="contact-card">
                        <span className="label">Email</span>
                        <span className="value">obunezicharis@gmail.com</span>
                    </a>
                    <a href="tel:+2348102901056" className="contact-card">
                        <span className="label">Phone</span>
                        <span className="value">+234 810 290 1056</span>
                    </a>
                    <a href="http://linkedin.com/in/charis-obunezi-6726392a7/" target="_blank" rel="noreferrer" className="contact-card">
                        <span className="label">LinkedIn</span>
                        <span className="value">View Profile</span>
                    </a>
                    <a href="https://github.com/Charis55" target="_blank" rel="noreferrer" className="contact-card">
                        <span className="label">GitHub</span>
                        <span className="value">@Charis55</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export const Experience = () => {
    return (
        <section id="experience" className="section">
            <div className="container">
                <h2 className="section-title reveal">Work History</h2>
                <div className="timeline">
                    <div className="timeline-fill" id="timeline-fill"></div>
                    <div className="timeline-track" id="timeline-track">
                        <div className="timeline-wheel" id="timeline-wheel"></div>
                    </div>
                    <div className="timeline-item reveal">
                        <div className="timeline-content glass-card">
                            <h3>Student</h3>
                            <p className="timeline-meta">Babcock University - Abuja, Nigeria | 10/2022 - Current</p>
                            <ul className="timeline-details">
                                <li>Organised documentation and creatives to prepare for publication.</li>
                                <li>Researched topics outside of class to learn additional information and ask more knowledgeable questions.</li>
                                <li>Conducted research via multiple channels to compile information for staff needs.</li>
                                <li>Engaged in continuous self-directed learning to expand knowledge beyond standard curriculum.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const Skills = () => {
    return (
        <section id="skills" className="section dark-section">
            <div className="container">
                <h2 className="section-title reveal">Technical Arsenal</h2>
                <div className="skills-grid">
                    <div className="skill-card glass-card reveal fade-delay-1">
                        <h4>Languages & Tech</h4>
                        <p>React, Kotlin, Firebase, HTML, SQL, MySQL</p>
                    </div>
                    <div className="skill-card glass-card reveal fade-delay-2">
                        <h4>Tools</h4>
                        <p>Software Development IDEs, Firebase Console, Database Management</p>
                    </div>
                    <div className="skill-card glass-card reveal fade-delay-3">
                        <h4>Core Competencies</h4>
                        <p>Model-Based Software Engineering, Software Architecture, System Design</p>
                    </div>
                    <div className="skill-card glass-card reveal fade-delay-4">
                        <h4>Soft Skills</h4>
                        <p>Critical Thinking, Problem Analysis, Group Collaboration, Adaptability</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const Education = () => {
    return (
        <section id="education" className="section">
            <div className="container reveal">
                <h2 className="section-title">Education & Profile</h2>

                <div className="edu-grid">
                    <div className="edu-history" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div className="edu-card glass-card reveal fade-delay-1">
                            <h3>Bachelor of Science: Software Engineering</h3>
                            <p className="edu-meta">Babcock University - Nigeria | 10/2022 - Current</p>
                            <p className="edu-grad">Expected Graduation: 2026</p>
                            <div className="course-list">
                                <strong>Key Courses:</strong>
                                <p>Database Management Systems, Web Development, Algorithms and Data Structures, Software Engineering Principles, Software Architecture and Design, Database System Design, Model-Based Software Engineering, Embedded Systems.</p>
                            </div>
                        </div>

                        <div className="edu-card glass-card reveal fade-delay-2">
                            <h3>West African Senior School Certificate (WASSCE)</h3>
                            <p className="edu-meta">Capville Schools - Abuja, Nigeria | 2017 - 2022</p>
                            <div className="course-list">
                                <p>Completed Senior Secondary education and obtained the WAEC certificate. Developed a strong academic foundation across core science and general subjects.</p>
                            </div>
                        </div>

                        <div className="edu-card glass-card reveal fade-delay-3">
                            <h3>Junior Secondary Education</h3>
                            <p className="edu-meta">Grace Garden International College - Abuja, Nigeria | 2016</p>
                            <div className="course-list">
                                <p>Completed foundational junior secondary coursework (JSS 1).</p>
                            </div>
                        </div>
                    </div>

                    <div className="side-info">
                        <div className="info-card glass-card reveal fade-delay-2">
                            <h4>Languages</h4>
                            <p>English - Advanced (C1)</p>
                        </div>
                        <div className="info-card glass-card reveal fade-delay-3">
                            <h4>Hobbies & Interests</h4>
                            <ul className="hobby-list">
                                <li>Gaming</li>
                                <li>Football</li>
                                <li>Technology</li>
                                <li>Automobiles</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const Projects = () => {
    return (
        <section id="projects" className="section dark-section">
            <div className="container">
                <h2 className="section-title reveal">Featured Works</h2>
                <div className="projects-grid">
                    <a href="https://cash-pilot-new.vercel.app/" target="_blank" rel="noreferrer" className="project-card glass-card reveal fade-delay-1">
                        <h3>CashPilot</h3>
                        <p>A comprehensive financial management and tracking dashboard designed for optimal user experience and precise data monitoring.</p>
                        <span className="view-link">View Project &rarr;</span>
                    </a>
                    <a href="https://momentum-ems.vercel.app/" target="_blank" rel="noreferrer" className="project-card glass-card reveal fade-delay-2">
                        <h3>Momentum EMS</h3>
                        <p>An advanced Enterprise Management System built to streamline complex administrative workflows and boost operational efficiency.</p>
                        <span className="view-link">View Project &rarr;</span>
                    </a>
                    <a href="https://bu-track.vercel.app/" target="_blank" rel="noreferrer" className="project-card glass-card reveal fade-delay-3">
                        <h3>BU-Track</h3>
                        <p>A dedicated tracking application built specifically for the Babcock University ecosystem to enhance student and staff coordination.</p>
                        <span className="view-link">View Project &rarr;</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export const Footer = () => {
    return (
        <footer className="glass">
            <div className="footer-content">
                <p>&copy; 2026 Charis Obunezi. All Rights Reserved.</p>
                <p className="ref-text">References available upon request.</p>
                <p className="location-text">Abuja, Nigeria</p>
            </div>
        </footer>
    );
};
