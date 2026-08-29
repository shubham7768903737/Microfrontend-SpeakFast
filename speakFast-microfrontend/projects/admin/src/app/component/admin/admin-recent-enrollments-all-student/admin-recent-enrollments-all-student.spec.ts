import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRecentEnrollmentsAllStudent } from './admin-recent-enrollments-all-student';

declare const beforeEach: (action: () => void | Promise<void>) => void;
declare const describe: (description: string, specDefinitions: () => void) => void;
declare const expect: (actual: unknown) => { toBeTruthy: () => void };
declare const it: (description: string, testFunction: () => void | Promise<void>) => void;

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
