import { TestBed } from '@angular/core/testing';

import { MrsnvGuard } from './mrsnv.guard';

describe('MrsnvGuard', () => {
  let guard: MrsnvGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MrsnvGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
