import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllstudents } from './admin-allstudents';

describe('AdminAllstudents', () => {
  let component: AdminAllstudents;
  let fixture: ComponentFixture<AdminAllstudents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAllstudents],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminAllstudents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
