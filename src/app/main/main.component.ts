import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { FormControl } from '@angular/forms';
import HighchartsExporting from 'highcharts/modules/exporting';
import { Router } from '@angular/router';
import { TestbedUtilService } from '../testbed-util.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router: Router, private testbedUtilService: TestbedUtilService) { }

  ngOnInit(): void {
  }

  years: number[] = Array.from({ length: 100 }, (_, i) => 2024 + i);
  selectedYear = new FormControl(this.years[0]);
  seriesNames: string[] = ['TestBed1', 'TestBed2', 'TestBed3', 'TestBed4', 'TestBed5'];


  ngAfterViewInit() {
    this.TestBedUtil();
  }

  generateRandomData(dataCount: number): number[] {
    const randomData = [];
    for (let i = 0; i < dataCount; i++) {
      const randomNumber = Math.random() * 100;
      const roundedNumber = Math.round(randomNumber * 10) / 10;
      randomData.push(roundedNumber);
    }
    return randomData;
  }

  updateChart() {
    const selectedYear = this.selectedYear.value;
    this.TestBedUtil();
  }

  currentChart: string = 'Chart-1';

  toggleChart(chartName: string) {
    this.currentChart = chartName;
    this.TestBedUtil();
  }

  TestBedUtil() {
    const selectedSeriesNames = this.seriesNames.slice();

    if (this.currentChart === 'Chart-2') {
      for (let i = 0; i < 5; i++) {
        selectedSeriesNames[i] = `TestBed${i + 6}`;
      }
    }
    const testbed1 = this.generateRandomData(12);
    const testbed2 = this.generateRandomData(12);
    const testbed3 = this.generateRandomData(12);
    const testbed4 = this.generateRandomData(12);
    const testbed5 = this.generateRandomData(12);

    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Overall Lab utilization'
      },
      xAxis: {
        categories: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Utilization (%)'
        }
      },
      series: [
        {
          type: 'column',
          name: selectedSeriesNames[0],
          data: testbed1
        },
        {
          type: 'column',
          name: selectedSeriesNames[1],
          data: testbed2
        },
        {
          type: 'column',
          name: selectedSeriesNames[2],
          data: testbed3
        },
        {
          type: 'column',
          name: selectedSeriesNames[3],
          data: testbed4
        },
        {
          type: 'column',
          name: selectedSeriesNames[4],
          data: testbed5
        }
      ]
    };
    Highcharts.chart('testbed-Util', chartOptions);
  }

}
