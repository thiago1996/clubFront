import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyCuentaComponent } from './body.cuenta.component';

describe('BodyCuentaComponent', () => {
  let component: BodyCuentaComponent;
  let fixture: ComponentFixture<BodyCuentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyCuentaComponent]
    });
    fixture = TestBed.createComponent(BodyCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
