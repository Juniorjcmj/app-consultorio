import { TestBed } from '@angular/core/testing';

import { ComprovanteService } from './comprovante.service';

describe('ComprovanteService', () => {
  let service: ComprovanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComprovanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
