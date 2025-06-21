
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import GameBackground from '@/components/GameBackground';
import GameCursor from '@/components/GameCursor';

const PortfolioPage = () => {
  const navigate = useNavigate();

  const gameMenuItems = [
    { title: 'ABOUT ME', path: '/about', icon: '👤', description: 'Learn about my background' },
    { title: 'SKILLS', path: '/skills', icon: '⚡', description: 'Technical expertise & tools' },
    { title: 'EXPERIENCE', path: '/experience', icon: '🏆', description: 'Professional journey' },
    { title: 'PROJECTS', path: '/projects', icon: '🚀', description: 'Featured work & achievements' },
    { title: 'CONTACT', path: '/contact', icon: '📞', description: 'Get in touch' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <GameBackground />
      <GameCursor />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="max-w-6xl mx-auto text-center">
          {/* Game Header */}
          <div className="mb-12">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 text-white">
              <span className="text-gradient">SAITEJ</span>{' '}
              <span className="text-blue-400">CHOWDARY</span>
            </h1>
            <h2 className="text-3xl text-gray-300 mb-4">AI & Data Engineer</h2>
            <p className="text-xl text-gray-400 mb-8">
              Level 85 • 3+ Years Experience • Master's in Data Science
            </p>
            
            {/* Game Stats */}
            <div className="flex justify-center gap-8 mb-12">
              <div className="bg-black/30 rounded-lg p-4 border border-green-500/30">
                <div className="text-green-400 text-2xl font-bold">98%</div>
                <div className="text-gray-400">Data Accuracy</div>
              </div>
              <div className="bg-black/30 rounded-lg p-4 border border-blue-500/30">
                <div className="text-blue-400 text-2xl font-bold">50+</div>
                <div className="text-gray-400">Projects</div>
              </div>
              <div className="bg-black/30 rounded-lg p-4 border border-purple-500/30">
                <div className="text-purple-400 text-2xl font-bold">15+</div>
                <div className="text-gray-400">Technologies</div>
              </div>
            </div>
          </div>

          {/* Game Menu */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {gameMenuItems.map((item, index) => (
              <Button
                key={index}
                onClick={() => navigate(item.path)}
                className="group relative bg-gradient-to-br from-blue-600/20 to-purple-600/20 hover:from-blue-600/40 hover:to-purple-600/40 border-2 border-blue-500/30 hover:border-blue-400/60 text-white p-8 h-auto rounded-xl transform transition-all duration-300 hover:scale-110 hover:shadow-2xl backdrop-blur-sm"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4 group-hover:animate-bounce">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300">
                    {item.description}
                  </p>
                </div>
                
                {/* Hover effect border */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-400/50 transition-all duration-300" />
              </Button>
            ))}
          </div>

          {/* Back to Start */}
          <div className="mt-12">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="text-white border-white/30 hover:bg-white/10 hover:border-white/60"
            >
              ← Back to Start Screen
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
