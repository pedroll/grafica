import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { WebsocketsService } from '../../services/websockets.service';
import { arrow } from 'ngx-bootstrap/positioning/modifiers';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.scss']
})
export class GraficaComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    {data: [65, 59, 180, 81], label: 'Series A'},
  ];
  public lineChartLabels: Label[] = ['enero', 'febrero', 'marzo', 'abril'];

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

  constructor(private http: HttpClient,
              private wsService: WebsocketsService) {
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
    this.escucharSocket();
  }

  private getData() {
    this.http.get('http://localhost:5000/grafica')
      .subscribe((data: any) => {
          console.log(data);
          this.lineChartData = data;
        }
      );
  }

  escucharSocket() {
    this.wsService.escuchar('cambio-grafica')
      .subscribe((data: any) => {
        console.log('socket', data);
        this.lineChartData = data;
      });
  }


}
