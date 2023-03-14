import { TestBed } from '@angular/core/testing';

import { DmChannelService } from './dm-channel.service';

describe('DmChannelService', () => {
  let service: DmChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DmChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
