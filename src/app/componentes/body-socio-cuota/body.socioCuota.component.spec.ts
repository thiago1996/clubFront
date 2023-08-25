import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodySocioCuotaComponent } from './body.socioCuota.component';

describe('BodySocioCuotaComponent', () => {
  let component: BodySocioCuotaComponent;
  let fixture: ComponentFixture<BodySocioCuotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodySocioCuotaComponent]
    });
    fixture = TestBed.createComponent(BodySocioCuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
