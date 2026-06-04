import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgroMap } from './agro-map';

describe('AgroMap', () => {
  let component: AgroMap;
  let fixture: ComponentFixture<AgroMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgroMap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgroMap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
