import { TestBed } from '@angular/core/testing';

import { JugadorServicio } from './jugador.servicio';

describe('JugadorServicio', () => {
  let service: JugadorServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JugadorServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
