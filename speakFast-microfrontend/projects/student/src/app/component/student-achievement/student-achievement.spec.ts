import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAchievement } from './student-achievement';

describe('StudentAchievement', () => {
  let component: StudentAchievement;
  let fixture: ComponentFixture<StudentAchievement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAchievement],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentAchievement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
