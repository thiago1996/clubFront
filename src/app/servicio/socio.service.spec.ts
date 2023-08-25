import { TestBed } from '@angular/core/testing';

import { SocioServicio } from './socio.service';

describe('SocioServicio', () => {
  let service: SocioServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocioServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
