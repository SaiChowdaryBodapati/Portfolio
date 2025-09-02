import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useGame } from '@/contexts/GameContext';
import { analytics } from '@/lib/analytics';

const StartScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [gameTitle, setGameTitle] = useState('');
  const navigate = useNavigate();
  const { score, level, highScore, achievements } = useGame();
  const fullTitle = 'SAITEJ DEEP KUMAR BODAPATI';

  useEffect(() => {
    setIsVisible(true);
    
    // Track start screen view
    analytics.trackEvent({
      event: 'start_screen_view',
      category: 'game',
      action: 'start_screen_viewed'
    });
    
    // Typewriter effect for title
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < fullTitle.length) {
        setGameTitle(fullTitle.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, []);

  const startScrollingGame = () => {
    analytics.trackEvent({
      event: 'game_mode_selected',
      category: 'game',
      action: 'arcade_mode_selected'
    });
    navigate('/scrolling');
  };

  const startPageGame = () => {
    analytics.trackEvent({
      event: 'game_mode_selected',
      category: 'game',
      action: 'exploration_mode_selected'
    });
    navigate('/portfolio');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Game-style grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-20 grid-rows-15 h-full w-full">
          {[...Array(300)].map((_, i) => (
            <div
              key={i}
              className="border border-blue-500/20 animate-pulse"
              style={{ animationDelay: `${Math.random() * 3}s` }}
            />
          ))}
        </div>
      </div>

      <div className={`text-center z-10 px-6 transition-all duration-2000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        {/* Game Logo */}
        <div className="mb-12">
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-4 animate-glow">
              {gameTitle}
              <span className="animate-pulse">|</span>
            </h1>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-xl rounded-full"></div>
          </div>
        </div>

        {/* Game Stats Display */}
        <div className="grid grid-cols-4 gap-6 mb-12 max-w-3xl mx-auto">
          <div className="bg-black/50 rounded-lg p-4 border border-green-500 backdrop-blur-sm">
            <div className="text-green-400 text-xl font-bold font-mono">LEVEL</div>
            <div className="text-green-300 text-3xl font-bold font-mono">{level}</div>
          </div>
          <div className="bg-black/50 rounded-lg p-4 border border-yellow-500 backdrop-blur-sm">
            <div className="text-yellow-400 text-xl font-bold font-mono">SCORE</div>
            <div className="text-yellow-300 text-3xl font-bold font-mono">{score.toLocaleString()}</div>
          </div>
          <div className="bg-black/50 rounded-lg p-4 border border-red-500 backdrop-blur-sm">
            <div className="text-red-400 text-xl font-bold font-mono">HIGH SCORE</div>
            <div className="text-red-300 text-3xl font-bold font-mono">{highScore.toLocaleString()}</div>
          </div>
          <div className="bg-black/50 rounded-lg p-4 border border-purple-500 backdrop-blur-sm">
            <div className="text-purple-400 text-xl font-bold font-mono">ACHIEVEMENTS</div>
            <div className="text-purple-300 text-3xl font-bold font-mono">{achievements.length}</div>
          </div>
        </div>

        {/* Game Mode Selection */}
        <div className="bg-black/30 rounded-xl p-6 mb-12 border border-blue-500/30 backdrop-blur-sm max-w-2xl mx-auto">
          <h3 className="text-blue-400 text-xl font-bold mb-6 font-mono">SELECT GAME MODE</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Scrolling Mode */}
            <div 
              onClick={startScrollingGame}
              className="bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-xl p-6 border border-green-500/30 hover:border-green-400/60 cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="text-4xl mb-3">🎯</div>
              <h4 className="text-green-400 font-bold text-lg mb-2">ARCADE MODE</h4>
              <p className="text-gray-300 text-sm mb-3">Scrolling experience with score system and interactive elements</p>
              <div className="text-green-400 font-mono text-xs">• Score System • Level Progression • Smooth Scrolling</div>
            </div>

            {/* Navigation Mode */}
            <div 
              onClick={startPageGame}
              className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-blue-500/30 hover:border-blue-400/60 cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="text-4xl mb-3">🎮</div>
              <h4 className="text-blue-400 font-bold text-lg mb-2">EXPLORATION MODE</h4>
              <p className="text-gray-300 text-sm mb-3">Navigate through different pages and sections</p>
              <div className="text-blue-400 font-mono text-xs">• Page Navigation • Detailed Views • Mission Briefings</div>
            </div>
          </div>
        </div>

        {/* Recent Achievements */}
        {achievements.length > 0 && (
          <div className="bg-black/30 rounded-xl p-6 mb-12 border border-purple-500/30 backdrop-blur-sm max-w-2xl mx-auto">
            <h3 className="text-purple-400 text-xl font-bold mb-4 font-mono">RECENT ACHIEVEMENTS</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {achievements.slice(-6).map((achievement, index) => (
                <div key={index} className="bg-purple-600/20 rounded-lg p-3 border border-purple-500/30">
                  <div className="text-purple-300 text-xs font-mono text-center">🏆 {achievement}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Game Instructions */}
        <div className="bg-black/30 rounded-xl p-6 mb-12 border border-blue-500/30 backdrop-blur-sm max-w-xl mx-auto">
          <h3 className="text-blue-400 text-xl font-bold mb-4 font-mono">GAME INSTRUCTIONS</h3>
          <div className="text-gray-300 text-left space-y-2 font-mono">
            <div>• Navigate through my professional journey</div>
            <div>• Discover skills, projects, and experience</div>
            <div>• Break through code barriers</div>
            <div>• Unlock achievements and certificates</div>
            <div>• Complete missions to level up</div>
          </div>
        </div>

        {/* Start Button */}
        <Button
          onClick={startScrollingGame}
          size="lg"
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-16 py-8 text-2xl font-bold rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-110 animate-bounce font-mono border-2 border-green-400"
        >
          🎮 PRESS START
        </Button>

        {/* Blinking instruction */}
        <div className="mt-8 text-gray-400 animate-pulse font-mono">
          Press START to begin the adventure
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 text-green-400 font-mono text-sm">
        <div>PLAYER: SAITEJ CHOWDARY</div>
        <div>STATUS: READY</div>
        <div>ACHIEVEMENTS: {achievements.length}</div>
      </div>
      <div className="absolute top-8 right-8 text-blue-400 font-mono text-sm text-right">
        <div>VERSION: 2024.1</div>
        <div>MODE: PORTFOLIO</div>
        <div>HIGH SCORE: {highScore.toLocaleString()}</div>
      </div>
    </div>
  );
};

export default StartScreen;
