import { TestBed } from '@angular/core/testing';

import { JugadorCuotaServicio } from './jugadorCuota.servicio';

describe('JugadorCuotaServicio', () => {
  let service: JugadorCuotaServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JugadorCuotaServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
