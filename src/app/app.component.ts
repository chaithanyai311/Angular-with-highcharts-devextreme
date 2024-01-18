import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TestbedUtilService } from './testbed-util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TestbedUtilization';

  constructor(private router: Router, public testbedUtilService: TestbedUtilService) { }

  TestbedList: any[] = ['Testbed 1', 'Testbed 2', 'Testbed 3'];


  clickEventToggleclass(i: number, item: any) {
    this.testbedUtilService.selectedButtonIndex = i;
    this.testbedUtilService.selectedTestbed = item;
    this.router.navigate(['/testbed']);
  }

  logout() {

  }

  changePassword() {

  }
}
