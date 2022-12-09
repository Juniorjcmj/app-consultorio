import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageClassificacaoDespesaComponent } from './page-classificacao-despesa.component';

describe('PageClassificacaoDespesaComponent', () => {
  let component: PageClassificacaoDespesaComponent;
  let fixture: ComponentFixture<PageClassificacaoDespesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageClassificacaoDespesaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageClassificacaoDespesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
