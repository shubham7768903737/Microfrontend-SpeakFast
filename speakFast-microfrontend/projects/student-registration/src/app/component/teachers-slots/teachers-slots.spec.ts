import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersSlots } from './teachers-slots';

describe('TeachersSlots', () => {
  let component: TeachersSlots;
  let fixture: ComponentFixture<TeachersSlots>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeachersSlots],
    }).compileComponents();

    fixture = TestBed.createComponent(TeachersSlots);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
