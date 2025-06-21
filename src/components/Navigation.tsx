    import { useState, useEffect } from 'react';
    import { Button } from '@/components/ui/button';
    import { motion, AnimatePresence } from 'framer-motion';

    const HamburgerIcon = () => (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    );

    const CloseIcon = () => (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    );

    const Navigation = () => {
      const [isScrolled, setIsScrolled] = useState(false);
      const [activeSection, setActiveSection] = useState('home');
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

      useEffect(() => {
        const handleScroll = () => {
          setIsScrolled(window.scrollY > 10);
          const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
          const scrollPosition = window.scrollY + window.innerHeight / 2;
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

      useEffect(() => {
        if (isMobileMenuOpen) {
          document.body.classList.add('overflow-hidden');
        } else {
          document.body.classList.remove('overflow-hidden');
        }
        return () => {
          document.body.classList.remove('overflow-hidden');
        };
      }, [isMobileMenuOpen]);

      const scrollToSection = (sectionId: string) => {
        setIsMobileMenuOpen(false);
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
        <>
          <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-slate-900/80 backdrop-blur-sm shadow-lg' : 'bg-slate-900/60'}`}>
            <div className="container mx-auto px-6 py-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('home')}>
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg text-white font-bold text-xl">SC</div>
                  <div>
                    <p className="font-bold text-lg text-white">Saitej Bodapati</p>
                    <p className="text-sm text-gray-400">AI & Data Engineer</p>
                  </div>
                </div>
                <nav className="hidden md:flex items-center gap-2">
                  {navItems.map((item) => (
                    <Button key={item.name} variant={activeSection === item.id ? 'secondary' : 'ghost'} className={`font-medium ${activeSection === item.id ? 'text-white' : 'text-gray-300 hover:bg-slate-800 hover:text-white'}`} onClick={() => scrollToSection(item.id)}>
                      <span className="mr-2">{item.icon}</span>{item.name}
                    </Button>
                  ))}
                </nav>
                <div className="hidden lg:flex">
                  <Button onClick={() => scrollToSection('contact')} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">Get in Touch</Button>
                </div>
                <div className="md:hidden">
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
                    <HamburgerIcon />
                  </Button>
                </div>
              </div>
            </div>
          </header>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden fixed inset-0 bg-slate-900/90 backdrop-blur-xl z-50"
              >
                <div className="absolute top-4 right-4">
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <CloseIcon />
                  </Button>
                </div>
                <div className="flex flex-col items-center justify-center h-full space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index + 0.2 }}
                    >
                      <Button variant="ghost" className="text-3xl text-gray-200 hover:text-white w-full py-8" onClick={() => scrollToSection(item.id)}>
                        <span className="mr-4">{item.icon}</span>{item.name}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      );
    };

    export default Navigation;
