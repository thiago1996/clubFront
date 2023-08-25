import { TestBed } from '@angular/core/testing';

import { PagoServicioServicio} from './pagoServicio.servicio';

describe('PagoServicioServicio', () => {
  let service: PagoServicioServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagoServicioServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
