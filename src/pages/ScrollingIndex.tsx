
import { GameProvider } from '@/contexts/GameContext';
import ScrollingPortfolio from '@/components/ScrollingPortfolio';

const ScrollingIndex = () => {
  return (
    <GameProvider>
      <ScrollingPortfolio />
    </GameProvider>
  );
};

export default ScrollingIndex;
