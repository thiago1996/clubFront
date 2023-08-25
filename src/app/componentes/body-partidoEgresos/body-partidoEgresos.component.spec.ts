import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyPartidoEgresosComponent } from './body-partidoegresos.component';

describe('BodyPartidoEgresosComponent', () => {
  let component: BodyPartidoEgresosComponent;
  let fixture: ComponentFixture<BodyPartidoEgresosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyPartidoEgresosComponent]
    });
    fixture = TestBed.createComponent(BodyPartidoEgresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
