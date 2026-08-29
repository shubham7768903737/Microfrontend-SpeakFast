import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllstudents } from './admin-allstudents';

declare const beforeEach: (action: () => void | Promise<void>) => void;
declare const describe: (description: string, spec: () => void) => void;
declare const it: (description: string, spec: () => void | Promise<void>) => void;
declare const expect: (actual: unknown) => { toBeTruthy: () => void };

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
