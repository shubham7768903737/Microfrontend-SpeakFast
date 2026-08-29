import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMyClasses } from './student-my-classes';

describe('StudentMyClasses', () => {
  let component: StudentMyClasses;
  let fixture: ComponentFixture<StudentMyClasses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentMyClasses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentMyClasses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
