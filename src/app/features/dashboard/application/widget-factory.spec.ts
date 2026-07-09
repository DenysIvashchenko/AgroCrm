import { TestBed } from '@angular/core/testing';

import { WidgetFactoryService } from './widget-factory';

describe('WidgetFactory', () => {
  let service: WidgetFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
