import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioViendoComponent } from './usuario-viendo.component';

describe('UsuarioViendoComponent', () => {
  let component: UsuarioViendoComponent;
  let fixture: ComponentFixture<UsuarioViendoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioViendoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioViendoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
