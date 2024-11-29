import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpFormInputComponent } from './sign-up-form-input.component';

describe('SignUpFormInputComponent', () => {
  let component: SignUpFormInputComponent;
  let fixture: ComponentFixture<SignUpFormInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpFormInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpFormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
