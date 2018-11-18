import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartForRecordsComponent } from './chart-for-records.component';

describe('ChartForRecordsComponent', () => {
  let component: ChartForRecordsComponent;
  let fixture: ComponentFixture<ChartForRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartForRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartForRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
