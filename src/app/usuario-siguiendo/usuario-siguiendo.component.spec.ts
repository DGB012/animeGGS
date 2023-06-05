import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioSiguiendoComponent } from './usuario-siguiendo.component';

describe('UsuarioSiguiendoComponent', () => {
  let component: UsuarioSiguiendoComponent;
  let fixture: ComponentFixture<UsuarioSiguiendoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioSiguiendoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioSiguiendoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
