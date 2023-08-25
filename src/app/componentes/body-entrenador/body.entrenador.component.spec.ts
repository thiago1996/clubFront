import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyEntrenadorComponent } from './body.entrenador.component';

describe('BodyEntrenadorComponent', () => {
  let component: BodyEntrenadorComponent;
  let fixture: ComponentFixture<BodyEntrenadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyEntrenadorComponent]
    });
    fixture = TestBed.createComponent(BodyEntrenadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
