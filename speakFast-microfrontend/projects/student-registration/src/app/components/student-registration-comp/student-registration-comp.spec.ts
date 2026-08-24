import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRegistrationComp } from './student-registration-comp';

describe('StudentRegistrationComp', () => {
  let component: StudentRegistrationComp;
  let fixture: ComponentFixture<StudentRegistrationComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentRegistrationComp],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentRegistrationComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
