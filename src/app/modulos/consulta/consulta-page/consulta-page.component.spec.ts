import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaPageComponent } from './consulta-page.component';

describe('ConsultaPageComponent', () => {
  let component: ConsultaPageComponent;
  let fixture: ComponentFixture<ConsultaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
