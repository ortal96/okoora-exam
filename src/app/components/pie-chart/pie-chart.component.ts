import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnChanges{

  @Input() completedTodo: any;
  @Input() notCompletedTodo: any;

  ngOnChanges(changes: SimpleChanges): void {
    this.initPie();
  }

  ngOnInit(): void {
  }

  public initPie() {
    this.pieChartDatasets = [{
      data: [this.completedTodo, this.notCompletedTodo]
    }]
    this.pieChartLabels = ['completed', 'not completed'];
  }


  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };

  public pieChartLabels = ['completed', 'not completed'];
  public pieChartDatasets = [ {
    data: [0, 0 ]
  } ];

  public pieChartLegend = true;

}
