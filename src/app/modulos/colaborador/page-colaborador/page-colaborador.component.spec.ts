import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageColaboradorComponent } from './page-colaborador.component';

describe('PageColaboradorComponent', () => {
  let component: PageColaboradorComponent;
  let fixture: ComponentFixture<PageColaboradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageColaboradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
