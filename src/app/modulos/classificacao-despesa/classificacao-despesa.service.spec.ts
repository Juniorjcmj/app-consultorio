import { TestBed } from '@angular/core/testing';

import { ClassificacaoDespesaService } from './classificacao-despesa.service';

describe('ClassificacaoDespesaService', () => {
  let service: ClassificacaoDespesaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassificacaoDespesaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
