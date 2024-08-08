import { Component } from '@angular/core';
import { StatisticsService } from './service/statistics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private statsService: StatisticsService) { }

}
