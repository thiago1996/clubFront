import { TestBed } from '@angular/core/testing';

import { PartidoServicio } from './partido.servicio';

describe('PartidoServicio', () => {
  let service: PartidoServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartidoServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
