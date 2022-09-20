import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedimentoListComponent } from './procedimento-list.component';

describe('ProcedimentoListComponent', () => {
  let component: ProcedimentoListComponent;
  let fixture: ComponentFixture<ProcedimentoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcedimentoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcedimentoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
