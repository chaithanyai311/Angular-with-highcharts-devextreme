/* eslint-disable no-param-reassign */
/* eslint-disable default-case */
/* eslint-disable no-console */
/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface TestBedUtil {
    Date: string,
    IdealAvailableTime: Date,
    DynoRunning: Date,
    FailureInvest: Date,
    Setup: Date,
    NoTesting: Date,
    Others: Date,
    Equip: Date,
    Utility: Date,
    Alarm: Date,
    OthersM: Date,
}

@Component({
    selector: 'filldata',
    templateUrl: './filldata.component.html',
    styleUrls: ['filldata.component.scss'],
    providers: [],
})
export class FilldataComponent {

    months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    years: number[] = Array.from({ length: 100 }, (_, i) => 2023 + i);
    selectedYear = new FormControl(this.years[0]);
    selectedMonth = new FormControl(this.months[0]);

    testbedUtil: TestBedUtil[] = [];

    selectedTestbedUtil: TestBedUtil;
    expanded: Boolean = true;

    // Properties to hold the sums
    totalIdealAvailableTime: string = '00:00';
    totalDynoRunning: string = '00:00';
    totalFailureInvest: string = '00:00';
    totalSetup: string = '00:00';
    totalNoTesting: string = '00:00';
    totalOthers: string = '00:00';
    totalEquip: string = '00:00';
    totalUtility: string = '00:00';
    totalAlarm: string = '00:00';
    totalOthersM: string = '00:00';


    ngOnInit() {
        this.viewUtilization();
        this.updateSums();
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('testbedUtil' in changes) {
            this.updateSums();
        }
    }

    ngDoCheck() {
        this.updateSums();
    }

    selectTestbedUtil(e) {
        e.component.byKey(e.currentSelectedRowKeys[0]).done(testbedUtil => {
            if (testbedUtil) {
                this.selectedTestbedUtil = testbedUtil;
            }
        });
    }

    generateDates(year: number, month: number) {
        const daysInMonth = new Date(year, month, 0).getDate();//generate the days in date column
        const dates: string[] = [];
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${this.months[month - 1]} ${day}`;
            dates.push(dateStr);
        }
        return dates;
    }

    generateRandomDate() {
        const year = 2023 + Math.floor(Math.random() * 10);
        const month = Math.floor(Math.random() * 12);
        const day = 1 + Math.floor(Math.random() * 31);
        const hours = Math.floor(Math.random() * 12);
        const minutes = Math.floor(Math.random() * 60);

        const randomDate = new Date(year, month, day, hours, minutes);
        return randomDate;
    }

    viewUtilization() {
        const selectedYearValue = this.selectedYear.value;
        const selectedMonthIndex = this.months.indexOf(this.selectedMonth.value) + 1;

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();

        const generatedDates = this.generateDates(selectedYearValue, selectedMonthIndex);

        this.testbedUtil = generatedDates.map(date => {
            const randomDate = this.generateRandomDate();

            if (
                selectedYearValue < currentYear ||
                (selectedYearValue === currentYear && selectedMonthIndex < currentMonth) ||
                (selectedYearValue === currentYear && selectedMonthIndex === currentMonth && parseInt(date.split(' ')[1]) < currentDay)
            ) {
                return {
                    Date: date,
                    IdealAvailableTime: this.generateRandomDate(),
                    DynoRunning: this.generateRandomDate(),
                    FailureInvest: this.generateRandomDate(),
                    Setup: this.generateRandomDate(),
                    NoTesting: this.generateRandomDate(),
                    Others: this.generateRandomDate(),
                    Equip: this.generateRandomDate(),
                    Utility: this.generateRandomDate(),
                    Alarm: this.generateRandomDate(),
                    OthersM: this.generateRandomDate(),
                };
            } else {
                //display null data for future days
                return {
                    Date: date,
                    IdealAvailableTime: new Date(selectedYearValue, selectedMonthIndex - 1, parseInt(date.split(' ')[1]), 0, 0),
                    DynoRunning: new Date(selectedYearValue, selectedMonthIndex - 1, parseInt(date.split(' ')[1]), 0, 0),
                    FailureInvest: new Date(selectedYearValue, selectedMonthIndex - 1, parseInt(date.split(' ')[1]), 0, 0),
                    Setup: new Date(selectedYearValue, selectedMonthIndex - 1, parseInt(date.split(' ')[1]), 0, 0),
                    NoTesting: new Date(selectedYearValue, selectedMonthIndex - 1, parseInt(date.split(' ')[1]), 0, 0),
                    Others: new Date(selectedYearValue, selectedMonthIndex - 1, parseInt(date.split(' ')[1]), 0, 0),
                    Equip: new Date(selectedYearValue, selectedMonthIndex - 1, parseInt(date.split(' ')[1]), 0, 0),
                    Utility: new Date(selectedYearValue, selectedMonthIndex - 1, parseInt(date.split(' ')[1]), 0, 0),
                    Alarm: new Date(selectedYearValue, selectedMonthIndex - 1, parseInt(date.split(' ')[1]), 0, 0),
                    OthersM: new Date(selectedYearValue, selectedMonthIndex - 1, parseInt(date.split(' ')[1]), 0, 0),
                };
            }
        });
    }

    //calculate total sum
    calculateColumnSum(columnName: string): number {
        return this.testbedUtil.reduce((sum, item) => sum + this.getTimeInHours(item[columnName]), 0);
    }

    getTimeInHours(date: Date): number {
        return date.getHours() + date.getMinutes() / 60;
    }

    updateSums() {
        this.totalIdealAvailableTime = this.convertToHoursAndMinutes(this.calculateColumnSum('IdealAvailableTime'));
        this.totalDynoRunning = this.convertToHoursAndMinutes(this.calculateColumnSum('DynoRunning'));
        this.totalFailureInvest = this.convertToHoursAndMinutes(this.calculateColumnSum('FailureInvest'));
        this.totalSetup = this.convertToHoursAndMinutes(this.calculateColumnSum('Setup'));
        this.totalNoTesting = this.convertToHoursAndMinutes(this.calculateColumnSum('NoTesting'));
        this.totalOthers = this.convertToHoursAndMinutes(this.calculateColumnSum('Others'));
        this.totalEquip = this.convertToHoursAndMinutes(this.calculateColumnSum('Equip'));
        this.totalUtility = this.convertToHoursAndMinutes(this.calculateColumnSum('Utility'));
        this.totalAlarm = this.convertToHoursAndMinutes(this.calculateColumnSum('Alarm'));
        this.totalOthersM = this.convertToHoursAndMinutes(this.calculateColumnSum('OthersM'));
    }

    convertToHoursAndMinutes(totalHours: number): string {
        const hours = Math.floor(totalHours);
        const minutes = Math.round((totalHours - hours) * 60);
        return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m`;
    }

    //popup
    myCommand() {
        console.log("popup visible");
    }
}
