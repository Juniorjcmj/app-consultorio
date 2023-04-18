import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageComprovanteComponent } from './page-comprovante.component';

describe('PageComprovanteComponent', () => {
  let component: PageComprovanteComponent;
  let fixture: ComponentFixture<PageComprovanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageComprovanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageComprovanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
