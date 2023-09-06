import { TestBed } from '@angular/core/testing';

import { TransaccionServicio } from './transaccion.servicio';

describe('TransaccionServicio', () => {
  let service: TransaccionServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransaccionServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
