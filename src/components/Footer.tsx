import { useState, useEffect, useRef } from 'react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <footer ref={sectionRef} className="py-16 bg-black/50 backdrop-blur-sm relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-blue-900/20 to-purple-900/20"></div>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/5 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Personal Motto */}
          <div className="mb-8">
            <p className="text-2xl md:text-3xl font-light text-gray-300 italic mb-4">
              "Fueled by curiosity, grounded in data, and inspired by impact."
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Let's build something meaningful together -  open to new opportunities, collaborations, and ideas.
            </p>
          </div>

          {/* Divider */}
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-8"></div>

          {/* Footer Credits */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span>© 2025 Saitej Bodapati</span>
              <span className="hidden md:inline">•</span>
              <span>Built with ❤️ using React & Tailwind CSS</span>
            </div>
            <div className="text-center md:text-right">
              <p className="font-medium text-gray-400">Powered by insights. Driven by innovation.</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-8 flex justify-center gap-6">
            <a 
              href="https://github.com/saitej-bodapati" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors duration-300"
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/tejchowdary" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors duration-300"
            >
              LinkedIn
            </a>
            <a 
              href="mailto:saitejdeepkumar@gmail.com"
              className="text-gray-500 hover:text-white transition-colors duration-300"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 