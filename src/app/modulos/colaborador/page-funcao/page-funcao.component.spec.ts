import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFuncaoComponent } from './page-funcao.component';

describe('PageFuncaoComponent', () => {
  let component: PageFuncaoComponent;
  let fixture: ComponentFixture<PageFuncaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageFuncaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageFuncaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
