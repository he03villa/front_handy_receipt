import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonGrid, IonRow, IonCol, IonText, IonLabel, IonIcon, IonInput, IonButton } from '@ionic/angular/standalone';
import { ServiceService } from 'src/app/services/service.service';
import { ErrorComponent } from 'src/app/components/error/error.component';
import { addIcons } from 'ionicons';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonIcon, IonLabel, IonText, IonCol, IonRow, IonGrid, IonContent,  CommonModule, FormsModule, ReactiveFormsModule, ErrorComponent, IonInput, IonButton]
})
export class RegistroPage implements OnInit {

  private fb:FormBuilder = new FormBuilder();
  private _auth:AuthService = inject(AuthService);
  form: FormGroup = new FormGroup({});
  _services:ServiceService = inject(ServiceService);
  typePassword:boolean = false;
  typePasswordConfirmar:boolean = false;

  constructor() { 
    addIcons({ eyeOutline });
    addIcons({ eyeOffOutline });
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
      logo: this.fb.group({
        base64: [''],
        name: [''],
      }),
      nombre_empresa: ['', Validators.compose([Validators.required])],
      password_confirmation: ['', Validators.compose([Validators.required])],
      description: [''],
    });
  }

  ngOnInit() {
    
  }

  async cambiaImagen(event:any) {
    const file = event.target.files[0];
    const res:any = await this._services.cargar_img(file);
    this.form.get('logo')?.get('base64')?.setValue(res);
    this.form.get('logo')?.get('name')?.setValue(file.name);
  }

  errorImg(event:any, errorImg:string) {
    event.target.src = errorImg;
  }

  async register(event:any) {
    this._services.addLoading(event.target);
    const data = this.form.getRawValue();
    const res:any = await this._auth.registerEmpresa(data);
    if (!res.error) {
      console.log(res);
      this.form.reset();
      const resul = await this._services.Alert({ message: 'Registro exitoso', buttons: ['Aceptar'] });
      this._services.url('/login');
    }
    this._services.removeLoading(event.target);
  }

}
