import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalAddUpdateFacturaPage } from './modal-add-update-factura.page';

describe('ModalAddUpdateFacturaPage', () => {
  let component: ModalAddUpdateFacturaPage;
  let fixture: ComponentFixture<ModalAddUpdateFacturaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddUpdateFacturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
