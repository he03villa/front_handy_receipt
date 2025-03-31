import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonItem, IonLabel, IonDatetime, IonList, IonSelectOption, IonSelect, IonTextarea, IonInput } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';
import { ProductoService } from 'src/app/services/producto.service';
import { ServiceService } from 'src/app/services/service.service';
import { FacturaService } from 'src/app/services/factura.service';
import { addIcons } from 'ionicons';
import { closeOutline, arrowBackOutline, checkmarkOutline, addOutline } from 'ionicons/icons';
import { ErrorComponent } from 'src/app/components/error/error.component';

@Component({
  selector: 'app-modal-add-update-factura',
  templateUrl: './modal-add-update-factura.page.html',
  styleUrls: ['./modal-add-update-factura.page.scss'],
  standalone: true,
  imports: [IonInput, IonList, IonLabel, IonItem, IonIcon, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, ErrorComponent, IonSelectOption, IonSelect, IonTextarea]
})
export class ModalAddUpdateFacturaPage implements OnInit {

  @Input() titulo: string = '';
  @Input() data: any;
  private _service: ServiceService = inject(ServiceService);
  private modalCtrl: ModalController = inject(ModalController);
  private _producto: ProductoService = inject(ProductoService);
  private _factura:FacturaService = inject(FacturaService);
  private _fb:FormBuilder = new FormBuilder();
  form: FormGroup = new FormGroup({});
  arrayProductos:Array<any> = [];
  arrayDetalles:Array<any> = [];

  constructor() {
    addIcons({ closeOutline, arrowBackOutline, checkmarkOutline, addOutline });
   }

  ngOnInit() {
    this.cargarProductos();
    this.iniciarForm();
  }

  async cargarProductos() {
    const res:any = await this._producto.getProductosActivos();
    if (!res.error) {
      console.log(res);
      this.arrayProductos = res;
    }
  }

  salir(mensaje:string, rol:string, data:any) {
    if (mensaje != '') {
      this._service.Alert({ message: mensaje, buttons: ['Aceptar'] });
    }
    this.modalCtrl.dismiss(data, rol);
  }

  iniciarForm() {
    this.form = this._fb.group({ 
      id: [this.data?.id],
      total: [this.data?.total, Validators.compose([Validators.required])],
      detalles: this._fb.array([]),
    });

    this.arrayDetalles = this.data?.detalles || [];

    this.arrayDetalles.forEach((item:any) => {
      this.getFormArray('detalles').push(this.addItem(item));
    });
  }

  getFormArray(campo: string): FormArray {
    return this.form.get(campo) as FormArray;
  }

  addItem(item:any): FormGroup {
    return this._fb.group({
      id: [item?.id],
      producto_id: [item?.producto_id, Validators.compose([Validators.required])],
      cantidad: [item?.cantidad, Validators.compose([Validators.required, Validators.min(1)])],
      precio: [item?.precio, Validators.compose([Validators.required])],
      observaciones: [item?.observaciones],
    });
  }

  addProduct() {
    const data = {
      id: 0,
      producto_id: '',
      cantidad: 0,
      precio: 0,
      observaciones: '',
    };
    this.arrayDetalles.push(data);
    this.getFormArray('detalles').push(this.addItem(data));
  }

  removeProduct(index:number) {
    this.arrayDetalles.splice(index, 1);
    this.arrayProductos.splice(index, 1);
    this.total();
  }

  changeProduct(event:any, index:number) {
    console.log(event.target.value);
    const data = this.arrayProductos.find((item:any) => item.id == event.target.value);
    this.arrayDetalles[index].producto_id = data.id;
    this.arrayDetalles[index].precio = data.precio;
    this.getFormArray('detalles').at(index).get('precio')?.setValue(data.precio);
    this.total();
  }

  changeCantidad(event:any, index:number) {
    this.arrayDetalles[index].cantidad = event.target.value;
    this.total();
  }

  changeObservaciones(event:any, index:number) {
    this.arrayDetalles[index].observaciones = event.target.value;
  }

  total() {
    let total = 0;
    total = this.arrayDetalles.reduce((acc, item) => acc + (item.cantidad * item.precio), 0);
    this.form.get('total')?.setValue(total);
  }

  async guardar(event:any) {
    if (this.form.valid) {
      this._service.addLoading(event.target);
      const data = this.form.getRawValue();
      console.log(data);
      let res:any;
      if (this.data?.id) {
        res = await this._factura.update(this.data?.id, data);
      } else {
        res = await this._factura.save(data);
      }
      if (!res.error) {
        this.salir(this.data?.id ? 'Factura actualizada' : 'Factura guardada', 'success', res);
      }
      this._service.removeLoading(event.target);
    }
  }

}
