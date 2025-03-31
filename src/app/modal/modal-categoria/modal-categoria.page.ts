import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonList, IonItem, IonLabel, IonInput, IonTextarea } from '@ionic/angular/standalone';
import { ServiceService } from 'src/app/services/service.service';
import { ModalController } from '@ionic/angular/standalone';
import { closeOutline, arrowBackOutline, checkmarkOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ErrorComponent } from 'src/app/components/error/error.component';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-modal-categoria',
  templateUrl: './modal-categoria.page.html',
  styleUrls: ['./modal-categoria.page.scss'],
  standalone: true,
  imports: [IonTextarea, IonInput, IonLabel, IonItem, IonList, IonIcon, IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, ErrorComponent]
})
export class ModalCategoriaPage implements OnInit {

  @Input() titulo: string = '';
  @Input() data: any;
  private _service: ServiceService = inject(ServiceService);
  private _categoria:CategoriaService = inject(CategoriaService);
  private modalCtrl: ModalController = inject(ModalController);
  private _fb:FormBuilder = new FormBuilder();
  form: FormGroup = new FormGroup({});

  constructor() { 
    addIcons({ closeOutline, arrowBackOutline, checkmarkOutline });
  }

  ngOnInit() {
    this.form = this._fb.group({
      id: [this.data?.id],
      nombre: [this.data?.nombre, Validators.compose([Validators.required])],
      descripcion: [this.data?.descripcion],
    });
  }

  salir(mensaje:string, rol:string, data:any) {
    if (mensaje != '') {
      this._service.Alert({ message: mensaje, buttons: ['Aceptar'] });
    }
    this.modalCtrl.dismiss(data, rol);
  }

  async guardar(event:any) {
    if (this.form.valid) {
      this._service.addLoading(event.target);
      const data = this.form.getRawValue();
      console.log(data);
      if (this.data?.id) {
        const res:any = await this._categoria.update(this.data?.id, data);
        if (!res.error) {
          this.salir('Categoria actualizada', 'success', data);
        }
      } else {
        const res:any = await this._categoria.save(data);
        if (!res.error) {
          this.salir('Categoria guardada', 'success', res);
        }
      }
      this._service.removeLoading(event.target);
    }
  }

}
