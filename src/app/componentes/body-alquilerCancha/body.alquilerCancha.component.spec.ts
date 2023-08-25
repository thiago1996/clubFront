import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyAlquilerCanchaComponent } from './body.alquilerCancha.component';

describe('BodyAlquilerCanchaComponent', () => {
  let component: BodyAlquilerCanchaComponent;
  let fixture: ComponentFixture<BodyAlquilerCanchaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyAlquilerCanchaComponent]
    });
    fixture = TestBed.createComponent(BodyAlquilerCanchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
