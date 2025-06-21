import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import MovingBackground from './MovingBackground';

const HeroSection = () => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [displayName, setDisplayName] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const heroData = {
    name: 'Saitej Chowdary Bodapati',
    title: 'Artificial Intelligence & Data Engineer',
    valueProposition: 'Empowering businesses with GenAI, scalable data engineering, and ML-powered automation across cloud platforms.',
    mission: 'Turning complex data into actionable AI-driven insights for global impact.',
        image: '/Portfolio/profile.jpg' // Your profile image - replace with your actual filename
  };

  // Matrix-style name animation
  useEffect(() => {
    if (currentIndex < heroData.name.length) {
      const timer = setTimeout(() => {
        setDisplayName(prev => prev + heroData.name[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 150); // Speed of character appearance

      return () => clearTimeout(timer);
    }
  }, [currentIndex, heroData.name]);

  useEffect(() => {
    const handleScroll = () => {
      // Hide scroll indicator after user scrolls past 100px
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
    window.open('/resume.pdf', '_blank');
  };

  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com/in/tejchowdary', '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-slate-900">
      <MovingBackground />
      <div className="relative z-10 p-6">
        <div className="mb-8">
          <img 
            src={heroData.image} 
            alt="Saitej Bodapati" 
            className="w-48 h-48 rounded-full mx-auto border-4 border-slate-700 shadow-2xl object-cover"
          />
        </div>

        {/* Matrix-style name animation */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 font-mono">
          <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
            {displayName}
          </span>
          <span className="animate-pulse text-green-400">|</span>
        </h1>
        
        <h2 className="text-xl md:text-2xl font-semibold text-slate-300 mb-4">
          {heroData.title}
        </h2>

        <p className="text-lg text-slate-400 mb-6 max-w-3xl mx-auto">
          {heroData.valueProposition}
        </p>

        <p className="text-sm text-slate-500 mb-8 italic">
          "{heroData.mission}"
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 transition-transform"
            onClick={handleScrollToProjects}
          >
            Explore My Work
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-blue-500 text-blue-400 hover:bg-slate-800 hover:text-blue-300 hover:scale-105 transition-transform"
            onClick={handleScrollToAbout}
          >
            Discover My Journey
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-green-500 text-green-400 hover:bg-slate-800 hover:text-green-300 hover:scale-105 transition-transform"
            onClick={handleDownloadResume}
          >
            Download Resume
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-sky-500 text-sky-400 hover:bg-slate-800 hover:text-sky-300 hover:scale-105 transition-transform"
            onClick={handleLinkedInClick}
          >
            LinkedIn
          </Button>
        </div>
      </div>

      {/* Scroll Indicator - Fixed at bottom center */}
      {showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-500">
          <div className="text-slate-400 text-sm mb-2 text-center">
            Welcome! Scroll down to explore
          </div>
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full mx-auto relative">
            <div className="w-1 h-3 bg-slate-400 rounded-full mx-auto mt-2 animate-pulse"></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
