
export interface MatchResult {
    result: string
}


export interface Statistics {
    id: number;
    wins: number;
    lastFiveMatchByTeam: MatchResult[]; 
    winsPercentage: number;
    losses: number;
    lossesPercentage: number;
    draw: number;
    drawPercentage: number;
    pointsEfficiency: number;
    pointsEfficiencyPercentage: number;
    averageGoalsScored: number;
    averageGoalsConceded: number;
    goalsScoredPlusConceded: number;
    overHalf: number;
    overHalfPercentage: number;
    overOnePointFive: number;
    overOnePointFivePercentage: number;
    overTwoPointFive: number;
    overTwoPointFivePercentage: number;
    overThreePointFive: number;
    overThreePointFivePercentage: number;
    overFourPointFive: number;
    overFourPointFivePercentage: number;
    underHalf: number;
    underHalfPercentage: number;
    underOnePointFive: number;
    underOnePointFivePercentage: number;
    underTwoPointFive: number;
    underTwoPointFivePercentage: number;
    underThreePointFive: number;
    underThreePointFivePercentage: number;
    underFourPointFive: number;
    underFourPointFivePercentage: number;
    bothTeamsToScore: number;
    bothTeamsToScorePercentage: number;
    bothTeamsNoScore: number;
    bothTeamsNoScorePercentage: number;
    scoredOneGoal: number;
    scoredOneGoalPercentage: number;
    scoredTwoGoals: number;
    scoredTwoGoalPercentage: number;
    scoredThreeGoals: number;
    scoredThreeGoalPercentage: number;
    scoredFourGoals: number;
    scoredFourGoalPercentage: number;
    scoredFiveGoals: number;
    scoredFiveGoalPercentage: number;
    concededOneGoal: number;
    concededOneGoalPercentage: number;
    concededTwoGoals: number;
    concededTwoGoalPercentage: number;
    concededThreeGoals: number;
    concededThreeGoalPercentage: number;
    concededFourGoals: number;
    concededFourGoalPercentage: number;
    concededFiveGoals: number;
    concededFiveGoalPercentage: number;
}
