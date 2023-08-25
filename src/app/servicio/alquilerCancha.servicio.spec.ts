import { TestBed } from '@angular/core/testing';

import { AlquilerCanchaServicio } from './alquilerCancha.servicio';

describe('AlquilerCanchaServicio', () => {
  let service: AlquilerCanchaServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlquilerCanchaServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
