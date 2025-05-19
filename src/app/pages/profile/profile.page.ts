import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonCol, IonRow, IonGrid, IonText, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonIcon } from '@ionic/angular/standalone';
import { NavComponent } from 'src/app/components/nav/nav.component';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceService } from 'src/app/services/service.service';
import { addIcons } from 'ionicons';
import { camera, checkmarkCircle, documentText, person } from 'ionicons/icons';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonTextarea, IonInput, IonItem, IonText, IonGrid, IonRow, IonCol, IonContent, CommonModule, FormsModule, NavComponent, ReactiveFormsModule]
})
export class ProfilePage implements OnInit {

  private fb:FormBuilder = new FormBuilder();
  private _auth:AuthService = inject(AuthService);
  form: FormGroup = new FormGroup({});
  _services:ServiceService = inject(ServiceService);
  dataUser:any;
  urlImage = `${environment.urlImagen}storage/images/empresa`;

  constructor() { 
    addIcons({ camera, person, documentText, checkmarkCircle });
    this.iniciarForm();
    this.cargarUser();
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.iniciarForm();
  }

  async cargarUser() {
    const loading = await this._services.Loading();
    loading.present();
    const res:any = await this._auth.getUser();
    if (!res.error) {
      this.dataUser = res.empresa;
      this.iniciarForm(this.dataUser);
      console.log(this.dataUser);
    }
    loading.dismiss();
  }

  iniciarForm(data:any = null) {
    this.form = this.fb.group({
      id: [data?.id],
      name: [data?.name, Validators.compose([Validators.required])],
      description: [data?.description],
      logo: this.fb.group({
        base64: [data?.logo_label, Validators.compose([Validators.required])],
        name: [''],
      })
    });
  }

  async cambiaImagen(event:any) {
    const file = event.target.files[0];
    const res:any = await this._services.cargar_img(file);
    this.form.get('logo')?.get('base64')?.setValue(res);
    this.form.get('logo')?.get('name')?.setValue(file.name);
  }

  async updateEmpresa(event:any) {
    this._services.addLoading(event.target);
    const res:any = await this._auth.updateEmpresa(this.form.value.id, this.form.value);
    if (!res.error) {
      const resul = await this._services.Alert({ message: 'Perfil actualizado', buttons: ['Aceptar'] });
    }
    this._services.removeLoading(event.target);
  }

}
