import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyTransaccionComponent } from './body-transaccion.component';

describe('BodyTransaccionComponent', () => {
  let component: BodyTransaccionComponent;
  let fixture: ComponentFixture<BodyTransaccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyTransaccionComponent]
    });
    fixture = TestBed.createComponent(BodyTransaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
