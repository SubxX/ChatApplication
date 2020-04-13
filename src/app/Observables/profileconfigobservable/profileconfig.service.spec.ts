import { TestBed } from '@angular/core/testing';

import { ProfileconfigService } from './profileconfig.service';

describe('ProfileconfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileconfigService = TestBed.get(ProfileconfigService);
    expect(service).toBeTruthy();
  });
});
