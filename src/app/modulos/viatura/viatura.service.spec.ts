import { TestBed } from '@angular/core/testing';

import { ViaturaService } from './viatura.service';

describe('ViaturaService', () => {
  let service: ViaturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViaturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
