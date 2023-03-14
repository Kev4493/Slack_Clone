import { TestBed } from '@angular/core/testing';

import { DmMessagesService } from './dm-messages.service';

describe('DmMessagesService', () => {
  let service: DmMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DmMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
