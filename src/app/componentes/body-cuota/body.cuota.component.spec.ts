import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyCuotaComponent } from './body.cuota.component';

describe('BodyCuotaComponent', () => {
  let component: BodyCuotaComponent;
  let fixture: ComponentFixture<BodyCuotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyCuotaComponent]
    });
    fixture = TestBed.createComponent(BodyCuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
