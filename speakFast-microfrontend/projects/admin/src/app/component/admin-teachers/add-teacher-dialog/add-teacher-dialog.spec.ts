import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeacherDialog } from './add-teacher-dialog';

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
