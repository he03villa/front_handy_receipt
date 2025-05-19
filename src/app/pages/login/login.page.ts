import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonGrid, IonRow, IonCol, IonInput, IonButton, IonIcon, IonImg, IonText, IonLabel } from '@ionic/angular/standalone';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ServiceService } from 'src/app/services/service.service';
import { ErrorComponent } from 'src/app/components/error/error.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonLabel, IonInput, IonText, IonImg, IonCol, IonButton, IonIcon, IonRow, IonGrid, IonContent, CommonModule, FormsModule, ReactiveFormsModule, ErrorComponent]
})
export class LoginPage implements OnInit {

  private fb:FormBuilder = new FormBuilder();
  //private _user:UsuarioService = inject(UsuarioService);
  form: FormGroup = new FormGroup({});
  typePassword:boolean = false;
  private _auth:AuthService = inject(AuthService);
  _services:ServiceService = inject(ServiceService);

  constructor() {
    addIcons({ eyeOutline });
    addIcons({ eyeOffOutline });
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
    });

  }

  ngOnInit() {
  }

  async login(event:any) {
    this._services.addLoading(event.target);
    const data = this.form.getRawValue();
    const res:any = await this._auth.login(data);
    if (!res.error) {
      this.form.reset();
      localStorage.setItem('dataUser', JSON.stringify(res));
      localStorage.setItem('token', res.access_token);
      this._services.url('/dashboard');
    }
    this._services.removeLoading(event.target);
  }

}
