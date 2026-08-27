import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeachers } from './admin-teachers';

declare function describe(description: string, specDefinitions: () => void): void;
declare function beforeEach(action: () => void | Promise<void>): void;
declare function it(description: string, testFunction: () => void | Promise<void>): void;
declare function expect(actual: unknown): { toBeTruthy(): void };

describe('AdminTeachers', () => {
  let component: AdminTeachers;
  let fixture: ComponentFixture<AdminTeachers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTeachers],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminTeachers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
