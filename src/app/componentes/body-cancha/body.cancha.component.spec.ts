import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyCanchaComponent } from './body.cancha.component';

describe('BodyCanchaComponent', () => {
  let component: BodyCanchaComponent;
  let fixture: ComponentFixture<BodyCanchaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyCanchaComponent]
    });
    fixture = TestBed.createComponent(BodyCanchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
