import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../../service/statistics.service';
import { Statistics } from '../../model/Statistics';
import { MatchService } from '../../../service/match.service';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { RankingTeam } from '../../model/RankingTeam';
import { RankingService } from '../../../service/ranking.service';

export interface TableElement {
  left1:  any;
  left2: number | string;
  center: string | number;
  right1: number | string;
  right2: number | string;
}


const ELEMENT_DATA: TableElement[] = [
  { left1: '', left2: '', center: 'Últimos Jogos', right1: '', right2: '' },
  { left1: 0, left2: 0, center: 'Vitórias', right1: 0, right2: 0 },
  { left1: 0, left2: 0, center: 'Derrotas', right1: 0, right2: 0 },
  { left1: 0, left2: 0, center: 'Empate', right1: 0, right2: 0 },
  {
    left1: 0,
    left2: 0,
    center: 'Aproveitamento em pontos',
    right1: 0,
    right2: 0,
  },
  {
    left1: 0,
    left2: 0,
    center: 'Média de gols marcados',
    right1: 0,
    right2: 0,
  },
  {
    left1: 0,
    left2: 0,
    center: 'Média de gols sofridos',
    right1: 0,
    right2: 0,
  },
  { left1: 0, left2: 0, center: 'Marcados + sofridos', right1: 0, right2: 0 },
  { left1: 0, left2: 0, center: 'Mais de 0.5 gols', right1: 0, right2: 0 },
  { left1: 0, left2: 0, center: 'Mais de 1.5 gols', right1: 0, right2: 0 },
  { left1: 0, left2: 0, center: 'Mais de 2.5 gols', right1: 0, right2: 0 },
  { left1: 0, left2: 0, center: 'Mais de 3.5 gols', right1: 0, right2: 0 },
  { left1: 0, left2: 0, center: 'Mais de 4.5 gols', right1: 0, right2: 0 },
  { left1: 0, left2: 0, center: 'Menos de 0.5 gols', right1: 0, right2: 0 },
  { left1: 0, left2: 0, center: 'Menos de 1.5 gols', right1: 0, right2: 0 },
  { left1: 0, left2: 0, center: 'Menos de 2.5 gols', right1: 0, right2: 0 },
  { left1: 0, left2: 0, center: 'Menos de 3.5 gols', right1: 0, right2: 0 },
  { left1: 0, left2: 0, center: 'Menos de 4.5 gols', right1: 0, right2: 0 },
  { left1: 0, left2: 0, center: 'BTTS/Sim', right1: 0, right2: 0 },
  { left1: 0, left2: 0, center: 'BTTS/Não', right1: 0, right2: 0 },
  { left1: 0, left2: 0, center: 'Marcou 1 gol', right1: 0, right2: 0 },
  { left1: 0, left2: 0, center: 'Marcou 2 gols', right1: 0, right2: 0 },
  { left1: 0, left2: 0, center: 'Marcou 3 gols', right1: 0, right2: 0 },
  { left1: 0, left2: 0, center: 'Marcou 4 gols', right1: 0, right2: 0 },
  { left1: 0, left2: 0, center: 'Marcou 5 gols', right1: 0, right2: 0 },
  { left1: 0, left2: 0, center: 'Sofreu 1 gol', right1: 0, right2: 0 },
  { left1: 0, left2: 0, center: 'Sofreu 2 gols', right1: 0, right2: 0 },
  { left1: 0, left2: 0, center: 'Sofreu 3 gols', right1: 0, right2: 0 },
  { left1: 0, left2: 0, center: 'Sofreu 4 gols', right1: 0, right2: 0 },
  { left1: 0, left2: 0, center: 'Sofreu 5 gols', right1: 0, right2: 0 },
];

@Component({
  selector: 'app-statistics-table',
  templateUrl: './statistics-table.component.html',
  styleUrl: './statistics-table.component.css',
})
export class StatisticsTableComponent implements OnInit {
  displayedColumns: string[] = ['left1', 'left2', 'center', 'right1', 'right2'];
  dataSource = ELEMENT_DATA;

  disableSelect = new FormControl(false);

  teams: string[] = [];

  selectedTeam1?: string;
  selectedTeam2?: string;
  statisticsDataLeft?: Statistics;
  statisticsDataRight?: Statistics;
  selectedOption?: string;
  teamName?: string;
  teamNameLeft?: string;
  teamNameRight?: string;
  isChecked?: boolean;

  selectedValue: string | null = null;

  rankingTeam: RankingTeam[] = [];

  selectedTeamPositionRight: number | null = null;
  selectedTeamPositionLeft: number | null = null;




  constructor(
    private statsService: StatisticsService,
    private matchService: MatchService,
    private rankingService: RankingService
  ) {}


  ngOnInit(): void {
    this.loadTeams('Brasileirao');
    this.loadPosition('Brasileirao');
  }



  loadTeams(competition: string): void {
    this.matchService.getTeamsByCompetition(competition).subscribe(
      (data: string[]) => {
        this.teams = data;
        console.log('Teams:', data);
      },
      (error) => {
        console.error('Error fetching teams:', error);
      }
    );
  }

  loadPosition(competition: string) {
    this.rankingService.getRanking('Brasileirao').subscribe(
      (data: RankingTeam[]) => {
        console.log('Ranking data:', data);
        this.rankingTeam = data;
        // Adicionando o número de posição incremental
        this.rankingTeam = data.map((team, index) => ({ ...team, position: index + 1 }));
        // Faça o processamento dos dados recebidos aqui
      },
      (error) => {
        console.error('Erro ao buscar ranking:', error);
      }
    );
  }

  updatePositionRight(teamName: string) {
    if (!this.rankingTeam || this.rankingTeam.length === 0) {
      console.log('A lista de times está vazia ou não definida.');
      return;
    }
  
    const index = this.rankingTeam.findIndex(team => team.teams === teamName);
  
    if (index !== -1) {
      this.selectedTeamPositionRight = index + 1; // Armazena a posição do time selecionado
      console.log(`O time ${teamName} está na posição ${this.selectedTeamPositionRight}.`);
      return this.selectedTeamPositionRight;
    } else {
      console.log(`O time ${teamName} não foi encontrado na lista.`);
      return null;
    }
  }

  updatePositionLeft(teamName: string) {
    if (!this.rankingTeam || this.rankingTeam.length === 0) {
      console.log('A lista de times está vazia ou não definida.');
      return;
    }
  
    const index = this.rankingTeam.findIndex(team => team.teams === teamName);
  
    if (index !== -1) {
      this.selectedTeamPositionLeft = index + 1; // Armazena a posição do time selecionado
      console.log(`O time ${teamName} está na posição ${this.selectedTeamPositionLeft}.`);
      return this.selectedTeamPositionLeft;
    } else {
      console.log(`O time ${teamName} não foi encontrado na lista.`);
      return null;
    }
  }
  
  



  onTeamSelectedLeft(event: Event, type: string = 'general') {

    if (this.isChecked === true) {
      type = 'home'
    } else {
      type = 'general'
    }
    const selectElement = event.target as HTMLSelectElement;
    this.teamName = selectElement.value;
    this.teamNameLeft = selectElement.value;
    this.updatePositionLeft(this.teamName);
    this.statsService.getStatistics(this.teamName, type).subscribe(
      (data: Statistics) => {
        this.statisticsDataLeft = data;
        console.log('Estatísticas Left:', data);
        this.updateTableLeft(data);
      },
      (error) => {
        console.error('Erro ao buscar estatísticas:', error);
      }
    );
  }

  onTeamCheckboxLeft(teamName: string, type: string) {
    this.statsService.getStatistics(teamName, type).subscribe(
      (data: Statistics) => {
        this.statisticsDataLeft = data;
        console.log('Estatísticas Checkbox Left:', data);
        this.updateTableLeft(data);
      },
      (error) => {
        console.error('Erro ao buscar estatísticas:', error);
      }
    );
  }

  onTeamCheckboxRight(teamName: string, type: string) {
    this.statsService.getStatistics(teamName, type).subscribe(
      (data: Statistics) => {
        this.statisticsDataRight = data;
        console.log('Estatísticas Checkbox Right:', data);
        this.updateTableRight(data);
      },
      (error) => {
        console.error('Erro ao buscar estatísticas:', error);
      }
    );
  }

  onTeamSelectedRight(event: Event, type: string = 'general') {

    if (this.isChecked === true) {
      type = 'away'
    } else {
      type = 'general'
    }
    const selectElement = event.target as HTMLSelectElement;
    this.teamName = selectElement.value;
    this.teamNameRight = selectElement.value;
    this.updatePositionRight(this.teamName);


    this.statsService.getStatistics(this.teamName, type).subscribe(
      (data: Statistics) => {
        this.statisticsDataRight = data;
        console.log('Estatísticas Right:', data);
        this.updateTableRight(data);
      },
      (error) => {
        console.error('Erro ao buscar estatísticas:', error);
      }
    );    
  }
  

  onCheckboxChange(event: MatCheckboxChange) {
    this.isChecked = event.checked;
    console.log('Checkbox is checked:', this.isChecked!);

    if (this.isChecked! === true) {
      this.onTeamCheckboxLeft(this.teamNameLeft!, 'home');
      this.onTeamCheckboxRight(this.teamNameRight!, 'away');
    } else {
      this.onTeamCheckboxLeft(this.teamNameLeft!, 'general');
      this.onTeamCheckboxRight(this.teamNameRight!, 'general');
    }
    
  }
  

  updateTableLeft(data: Statistics) {

    const lastFiveMatch = this.getConcatenatedResults(data.lastFiveMatchByTeam);
    // Atualize os valores de left1 e left2 para cada item em ELEMENT_DATA
    ELEMENT_DATA[0].left1 = lastFiveMatch;

    ELEMENT_DATA[1].left1 = data.wins;
    ELEMENT_DATA[1].left2 = data.winsPercentage;
  
    ELEMENT_DATA[2].left1 = data.losses;
    ELEMENT_DATA[2].left2 = data.lossesPercentage;
  
    ELEMENT_DATA[3].left1 = data.draw;
    ELEMENT_DATA[3].left2 = data.drawPercentage;
  
    ELEMENT_DATA[4].left1 = data.pointsEfficiency;
    ELEMENT_DATA[4].left2 = data.pointsEfficiencyPercentage;
  
    ELEMENT_DATA[5].left1 = data.averageGoalsScored;
    ELEMENT_DATA[5].left2 = data.averageGoalsScored;
  
    ELEMENT_DATA[6].left1 = data.averageGoalsConceded;
    ELEMENT_DATA[6].left2 = data.averageGoalsConceded;
  
    ELEMENT_DATA[7].left1 = data.goalsScoredPlusConceded;
    ELEMENT_DATA[7].left2 = data.goalsScoredPlusConceded;
  
    ELEMENT_DATA[8].left1 = data.overHalf;
    ELEMENT_DATA[8].left2 = data.overHalfPercentage;
  
    ELEMENT_DATA[9].left1 = data.overOnePointFive;
    ELEMENT_DATA[9].left2 = data.overOnePointFivePercentage;
  
    ELEMENT_DATA[10].left1 = data.overTwoPointFive;
    ELEMENT_DATA[10].left2 = data.overTwoPointFivePercentage;
  
    ELEMENT_DATA[11].left1 = data.overThreePointFive;
    ELEMENT_DATA[11].left2 = data.overThreePointFivePercentage;
  
    ELEMENT_DATA[12].left1 = data.overFourPointFive;
    ELEMENT_DATA[12].left2 = data.overFourPointFivePercentage;
  
    ELEMENT_DATA[13].left1 = data.underHalf;
    ELEMENT_DATA[13].left2 = data.underHalfPercentage;
  
    ELEMENT_DATA[14].left1 = data.underOnePointFive;
    ELEMENT_DATA[14].left2 = data.underOnePointFivePercentage;
  
    ELEMENT_DATA[15].left1 = data.underTwoPointFive;
    ELEMENT_DATA[15].left2 = data.underTwoPointFivePercentage;
  
    ELEMENT_DATA[16].left1 = data.underThreePointFive;
    ELEMENT_DATA[16].left2 = data.underThreePointFivePercentage;
  
    ELEMENT_DATA[17].left1 = data.underFourPointFive;
    ELEMENT_DATA[17].left2 = data.underFourPointFivePercentage;
  
    ELEMENT_DATA[18].left1 = data.bothTeamsToScore;
    ELEMENT_DATA[18].left2 = data.bothTeamsToScorePercentage;
  
    ELEMENT_DATA[19].left1 = data.bothTeamsNoScore;
    ELEMENT_DATA[19].left2 = data.bothTeamsNoScorePercentage;
  
    ELEMENT_DATA[20].left1 = data.scoredOneGoal;
    ELEMENT_DATA[20].left2 = data.scoredOneGoalPercentage;
  
    ELEMENT_DATA[21].left1 = data.scoredTwoGoals;
    ELEMENT_DATA[21].left2 = data.scoredTwoGoalPercentage;
  
    ELEMENT_DATA[22].left1 = data.scoredThreeGoals;
    ELEMENT_DATA[22].left2 = data.scoredThreeGoalPercentage;
  
    ELEMENT_DATA[23].left1 = data.scoredFourGoals;
    ELEMENT_DATA[23].left2 = data.scoredFourGoalPercentage;
  
    ELEMENT_DATA[24].left1 = data.scoredFiveGoals;
    ELEMENT_DATA[24].left2 = data.scoredFiveGoalPercentage;
  
    ELEMENT_DATA[25].left1 = data.concededOneGoal;
    ELEMENT_DATA[25].left2 = data.concededOneGoalPercentage;
  
    ELEMENT_DATA[26].left1 = data.concededTwoGoals;
    ELEMENT_DATA[26].left2 = data.concededTwoGoalPercentage;
  
    ELEMENT_DATA[27].left1 = data.concededThreeGoals;
    ELEMENT_DATA[27].left2 = data.concededThreeGoalPercentage;
  
    ELEMENT_DATA[28].left1 = data.concededFourGoals;
    ELEMENT_DATA[28].left2 = data.concededFourGoalPercentage;
  
    ELEMENT_DATA[29].left1 = data.concededFiveGoals;
    ELEMENT_DATA[29].left2 = data.concededFiveGoalPercentage;
  
    // Atualizar a fonte de dados
    this.dataSource = ELEMENT_DATA;
}

  

updateTableRight(data: Statistics) {

  // Novo campo lastFiveMatch concatenado
  const lastFiveMatch = this.getConcatenatedResults(data.lastFiveMatchByTeam);
  
  // Atualize os valores de right1 e right2 para cada item em ELEMENT_DATA
  ELEMENT_DATA[0].right1 = lastFiveMatch;  // Atualização para o novo campo lastFiveMatch

  ELEMENT_DATA[1].right1 = data.wins;
  ELEMENT_DATA[1].right2 = data.winsPercentage;

  ELEMENT_DATA[2].right1 = data.losses;
  ELEMENT_DATA[2].right2 = data.lossesPercentage;

  ELEMENT_DATA[3].right1 = data.draw;
  ELEMENT_DATA[3].right2 = data.drawPercentage;

  ELEMENT_DATA[4].right1 = data.pointsEfficiency;
  ELEMENT_DATA[4].right2 = data.pointsEfficiencyPercentage;

  ELEMENT_DATA[5].right1 = data.averageGoalsScored;
  ELEMENT_DATA[5].right2 = data.averageGoalsScored;

  ELEMENT_DATA[6].right1 = data.averageGoalsConceded;
  ELEMENT_DATA[6].right2 = data.averageGoalsConceded;

  ELEMENT_DATA[7].right1 = data.goalsScoredPlusConceded;
  ELEMENT_DATA[7].right2 = data.goalsScoredPlusConceded;

  ELEMENT_DATA[8].right1 = data.overHalf;
  ELEMENT_DATA[8].right2 = data.overHalfPercentage;

  ELEMENT_DATA[9].right1 = data.overOnePointFive;
  ELEMENT_DATA[9].right2 = data.overOnePointFivePercentage;

  ELEMENT_DATA[10].right1 = data.overTwoPointFive;
  ELEMENT_DATA[10].right2 = data.overTwoPointFivePercentage;

  ELEMENT_DATA[11].right1 = data.overThreePointFive;
  ELEMENT_DATA[11].right2 = data.overThreePointFivePercentage;

  ELEMENT_DATA[12].right1 = data.overFourPointFive;
  ELEMENT_DATA[12].right2 = data.overFourPointFivePercentage;

  ELEMENT_DATA[13].right1 = data.underHalf;
  ELEMENT_DATA[13].right2 = data.underHalfPercentage;

  ELEMENT_DATA[14].right1 = data.underOnePointFive;
  ELEMENT_DATA[14].right2 = data.underOnePointFivePercentage;

  ELEMENT_DATA[15].right1 = data.underTwoPointFive;
  ELEMENT_DATA[15].right2 = data.underTwoPointFivePercentage;

  ELEMENT_DATA[16].right1 = data.underThreePointFive;
  ELEMENT_DATA[16].right2 = data.underThreePointFivePercentage;

  ELEMENT_DATA[17].right1 = data.underFourPointFive;
  ELEMENT_DATA[17].right2 = data.underFourPointFivePercentage;

  ELEMENT_DATA[18].right1 = data.bothTeamsToScore;
  ELEMENT_DATA[18].right2 = data.bothTeamsToScorePercentage;

  ELEMENT_DATA[19].right1 = data.bothTeamsNoScore;
  ELEMENT_DATA[19].right2 = data.bothTeamsNoScorePercentage;

  ELEMENT_DATA[20].right1 = data.scoredOneGoal;
  ELEMENT_DATA[20].right2 = data.scoredOneGoalPercentage;

  ELEMENT_DATA[21].right1 = data.scoredTwoGoals;
  ELEMENT_DATA[21].right2 = data.scoredTwoGoalPercentage;

  ELEMENT_DATA[22].right1 = data.scoredThreeGoals;
  ELEMENT_DATA[22].right2 = data.scoredThreeGoalPercentage;

  ELEMENT_DATA[23].right1 = data.scoredFourGoals;
  ELEMENT_DATA[23].right2 = data.scoredFourGoalPercentage;

  ELEMENT_DATA[24].right1 = data.scoredFiveGoals;
  ELEMENT_DATA[24].right2 = data.scoredFiveGoalPercentage;

  ELEMENT_DATA[25].right1 = data.concededOneGoal;
  ELEMENT_DATA[25].right2 = data.concededOneGoalPercentage;

  ELEMENT_DATA[26].right1 = data.concededTwoGoals;
  ELEMENT_DATA[26].right2 = data.concededTwoGoalPercentage;

  ELEMENT_DATA[27].right1 = data.concededThreeGoals;
  ELEMENT_DATA[27].right2 = data.concededThreeGoalPercentage;

  ELEMENT_DATA[28].right1 = data.concededFourGoals;
  ELEMENT_DATA[28].right2 = data.concededFourGoalPercentage;

  ELEMENT_DATA[29].right1 = data.concededFiveGoals;
  ELEMENT_DATA[29].right2 = data.concededFiveGoalPercentage;

  // Atualizar a fonte de dados
  this.dataSource = ELEMENT_DATA;
}


getConcatenatedResults(results: any[]): string {
  return results.map(result => {
    if (result.result === 'win') return 'V';
    if (result.result === 'loss') return 'D';
    if (result.result === 'draw') return 'E';
    return '';
  }).join(' - ');
}



}
