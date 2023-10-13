/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/prefer-readonly */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable no-duplicate-imports */
import { Component, Input, SimpleChanges } from '@angular/core';
import { CompareGridService } from '../../services/compare-grid.service';
import { SelectionService } from '../../services/compare-selection.service';
import HC_exporting from 'highcharts/modules/exporting';
import * as Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

HighchartsExporting(Highcharts);

@Component({
    selector: 'compare',
    templateUrl: './compare.component.html',
    styleUrls: ['compare.component.scss'],
    providers: [],
})
export class CompareComponent {

    @Input() selectedTestBed: string | null = null;

    constructor(private router: Router) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.selectedTestBed && this.selectedTestBed !== null) {
            this.showbarchart(this.generateRandomPer(12));
            this.showUtilTrendchart();
            this.showMaintenanceDowntime(this.generateRandomData(12));
            this.showTestingDowntime(this.generateRandomData(12));
        }
    }

    //select year
    years: number[] = Array.from({ length: 100 }, (_, i) => 2023 + i);
    selectedYear = new FormControl(this.years[0]);

    mainPage() {
        this.router.navigate(['main']);
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

    updateUtilizationData() {
        this.showbarchart(this.generateRandomData(12));
        this.showUtilTrendchart();
        this.showMaintenanceDowntime(this.generateRandomData(12));
        this.showTestingDowntime(this.generateRandomData(12));
    }
}
