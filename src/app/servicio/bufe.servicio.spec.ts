import { TestBed } from '@angular/core/testing';

import { BufeServicio } from './bufe.servicio';

describe('BufeServicio', () => {
  let service: BufeServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BufeServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
