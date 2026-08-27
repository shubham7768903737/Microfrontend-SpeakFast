import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminUpcomingBatches } from './admin-upcoming-batches';

declare function beforeEach(action: () => void | Promise<void>): void;
declare function describe(description: string, specDefinitions: () => void): void;
declare function it(description: string, testFunction: () => void | Promise<void>): void;
declare function expect(actual: unknown): { toBeTruthy(): void };

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
