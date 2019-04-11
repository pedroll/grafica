import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { log } from 'util';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.scss']
})
export class GraficaComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    {data: [65, 59, 180, 81], label: 'Series A'},
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {

    //   setInterval(() => {
    //
    //     const newData = [
    //       Math.round(Math.random() * 100),
    //       Math.round(Math.random() * 100),
    //       Math.round(Math.random() * 100),
    //       Math.round(Math.random() * 100),
    //     ];
    //     this.lineChartData = [
    //       {data: newData, label: 'Series A'},
    //     ];
    //
    //     console.log();
    //   }, 3000);
    this.getData();
  }

  private getData() {
    this.http.get('http://localhost:5000/grafica')
      .subscribe((data: any) => {
      console.log(data);
          this.lineChartData = data;
      }
      );
  }
}
