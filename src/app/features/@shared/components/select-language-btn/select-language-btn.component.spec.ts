import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLanguageBtnComponent } from './select-language-btn.component';

describe('SelectLanguageBtnComponent', () => {
  let component: SelectLanguageBtnComponent;
  let fixture: ComponentFixture<SelectLanguageBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectLanguageBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectLanguageBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
