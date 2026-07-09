import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmersDetails } from './farmers-details';

describe('FarmersDetails', () => {
  let component: FarmersDetails;
  let fixture: ComponentFixture<FarmersDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmersDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmersDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
