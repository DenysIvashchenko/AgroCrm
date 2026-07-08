import { TestBed } from '@angular/core/testing';

import { WidgetRenderer } from './widget-renderer';

describe('WidgetRenderer', () => {
  let service: WidgetRenderer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetRenderer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
