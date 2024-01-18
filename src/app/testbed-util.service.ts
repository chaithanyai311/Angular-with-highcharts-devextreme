import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestbedUtilService {

  constructor() { }

  private selectedButtonIndexSubject = new BehaviorSubject<number>(-1);
  private selectedTestbedSubject = new BehaviorSubject<string | null>(null);

  selectedButtonIndex$ = this.selectedButtonIndexSubject.asObservable();
  selectedTestbed$ = this.selectedTestbedSubject.asObservable();

  get selectedButtonIndex(): number {
    return this.selectedButtonIndexSubject.value;
  }

  set selectedButtonIndex(index: number) {
    this.selectedButtonIndexSubject.next(index);
  }

  get selectedTestbed(): string | null {
    return this.selectedTestbedSubject.value;
  }

  set selectedTestbed(testbed: string | null) {
    this.selectedTestbedSubject.next(testbed);
  }
}
