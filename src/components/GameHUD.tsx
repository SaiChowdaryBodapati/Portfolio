import { useState, useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const GameHUD = () => {
  const { score, level, highScore, achievements } = useGame();
  const [showAchievements, setShowAchievements] = useState(false);
  const [recentAchievement, setRecentAchievement] = useState<string | null>(null);

  useEffect(() => {
    const handleAchievementUnlocked = (event: CustomEvent) => {
      setRecentAchievement(event.detail.achievement);
      setTimeout(() => setRecentAchievement(null), 3000);
    };

    window.addEventListener('achievementUnlocked', handleAchievementUnlocked as EventListener);
    return () => {
      window.removeEventListener('achievementUnlocked', handleAchievementUnlocked as EventListener);
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {/* Main Stats */}
      <Card className="bg-black/80 border-green-500/50 backdrop-blur-sm">
        <CardContent className="p-3">
          <div className="text-center space-y-1">
            <div className="text-green-400 text-xs font-mono">SCORE</div>
            <div className="text-green-300 text-lg font-bold font-mono">{score.toLocaleString()}</div>
            <div className="text-blue-400 text-xs font-mono">LEVEL {level}</div>
          </div>
        </CardContent>
      </Card>

      {/* High Score */}
      <Card className="bg-black/80 border-yellow-500/50 backdrop-blur-sm">
        <CardContent className="p-3">
          <div className="text-center space-y-1">
            <div className="text-yellow-400 text-xs font-mono">HIGH SCORE</div>
            <div className="text-yellow-300 text-lg font-bold font-mono">{highScore.toLocaleString()}</div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements Button */}
      <Card 
        className="bg-black/80 border-purple-500/50 backdrop-blur-sm cursor-pointer hover:border-purple-400/70 transition-colors"
        onClick={() => setShowAchievements(!showAchievements)}
      >
        <CardContent className="p-3">
          <div className="text-center space-y-1">
            <div className="text-purple-400 text-xs font-mono">ACHIEVEMENTS</div>
            <div className="text-purple-300 text-lg font-bold font-mono">{achievements.length}</div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements Panel */}
      {showAchievements && (
        <Card className="bg-black/90 border-purple-500/50 backdrop-blur-sm w-64">
          <CardContent className="p-4">
            <h3 className="text-purple-400 text-sm font-bold mb-3 font-mono">ACHIEVEMENTS UNLOCKED</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {achievements.length === 0 ? (
                <p className="text-gray-400 text-xs">No achievements yet. Keep exploring!</p>
              ) : (
                achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-purple-600/50 text-purple-200 text-xs">
                      🏆
                    </Badge>
                    <span className="text-gray-300 text-xs">{achievement}</span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Achievement Notification */}
      {recentAchievement && (
        <Card className="bg-green-600/90 border-green-400/50 backdrop-blur-sm animate-pulse">
          <CardContent className="p-3">
            <div className="text-center space-y-1">
              <div className="text-green-200 text-xs font-mono">ACHIEVEMENT UNLOCKED!</div>
              <div className="text-white text-sm font-bold font-mono">{recentAchievement}</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GameHUD;
