import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingTableComponent } from './ranking-table/ranking-table.component';
import { MatTableModule } from '@angular/material/table';
import { StatisticsTableComponent } from './statistics-table/statistics-table.component'; // Import MatTableModule
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RankingTableComponent,
    StatisticsTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  exports: [
    RankingTableComponent,
    StatisticsTableComponent
  ]
})
export class ComponentsModule { }
