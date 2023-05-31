import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { Todos } from 'src/app/models/todos';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnChanges{



  // @Input() todosArr: any;
  // completed: number = 0;
  // notCompleted: number = 0;

  @Input() completedTodo: any;
  @Input() notCompletedTodo: any;

  ngOnChanges(changes: SimpleChanges): void {
    this.banan();
  }

  ngOnInit(): void {
  }

  public banan() {
    this.pieChartDatasets = [{
      data: [this.completedTodo, this.notCompletedTodo]
    }]
    this.pieChartLabels = ['completed', 'not completed'];
    console.log(this.completedTodo)
    console.log(this.notCompletedTodo)
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
