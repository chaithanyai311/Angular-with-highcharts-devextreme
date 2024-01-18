import { TestbedUtilService } from './../testbed-util.service';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as Highcharts from 'highcharts';
import { Router } from '@angular/router';


@Component({
  selector: 'app-testbed',
  templateUrl: './testbed.component.html',
  styleUrls: ['./testbed.component.css']
})


export class TestbedComponent implements OnInit {

  selectedButtonIndex: number = -1;
  selectedTestbed: string | null = null;

  constructor(private router: Router, private testbedUtilService: TestbedUtilService) {
    this.selectedTestbed = this.testbedUtilService.selectedTestbed;
  }


  ngOnInit(): void {
    this.testbedUtilService.selectedButtonIndex$.subscribe(index => {
      this.selectedButtonIndex = index;
    });

    this.testbedUtilService.selectedTestbed$.subscribe(testbed => {
      this.selectedTestbed = testbed;
      this.updateCharts();
    });
  }

  updateCharts() {
    this.showbarchart(this.generateRandomPer(12));
    this.showUtilTrendchart();
    this.showMaintenanceDowntime(this.generateRandomPer(12));
    this.showTestingDowntime(this.generateRandomPer(12));
  }
//   ngOnChanges(changes: SimpleChanges) {
//     if (changes['selectedTestbed'] && this.selectedTestbed !== null) {
//         this.showbarchart(this.generateRandomPer(12));
//         this.showUtilTrendchart();
//         this.showMaintenanceDowntime(this.generateRandomPer(12));
//       this.showTestingDowntime(this.generateRandomPer(12));
//     }
// }

  years: number[] = Array.from({ length: 1 }, (_, i) => 2024 + i);
  selectedYear = new FormControl(this.years[0]);


  generateRandomPer(dataCount: number): number[] {
    const randomData = [];
    for (let i = 0; i < dataCount; i++) {
      const randomNumber = Math.random() * 100;
      const roundedNumber = Math.round(randomNumber * 10) / 10;
      randomData.push(roundedNumber);
    }
    return randomData;

  }

  generateRandomData(dataCount: number): number[] {
    const randomData = [];
    for (let i = 0; i < dataCount; i++) {
      const randomNumber = Math.random() * 200;
      const roundedNumber = Math.round(randomNumber * 10) / 10;
      randomData.push(roundedNumber);
    }
    return randomData;
  }


  //Utilization trend chart

  showbarchart(data: number[]) {
    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Utilization trend (%)'
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
          name: 'Series 1',
          data: data
        }
      ]
    };
    Highcharts.chart('utilizationTrendPer', chartOptions);
  }


  // Utilization trend chart(hours)
  showUtilTrendchart() {
    const randomDataIdealAvailable = this.generateRandomData(12);
    const randomDataActualAvailable = this.generateRandomData(12);
    const randomDataActualUsed = this.generateRandomData(12);
    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Utilization trend (hours)'
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
          text: 'hrs'
        }
      },
      series: [
        {
          type: 'column',
          name: 'Ideal_Available',
          data: randomDataIdealAvailable
        },
        {
          type: 'column',
          name: 'Actual_Available',
          data: randomDataActualAvailable
        },
        {
          type: 'column',
          name: 'Actual_Used',
          data: randomDataActualUsed
        }
      ]
    };

    Highcharts.chart('utilizationTrendhrs', chartOptions);
  }


  //Downtime trend

  showMaintenanceDowntime(data: number[]) {
    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Maintenance downtime trend'
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
          text: 'Downtime (hrs)'
        }
      },
      series: [
        {
          type: 'column',
          name: 'Series 1',
          data: data
        }
      ]
    };

    Highcharts.chart('maintenanceDowntimeTrend', chartOptions);
  }

  showTestingDowntime(data: number[]) {
    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Testing downtime trend'
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
          text: 'Downtime (hrs)'
        }
      },
      series: [
        {
          type: 'column',
          name: 'Series 1',
          data: data
        }
      ]
    };

    Highcharts.chart('testingDowntimeTrend', chartOptions);
  }

  toggleMatrixTestbed() {
    this.router.navigate(['/matrixTestbed']);
  }
}
