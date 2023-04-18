import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBancoComponent } from './page-banco.component';

describe('PageBancoComponent', () => {
  let component: PageBancoComponent;
  let fixture: ComponentFixture<PageBancoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageBancoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageBancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
