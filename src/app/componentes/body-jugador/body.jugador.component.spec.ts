import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyJugadorComponent } from './body.jugador.component';

describe('BodyJugadorComponent', () => {
  let component: BodyJugadorComponent;
  let fixture: ComponentFixture<BodyJugadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyJugadorComponent]
    });
    fixture = TestBed.createComponent(BodyJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
