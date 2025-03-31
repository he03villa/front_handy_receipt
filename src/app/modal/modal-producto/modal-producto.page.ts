import { Component, forwardRef, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonItem, IonLabel, IonList, IonSelectOption, IonInput, IonSelect, IonTextarea } from '@ionic/angular/standalone';
import { ServiceService } from 'src/app/services/service.service';
import { ProductoService } from 'src/app/services/producto.service';
import { ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline, arrowBackOutline, checkmarkOutline, imagesOutline, cameraOutline, closeCircle } from 'ionicons/icons';
import { ErrorComponent } from 'src/app/components/error/error.component';
import { Camera, CameraResultType, CameraSource  } from '@capacitor/camera';
import { CategoriaService } from 'src/app/services/categoria.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.page.html',
  styleUrls: ['./modal-producto.page.scss'],
  standalone: true,
  imports: [IonInput, IonList, IonLabel, IonItem, IonIcon, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, ErrorComponent, IonSelectOption, IonSelect, IonTextarea],
})
export class ModalProductoPage implements OnInit {

  @Input() titulo: string = '';
  @Input() data: any;
  private _service: ServiceService = inject(ServiceService);
  private modalCtrl: ModalController = inject(ModalController);
  private _producto: ProductoService = inject(ProductoService);
  private _categoria:CategoriaService = inject(CategoriaService);
  private _fb:FormBuilder = new FormBuilder();
  form: FormGroup = new FormGroup({ nombre: new FormControl('') });
  arrayCategorias:Array<any> = [];

  camaraSource = CameraSource;
  urlImage = `${environment.urlImagen}storage/images/producto`;

  constructor() {
    addIcons({ closeOutline, arrowBackOutline, checkmarkOutline, imagesOutline, cameraOutline, closeCircle });
    this.cargarCategorias();
    //this.iniciarForm();
  }

  ngOnInit() {
    this.iniciarForm();
    console.log(this.data, this.form);
  }

  iniciarForm() {
    this.form = this._fb.group({
      id: [this.data?.id],
      nombre: [this.data?.nombre, Validators.compose([Validators.required])],
      descripcion: [this.data?.descripcion],
      categoria_id: [this.data?.categoria_id, Validators.compose([Validators.required])],
      precio: [this.data?.precio, Validators.compose([Validators.required])],
      imagen: this._fb.group({
        base64: [`${ this.urlImage }${this.data?.imagen}`],
        name: [''],
      })
    });
  }

  salir(mensaje:string, rol:string, data:any) {
    if (mensaje != '') {
      this._service.Alert({ message: mensaje, buttons: ['Aceptar'] });
    }
    this.modalCtrl.dismiss(data, rol);
  }

  getFormGroup(campo: string): FormGroup {
    const form = this.form.get(campo) as FormGroup;
    return form;
  }

  errorImagen($event:any, form:FormGroup) {
    form.get('base64')?.setValue('');
  }

  async takePicture(source: CameraSource) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: source
      });

      console.log(image);

      this.getFormGroup('imagen').get('base64')?.setValue(image.dataUrl);
      this.getFormGroup('imagen').get('name')?.setValue(`${ Date.now() }.${image.format}`);
    } catch (error) {
      console.error('Error al capturar imagen', error);
    }
  }

  removeImage() {
    this.getFormGroup('imagen').get('base64')?.setValue('');
    this.getFormGroup('imagen').get('name')?.setValue('');
  }

  async cargarCategorias() {
    const res:any = await this._categoria.getCategoriasActivas();
    if (!res.error) {
      this.arrayCategorias = res;
      console.log(res);
    }
  }

  async guardar(event:any) {
    if (this.form.valid) {
      this._service.addLoading(event.target);
      const data = this.form.getRawValue();
      console.log(data);
      let res:any;
      if (this.data?.id) {
        res = await this._producto.update(this.data?.id, data);
      } else {
        res = await this._producto.save(data);
      }
      if (!res.error) {
        this.salir(this.data?.id ? 'Producto actualizada' : 'Producto guardada', 'success', res);
      }
      this._service.removeLoading(event.target);
    }
  }

}
