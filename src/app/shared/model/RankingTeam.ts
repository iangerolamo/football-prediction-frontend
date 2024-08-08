export interface RankingTeam {
    teams: string;
    points: number;
    matchesPlayed: number;
    wins: number;
    draws: number;
    losses: number;
    goalsScored: number;
    goalsAgainst: number;
    goalsDifference: number;
    lastFive: any[];
    pointsEfficiencyPercentage: string;

  }
  