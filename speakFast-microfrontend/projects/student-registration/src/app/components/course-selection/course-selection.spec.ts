import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSelection } from './course-selection';

describe('CourseSelection', () => {
  let component: CourseSelection;
  let fixture: ComponentFixture<CourseSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseSelection],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseSelection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
