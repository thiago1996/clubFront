import { TestBed } from '@angular/core/testing';

import { PagoCuotaEntrenadorServicio } from './pagoCuotaEntrenador.servicio';

describe('PagoCuotaEntrenadorServicio', () => {
  let service: PagoCuotaEntrenadorServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagoCuotaEntrenadorServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
