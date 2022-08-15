import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormGroupComponent } from './user-form-group.component';

describe('UserFormGroupComponent', () => {
  let component: UserFormGroupComponent;
  let fixture: ComponentFixture<UserFormGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFormGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
