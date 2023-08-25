import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyBufeComponent } from './body.bufe.component';

describe('BodyBufeComponent', () => {
  let component: BodyBufeComponent;
  let fixture: ComponentFixture<BodyBufeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyBufeComponent]
    });
    fixture = TestBed.createComponent(BodyBufeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
