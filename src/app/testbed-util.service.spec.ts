import { TestBed } from '@angular/core/testing';

import { TestbedUtilService } from './testbed-util.service';

describe('TestbedUtilService', () => {
  let service: TestbedUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestbedUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
