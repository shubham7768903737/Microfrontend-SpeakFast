import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkSent } from './link-sent';

describe('LinkSent', () => {
  let component: LinkSent;
  let fixture: ComponentFixture<LinkSent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkSent],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkSent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
