import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageOperadoraComponent } from './page-operadora.component';

describe('PageOperadoraComponent', () => {
  let component: PageOperadoraComponent;
  let fixture: ComponentFixture<PageOperadoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageOperadoraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageOperadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
