import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMenuInvitadoComponent } from './navMenuInvitado.component';

describe('NavMenuInvitadoComponent', () => {
  let component: NavMenuInvitadoComponent;
  let fixture: ComponentFixture<NavMenuInvitadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavMenuInvitadoComponent]
    });
    fixture = TestBed.createComponent(NavMenuInvitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
