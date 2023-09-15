import { Component, Input, SimpleChanges } from '@angular/core';
import { CompareGridService } from '../../services/compare-grid.service';
import { SelectionService } from '../../services/compare-selection.service';
import HC_exporting from 'highcharts/modules/exporting';
import * as Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';

HighchartsExporting(Highcharts);

@Component({
    selector: 'compare',
    templateUrl: './compare.component.html',
    styleUrls: ['compare.component.scss'],
    providers: [],
})
export class CompareComponent {
    
  @Input() selectedTestBed: string | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedTestBed && this.selectedTestBed !== null) {
      this.showbarchart(this.generateRandomPer(12));
      this.showUtilTrendchart();
      this.showMaintenanceDowntime(this.generateRandomData(12));
      this.showTestingDowntime(this.generateRandomData(12));
    }
  }

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

    showbarchart(data: number[]){
        const chartOptions: Highcharts.Options = {
            chart: {
              type: 'column',
              width:450,
              height:400,
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
        showUtilTrendchart(){
            const randomDataIdealAvailable = this.generateRandomData(12);
            const randomDataActualAvailable = this.generateRandomData(12);
            const randomDataActualUsed = this.generateRandomData(12);
            const chartOptions: Highcharts.Options = {
                chart: {
                  type: 'column',
                  width:450,
                  height:400
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

            showMaintenanceDowntime(data: number[]){
                const chartOptions: Highcharts.Options = {
                    chart: {
                      type: 'column',
                      width:450,
                      height:400
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

                showTestingDowntime(data: number[]){
                    const chartOptions: Highcharts.Options = {
                        chart: {
                          type: 'column',
                          width:450,
                          height:400
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
            
}
