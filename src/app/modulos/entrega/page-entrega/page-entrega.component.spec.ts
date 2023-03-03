import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEntregaComponent } from './page-entrega.component';

describe('PageEntregaComponent', () => {
  let component: PageEntregaComponent;
  let fixture: ComponentFixture<PageEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageEntregaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
