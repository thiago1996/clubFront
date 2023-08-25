import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyPagoServicioComponent } from './body.pagoServicio.component';

describe('BodyPagoServicioComponent', () => {
  let component: BodyPagoServicioComponent;
  let fixture: ComponentFixture<BodyPagoServicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyPagoServicioComponent]
    });
    fixture = TestBed.createComponent(BodyPagoServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
