import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFarmer } from './create-farmer';

describe('CreateFarmer', () => {
  let component: CreateFarmer;
  let fixture: ComponentFixture<CreateFarmer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFarmer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFarmer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
