import { TestBed } from '@angular/core/testing';

import { EntrenadorServicio } from './entrenador.servicio';

describe('EntrenadorServicio', () => {
  let service: EntrenadorServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntrenadorServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
