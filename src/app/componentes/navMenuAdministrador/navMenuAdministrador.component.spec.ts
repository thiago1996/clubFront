import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMenuAdministradorComponent } from './navMenuAdministrador.component';

describe('NavMenuAdministradorComponent', () => {
  let component: NavMenuAdministradorComponent;
  let fixture: ComponentFixture<NavMenuAdministradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavMenuAdministradorComponent]
    });
    fixture = TestBed.createComponent(NavMenuAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
