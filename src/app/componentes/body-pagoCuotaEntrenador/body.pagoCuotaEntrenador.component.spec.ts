import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyPagoCuotaEntrenadorComponent } from './body.pagoCuotaEntrenador.component';

describe('BodyPagoCuotaEntrenadorComponent', () => {
  let component: BodyPagoCuotaEntrenadorComponent;
  let fixture: ComponentFixture<BodyPagoCuotaEntrenadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyPagoCuotaEntrenadorComponent]
    });
    fixture = TestBed.createComponent(BodyPagoCuotaEntrenadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
