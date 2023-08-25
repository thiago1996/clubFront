import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyPartidoComponent } from './body.partido.component';

describe('BodyPartidoComponent', () => {
  let component: BodyPartidoComponent;
  let fixture: ComponentFixture<BodyPartidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyPartidoComponent]
    });
    fixture = TestBed.createComponent(BodyPartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
