import { TestBed } from '@angular/core/testing';

import { ItpcDataArrivalFlightService } from './itpc-data-arrival-flight.service';

describe('ItpcDataArrivalFlightService', () => {
  let service: ItpcDataArrivalFlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItpcDataArrivalFlightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
