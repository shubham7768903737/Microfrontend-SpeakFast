import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpcomingBatches } from './admin-upcoming-batches';

describe('AdminUpcomingBatches', () => {
  let component: AdminUpcomingBatches;
  let fixture: ComponentFixture<AdminUpcomingBatches>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUpcomingBatches],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminUpcomingBatches);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
