import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedimentoFormComponent } from './procedimento-form.component';

describe('ProcedimentoFormComponent', () => {
  let component: ProcedimentoFormComponent;
  let fixture: ComponentFixture<ProcedimentoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcedimentoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcedimentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
