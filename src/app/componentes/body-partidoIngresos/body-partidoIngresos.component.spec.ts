import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyPartidoIngresosComponent } from './body-partidoIngresos.component';

describe('BodyPartidoIngresosComponent', () => {
  let component: BodyPartidoIngresosComponent;
  let fixture: ComponentFixture<BodyPartidoIngresosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyPartidoIngresosComponent]
    });
    fixture = TestBed.createComponent(BodyPartidoIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
