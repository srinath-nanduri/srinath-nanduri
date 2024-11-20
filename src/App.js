import React, { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const containerRef = useRef(null);
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const sections = container.querySelectorAll('.parallax-section');

    const handleScroll = () => {
      const scrollPosition = isPortrait ? window.pageYOffset : container.scrollLeft;
      const viewportSize = isPortrait ? window.innerHeight : window.innerWidth;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionStart = isPortrait ? rect.top + scrollPosition : rect.left + scrollPosition;
        const sectionSize = isPortrait ? rect.height : rect.width;
        
        let percentage = (scrollPosition - sectionStart) / sectionSize;
        percentage = Math.max(0, Math.min(1, percentage));
        
        section.style.setProperty('--scroll-percentage', percentage);
      });
    };

    const handleResize = () => {
      const newIsPortrait = window.innerHeight > window.innerWidth;
      if (newIsPortrait !== isPortrait) {
        setIsPortrait(newIsPortrait);
        
        // Reset scroll position when changing orientation
        if (newIsPortrait) {
          window.scrollTo(0, 0);
        } else {
          container.scrollLeft = 0;
        }

        // Force reflow to ensure proper layout after orientation change
        container.style.display = 'none';
        // container.offsetHeight; // Trigger reflow
        container.style.display = '';

        // Reapply parallax effect after a short delay
        setTimeout(handleScroll, 100);
      }
    };

    const smoothScroll = (target) => {
      const targetSection = container.querySelector(target);
      if (targetSection) {
        if (isPortrait) {
          window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
          });
        } else {
          container.scrollTo({
            left: targetSection.offsetLeft,
            behavior: 'smooth'
          });
        }
      }
    };

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target.getAttribute('href');
        smoothScroll(target);
      });
    });

    if (isPortrait) {
      window.addEventListener('scroll', handleScroll);
    } else {
      container.addEventListener('scroll', handleScroll);
    }
    window.addEventListener('resize', handleResize);

    handleScroll(); // Initial call

    return () => {
      if (isPortrait) {
        window.removeEventListener('scroll', handleScroll);
      } else {
        container.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', handleResize);
      navItems.forEach(item => {
        item.removeEventListener('click', smoothScroll);
      });
    };
  }, [isPortrait]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`App ${isPortrait ? 'portrait' : 'landscape'}`} ref={containerRef}>
      <div className="parallax-container">
        <section id="boundry" className="parallax-section">
          <div className="background"></div>
          {/* <div className="profile-pic"></div> */}
          <div className="logo-container">
            <div className="logo"></div>
            {/* <div className="brand-name">
              <h3>Your Brand</h3>
            </div> */}
          </div>
          <div className={`content boundary ubuntu-mono-regular ${isVisible ? 'fade-in' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
            
            <h2>Boundry</h2>
            <p>We are the stretchers!, don't get us wrong, we do stretch the boundaries, 
              wherever you need your ends to meet we are there to help technically.
            </p>
            <p>This is where you can imagine something to build and we will provide the tools 
              and people to build it for you.
            </p>
            <p>Read more in 'About Us'</p>
          </div>
        </section>
        <section id="projects" className="parallax-section">
          <div className="background"></div>
          <div className="content ubuntu-mono-regular">
            <h2>Projects</h2>
            <p>Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.</p>
          </div>
        </section>
        <section id="about" className="parallax-section">
          <div className="background"></div>
          <div className="content ubuntu-mono-regular">
            <h2>About Us</h2>
            <p>                
              Hi, this is Boundaries, we are a team of developers who help achieve an internet presence of your idea and help out people reach you
            </p>
          </div>
        </section>
        <section id="contact" className="parallax-section">
          <div className="background"></div>
          <div className="content ubuntu-mono-regular">
            <h2>Contact Us</h2>
            <p><strong><i>
              <a href="mailto:sales@boundaries.in" className='contact-email'>
              <i className="far fa-envelope" style={{ color: '#000' }}></i>
              &nbsp;sales@boundaries.in</a>
            </i></strong></p>
          </div>
        </section>
      </div>
      <nav className="bottom-nav ubuntu-mono-regular">
        <a href="#boundry" className="nav-item">Boundry</a>
        <a href="#projects" className="nav-item">Projects</a>
        <a href="#about" className="nav-item">About Us</a>
        <a href="#contact" className="nav-item">Contact Us</a>
      </nav>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <svg class='arrowhead' xmlns="http://www.w3.org/2000/svg">
          <path d="M50 90 L70 120 L50 150" />
          Sorry, your browser does not support inline SVG.
        </svg>
      </div>

    </div>
  );
}

export default App;
