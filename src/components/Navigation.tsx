import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { name: 'Home', icon: '🏠', id: 'home' },
    { name: 'About', icon: '👤', id: 'about' },
    { name: 'Skills', icon: '⚡', id: 'skills' },
    { name: 'Experience', icon: '📈', id: 'experience' },
    { name: 'Projects', icon: '🚀', id: 'projects' },
    { name: 'Contact', icon: '📞', id: 'contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/80 backdrop-blur-sm shadow-lg' : 'bg-slate-900/60'}`}>
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Left - Logo and Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg text-white font-bold text-xl">
              SC
            </div>
            <div>
              <p className="font-bold text-lg text-white">Saitej Bodapati</p>
              <p className="text-sm text-gray-400">AI & Data Engineer</p>
            </div>
          </div>

          {/* Center - Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant={activeSection === item.id ? 'secondary' : 'ghost'}
                className={`font-medium ${activeSection === item.id ? 'text-white' : 'text-gray-300 hover:bg-slate-800 hover:text-white'}`}
                onClick={() => scrollToSection(item.id)}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Button>
            ))}
          </nav>

          {/* Right - Call to Action */}
          <div className="hidden lg:flex">
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation; 