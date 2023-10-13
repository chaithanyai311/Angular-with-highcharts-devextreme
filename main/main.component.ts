/* eslint-disable @typescript-eslint/prefer-readonly */
/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable no-console */
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { FormControl } from '@angular/forms';
import HighchartsExporting from 'highcharts/modules/exporting';
import { CompareComponent } from '../compare/compare.component';
import { Router } from '@angular/router';

HighchartsExporting(Highcharts);

@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    styleUrls: ['main.component.scss']
})


export class MainComponent {

    @ViewChild(CompareComponent) compareComponent: CompareComponent;
    @Output() selectedTestBedChange = new EventEmitter<string>();

    months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    years: number[] = Array.from({ length: 100 }, (_, i) => 2023 + i);
    selectedYear = new FormControl(this.years[0]);
    selectedMonth = new FormControl(this.months[0]);

    seriesNames: string[] = ['TestBed1', 'TestBed2', 'TestBed3', 'TestBed4', 'TestBed5'];

    selectedTestBed: string | null = null;
    ngOnInit() {
        this.selectedTestBed = 'utilization';
    }

    ngAfterViewInit() {
        this.TestBedUtil();
    }

    toggleTestBed(component: string) {
        this.selectedTestBed = component;
        this.showfilldata = true;
        this.selectedTestBedChange.emit(component);
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
        this.selectedTestBed = 'utilization';
        const selectedYear = this.selectedYear.value;
        this.TestBedUtil();
    }

    currentChart: string = 'Chart-1';

    toggleChart(chartName: string) {
        this.currentChart = chartName;
        this.TestBedUtil();
    }


    // TestBed Utilization

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

    updateTestbed() {
        this.compareComponent.updateUtilizationData();
    }

    showfilldata: boolean = true;

}


