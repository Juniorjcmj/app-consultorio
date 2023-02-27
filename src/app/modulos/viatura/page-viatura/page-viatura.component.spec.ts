import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageViaturaComponent } from './page-viatura.component';

describe('PageViaturaComponent', () => {
  let component: PageViaturaComponent;
  let fixture: ComponentFixture<PageViaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageViaturaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageViaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
