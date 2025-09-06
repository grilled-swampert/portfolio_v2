import React, { useEffect, useRef, useState } from 'react';

const Navbar = () => {
  const navRef = useRef(null);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // GSAP is not available in this environment, so we'll use native smooth scrolling
    // In a real project, you would import GSAP: import { gsap } from 'gsap';
    
    const handleSmoothScroll = (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Native smooth scrolling fallback
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update active section
        setActiveSection(targetId);
        
        // If GSAP was available, you could use:
        // gsap.to(window, {
        //   duration: 1,
        //   scrollTo: { y: targetElement, offsetY: 80 },
        //   ease: "power2.inOut"
        // });
      }
    };

    // Add event listeners to all nav links
    const navLinks = navRef.current.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    // Intersection Observer to update active nav item based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    );

    sections.forEach(section => observer.observe(section));

    // Cleanup
    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div>
      {/* Fixed Navbar */}
      <nav 
        ref={navRef}
        className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-lg z-50 transition-all duration-300"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="text-2xl font-bold text-gray-800">
              Logo
            </div>

            {/* Navigation Links */}
            <ul className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-blue-600 ${
                      activeSection === item.id 
                        ? 'text-blue-600' 
                        : 'text-gray-700'
                    }`}
                  >
                    {item.label}
                    {/* Active indicator */}
                    <span 
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-300 ${
                        activeSection === item.id 
                          ? 'scale-x-100' 
                          : 'scale-x-0'
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-gray-700 hover:text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Content Sections */}
      <div className="pt-16">
        {navItems.map((item, index) => (
          <section
            key={item.id}
            id={item.id}
            className={`min-h-screen flex items-center justify-center ${
              index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
            }`}
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                {item.label} Section
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                This is the {item.label.toLowerCase()} section. Lorem ipsum dolor sit amet, 
                consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore 
                et dolore magna aliqua.
              </p>
              {item.id === 'home' && (
                <div className="mt-8">
                  <a 
                    href="#about" 
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    Get Started
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Scroll to top button */}
      <button
        onClick={() => {
          document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
        }}
        className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Navbar;