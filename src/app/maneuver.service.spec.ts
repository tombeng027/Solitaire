import { TestBed, inject } from '@angular/core/testing';

import { Manserv } from './maneuver.service';

describe('Manserv', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Manserv]
    });
  });

  it('should be created', inject([Manserv], (service: Manserv) => {
    expect(service).toBeTruthy();
  }));
});
