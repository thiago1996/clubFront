import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyJugadorCuotaComponent } from './body.jugadorCuota.component';

describe('BodyJugadorCuotaComponent', () => {
  let component: BodyJugadorCuotaComponent;
  let fixture: ComponentFixture<BodyJugadorCuotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyJugadorCuotaComponent]
    });
    fixture = TestBed.createComponent(BodyJugadorCuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
