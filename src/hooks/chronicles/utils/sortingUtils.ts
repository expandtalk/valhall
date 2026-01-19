
import type { HistoricalKing } from '../types';

export const sortHistoricalKings = (kings: HistoricalKing[]): HistoricalKing[] => {
  return [...kings].sort((a, b) => {
    // First sort by reign start year (oldest first)
    const startA = a.reign_start || 0;
    const startB = b.reign_start || 0;
    
    if (startA !== startB) {
      return startA - startB;
    }
    
    // If same start year, sort by reign end year
    const endA = a.reign_end || startA + 50; // Default to 50 year reign if no end date
    const endB = b.reign_end || startB + 50;
    
    if (endA !== endB) {
      return endA - endB;
    }
    
    // Finally sort alphabetically by name
    return a.name.localeCompare(b.name);
  });
};

export const filterByRulerType = (kings: HistoricalKing[], rulerType?: string): HistoricalKing[] => {
  if (!rulerType || rulerType === 'all') {
    return kings;
  }
  
  console.log('🔍 Filtering by ruler type:', rulerType);
  console.log('🔍 Available kings before filtering:', kings.map(k => ({ name: k.name, gender: k.gender })));
  
  return kings.filter(king => {
    const isJarl = (ruler: HistoricalKing) => {
      // Check if the name explicitly contains "jarl"
      const nameContainsJarl = ruler.name.toLowerCase().includes('jarl');
      // Check if description mentions jarl but not king/queen
      const descriptionContainsJarl = ruler.description?.toLowerCase().includes('jarl') || false;
      const descriptionContainsKing = ruler.description?.toLowerCase().includes('kung') || 
                                      ruler.description?.toLowerCase().includes('drottning') ||
                                      ruler.description?.toLowerCase().includes('queen') ||
                                      ruler.description?.toLowerCase().includes('king') || false;
      
      // If they're described as both jarl and king/queen, prioritize king/queen
      if (descriptionContainsJarl && descriptionContainsKing) {
        return false;
      }
      
      // Return true if they are explicitly called a jarl and not described as a king/queen
      return nameContainsJarl || (descriptionContainsJarl && !descriptionContainsKing);
    };

    const isKingOrQueen = !isJarl(king);
    
    switch (rulerType) {
      case 'kings':
        const result = isKingOrQueen;
        console.log(`👑 ${king.name} (${king.gender}) - isKingOrQueen: ${result}`);
        return result;
      case 'jarls':
        const jarlResult = isJarl(king);
        console.log(`⚔️ ${king.name} (${king.gender}) - isJarl: ${jarlResult}`);
        return jarlResult;
      default:
        return true;
    }
  });
};
