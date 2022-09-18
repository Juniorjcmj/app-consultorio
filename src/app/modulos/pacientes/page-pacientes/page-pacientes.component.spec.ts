import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePacientesComponent } from './page-pacientes.component';

describe('PagePacientesComponent', () => {
  let component: PagePacientesComponent;
  let fixture: ComponentFixture<PagePacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagePacientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagePacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
