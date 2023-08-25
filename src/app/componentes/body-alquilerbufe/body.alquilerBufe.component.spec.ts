import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyAlquilerBufeComponent } from './body.alquilerBufe.component';

describe('BodyAlquilerBufeComponent', () => {
  let component: BodyAlquilerBufeComponent;
  let fixture: ComponentFixture<BodyAlquilerBufeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyAlquilerBufeComponent]
    });
    fixture = TestBed.createComponent(BodyAlquilerBufeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
