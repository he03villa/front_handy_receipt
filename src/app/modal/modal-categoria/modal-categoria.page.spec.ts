import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalCategoriaPage } from './modal-categoria.page';

describe('ModalCategoriaPage', () => {
  let component: ModalCategoriaPage;
  let fixture: ComponentFixture<ModalCategoriaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
