import React, { createContext, useContext, useState, useEffect } from 'react';
import { analytics } from '@/lib/analytics';

interface GameContextType {
  score: number;
  level: number;
  highScore: number;
  achievements: string[];
  addScore: (points: number) => void;
  resetScore: () => void;
  unlockAchievement: (achievement: string) => void;
  getAchievements: () => string[];
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem('gameScore');
    return saved ? parseInt(saved) : 0;
  });
  
  const [level, setLevel] = useState(() => {
    const saved = localStorage.getItem('gameLevel');
    return saved ? parseInt(saved) : 1;
  });

  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('gameHighScore');
    return saved ? parseInt(saved) : 0;
  });

  const [achievements, setAchievements] = useState<string[]>(() => {
    const saved = localStorage.getItem('gameAchievements');
    return saved ? JSON.parse(saved) : [];
  });

  const addScore = (points: number) => {
    setScore(prev => {
      const newScore = prev + points;
      localStorage.setItem('gameScore', newScore.toString());
      
      // Track score in analytics
      analytics.trackGameScore(newScore);
      
      // Update high score if needed
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('gameHighScore', newScore.toString());
        unlockAchievement('High Scorer');
      }
      
      // Level up every 100 points
      const newLevel = Math.floor(newScore / 100) + 1;
      if (newLevel > level) {
        setLevel(newLevel);
        localStorage.setItem('gameLevel', newLevel.toString());
        
        // Unlock level-based achievements
        if (newLevel >= 5) unlockAchievement('Level 5 Reached');
        if (newLevel >= 10) unlockAchievement('Level 10 Reached');
        if (newLevel >= 25) unlockAchievement('Level 25 Reached');
        
        // Show level up animation
        const event = new CustomEvent('levelUp', { detail: { level: newLevel } });
        window.dispatchEvent(event);
      }
      
      return newScore;
    });
  };

  const resetScore = () => {
    setScore(0);
    setLevel(1);
    localStorage.removeItem('gameScore');
    localStorage.removeItem('gameLevel');
  };

  const unlockAchievement = (achievement: string) => {
    if (!achievements.includes(achievement)) {
      const newAchievements = [...achievements, achievement];
      setAchievements(newAchievements);
      localStorage.setItem('gameAchievements', JSON.stringify(newAchievements));
      
      // Track achievement in analytics
      analytics.trackEvent({
        event: 'achievement_unlocked',
        category: 'game',
        action: 'achievement_unlocked',
        label: achievement
      });
      
      // Show achievement notification
      const event = new CustomEvent('achievementUnlocked', { detail: { achievement } });
      window.dispatchEvent(event);
    }
  };

  const getAchievements = () => {
    return [...achievements];
  };

  // Initialize achievements on first visit
  useEffect(() => {
    if (achievements.length === 0) {
      unlockAchievement('First Visit');
    }
  }, []);

  return (
    <GameContext.Provider value={{ 
      score, 
      level, 
      highScore, 
      achievements, 
      addScore, 
      resetScore, 
      unlockAchievement, 
      getAchievements 
    }}>
      {children}
    </GameContext.Provider>
  );
};
