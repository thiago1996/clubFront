import { TestBed } from '@angular/core/testing';

import { CanchaServicio } from './cancha.servicio';

describe('CanchaServicio', () => {
  let service: CanchaServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanchaServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
