import { TestBed } from '@angular/core/testing';

import { CuotaServicio } from './cuota.servicio';

describe('CuotaServicio', () => {
  let service: CuotaServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuotaServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
