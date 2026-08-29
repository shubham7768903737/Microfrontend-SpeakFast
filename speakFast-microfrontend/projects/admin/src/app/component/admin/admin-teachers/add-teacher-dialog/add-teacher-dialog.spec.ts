import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeacherDialog } from './add-teacher-dialog';

declare function describe(name: string, spec: () => void): void;
declare function beforeEach(spec: () => void | Promise<void>): void;
declare function it(name: string, spec: () => void | Promise<void>): void;
declare function expect(actual: unknown): { toBeTruthy(): void };

describe('AddTeacherDialog', () => {
  let component: AddTeacherDialog;
  let fixture: ComponentFixture<AddTeacherDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTeacherDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTeacherDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
