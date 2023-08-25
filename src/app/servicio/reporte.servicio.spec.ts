import { TestBed } from '@angular/core/testing';

import { ReporteServicio } from './reporte.servicio';

describe('ReporteServicio', () => {
  let service: ReporteServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
