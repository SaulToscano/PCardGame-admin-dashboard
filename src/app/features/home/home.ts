import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartOptions } from 'chart.js';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { DatePickerModule } from 'primeng/datepicker';
import { ToastModule } from 'primeng/toast';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [
    CommonModule,
    DatePickerModule,
    CardModule,
    ToastModule,
    ChartModule,
    FormsModule,
  ],
})
export class Home implements OnInit {
  isLoading: boolean = false;
  
  ngOnInit(): void {
    
  }
}
