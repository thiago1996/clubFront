import { TestBed } from '@angular/core/testing';

import { SocioCuotaServicio } from './socioCuota.servicio';

describe('SocioCuotaServicio', () => {
  let service: SocioCuotaServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocioCuotaServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
