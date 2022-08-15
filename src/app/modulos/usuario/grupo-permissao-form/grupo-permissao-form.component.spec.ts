import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoPermissaoFormComponent } from './grupo-permissao-form.component';

describe('GrupoPermissaoFormComponent', () => {
  let component: GrupoPermissaoFormComponent;
  let fixture: ComponentFixture<GrupoPermissaoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrupoPermissaoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupoPermissaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
