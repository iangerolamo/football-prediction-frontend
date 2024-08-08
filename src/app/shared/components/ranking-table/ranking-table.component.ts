import { Component, OnInit } from '@angular/core';
import { RankingService } from '../../../service/ranking.service';
import { RankingTeam } from '../../model/RankingTeam';


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking-table.component.html',
  styleUrl: './ranking-table.component.css'
})
export class RankingTableComponent implements OnInit{

  rankingTeam: RankingTeam[] = [];

  constructor(private rankingService: RankingService) {}

  ngOnInit() {
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

  displayedColumns: string[] = ['position', 'team', 'points', 'gamesPlayed', 'wins', 'draws', 'losses', 'goalsFor', 'goalsAgainst', 'goalDifference', 'pointsEfficiencyPercentage'];


}
