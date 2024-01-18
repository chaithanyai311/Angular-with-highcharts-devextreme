import { Component, OnInit, SimpleChanges } from '@angular/core';
import { TestbedUtilService } from '../testbed-util.service';
import { Router } from '@angular/router';
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
  selector: 'app-matrix-testbed',
  templateUrl: './matrix-testbed.component.html',
  styleUrls: ['./matrix-testbed.component.css']
})
export class MatrixTestbedComponent implements OnInit {

  constructor(private router: Router, private testbedUtilService: TestbedUtilService) { }

  ngOnInit(): void {
    this.selectedMonth.valueChanges.subscribe(() => this.loadData());
    this.selectedYear.valueChanges.subscribe(() => this.loadData());
    this.loadData();
  }

  loadData() {
    this.viewUtilization();
    this.calculateTotalSum();
  }

  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  years: number[] = Array.from({ length: 50 }, (_, i) => 2024 + i);
  selectedYear = new FormControl(this.years[0]);
  selectedMonth = new FormControl(this.months[0]);

  testbedUtil: TestBedUtil[] = [];

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



  generateDates(year: number, month: number) {
    const daysInMonth = new Date(year, month, 0).getDate();//generate the days in date column
    const dates: string[] = [];
    for (let day = 1; day <= daysInMonth; day++) {
      // const dateStr = `${this.months[month - 1]} ${day}`;
      const dateStr = new Date(year, month - 1, day).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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

  //Calculate sum of columns
  calculateTotalSum() {
    // Initialize totals
    let totalIdealAvailableTime = 0;
    let totalDynoRunning = 0;
    let totalFailureInvest = 0;
    let totalSetup = 0;
    let totalNoTesting = 0;
    let totalOthers = 0;
    let totalEquip = 0;
    let totalUtility = 0;
    let totalAlarm = 0;
    let totalOthersM = 0;

    // Calculate totals from the testbedUtil array
    this.testbedUtil.forEach(entry => {
      totalIdealAvailableTime += entry.IdealAvailableTime.getHours() * 60 + entry.IdealAvailableTime.getMinutes();
      totalDynoRunning += entry.DynoRunning.getHours() * 60 + entry.DynoRunning.getMinutes();
      totalFailureInvest += entry.FailureInvest.getHours() * 60 + entry.FailureInvest.getMinutes();
      totalSetup += entry.Setup.getHours() * 60 + entry.Setup.getMinutes();
      totalNoTesting += entry.NoTesting.getHours() * 60 + entry.NoTesting.getMinutes();
      totalOthers += entry.Others.getHours() * 60 + entry.Others.getMinutes();
      totalEquip += entry.Equip.getHours() * 60 + entry.Equip.getMinutes();
      totalUtility += entry.Utility.getHours() * 60 + entry.Utility.getMinutes();
      totalAlarm += entry.Alarm.getHours() * 60 + entry.Alarm.getMinutes();
      totalOthersM += entry.OthersM.getHours() * 60 + entry.OthersM.getMinutes();
    });

    // Convert totals back to "HH:mm" format
    this.totalIdealAvailableTime = this.convertMinutesToTime(totalIdealAvailableTime);
    this.totalDynoRunning = this.convertMinutesToTime(totalDynoRunning);
    this.totalFailureInvest = this.convertMinutesToTime(totalFailureInvest);
    this.totalSetup = this.convertMinutesToTime(totalSetup);
    this.totalNoTesting = this.convertMinutesToTime(totalNoTesting);
    this.totalOthers = this.convertMinutesToTime(totalOthers);
    this.totalEquip = this.convertMinutesToTime(totalEquip);
    this.totalUtility = this.convertMinutesToTime(totalUtility);
    this.totalAlarm = this.convertMinutesToTime(totalAlarm);
    this.totalOthersM = this.convertMinutesToTime(totalOthersM);
  }

  convertMinutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m`;
  }
}
