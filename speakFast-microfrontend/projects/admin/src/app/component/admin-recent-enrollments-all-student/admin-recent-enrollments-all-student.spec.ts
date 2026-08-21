import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRecentEnrollmentsAllStudent } from './admin-recent-enrollments-all-student';

describe('AdminRecentEnrollmentsAllStudent', () => {
  let component: AdminRecentEnrollmentsAllStudent;
  let fixture: ComponentFixture<AdminRecentEnrollmentsAllStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRecentEnrollmentsAllStudent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminRecentEnrollmentsAllStudent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
