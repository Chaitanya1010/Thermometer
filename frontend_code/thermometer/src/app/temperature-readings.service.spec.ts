import { TestBed } from '@angular/core/testing';

import { TemperatureReadingsService } from './temperature-readings.service';

describe('TemperatureReadingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TemperatureReadingsService = TestBed.get(TemperatureReadingsService);
    expect(service).toBeTruthy();
  });
});
