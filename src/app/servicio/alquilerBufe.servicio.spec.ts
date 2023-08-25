import { TestBed } from '@angular/core/testing';

import { AlquilerBufeServicio } from './alquilerBufe.servicio';

describe('AlquilerBufeServicio', () => {
  let service: AlquilerBufeServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlquilerBufeServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
