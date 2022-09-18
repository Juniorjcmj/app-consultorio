import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteDetalheComponent } from './paciente-detalhe.component';

describe('PacienteDetalheComponent', () => {
  let component: PacienteDetalheComponent;
  let fixture: ComponentFixture<PacienteDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacienteDetalheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacienteDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
