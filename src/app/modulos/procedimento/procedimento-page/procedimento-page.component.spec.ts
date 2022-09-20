import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedimentoPageComponent } from './procedimento-page.component';

describe('ProcedimentoPageComponent', () => {
  let component: ProcedimentoPageComponent;
  let fixture: ComponentFixture<ProcedimentoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcedimentoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcedimentoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
