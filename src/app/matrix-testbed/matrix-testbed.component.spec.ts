import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixTestbedComponent } from './matrix-testbed.component';

describe('MatrixTestbedComponent', () => {
  let component: MatrixTestbedComponent;
  let fixture: ComponentFixture<MatrixTestbedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrixTestbedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixTestbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
