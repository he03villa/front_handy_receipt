import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController, AlertOptions } from '@ionic/angular/standalone';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private _router:Router = inject(Router);
  private alertController: AlertController = inject(AlertController);
  private modalCtrl: ModalController = inject(ModalController);

  constructor() { }

  /**
   * Navigate to a given url
   * @param url The url to navigate to
   */
  url(url:string) {
    this._router.navigate([url]);
  }

  /**
   * Creates an alert with the given data and presents it
   * @param data The options to create the alert
   */
  async Alert(data:AlertOptions) {
    const alert = await this.alertController.create(data);
    await alert.present();
  }

  /**
   * Transforms an observable into a promise, also handle the error with an alert
   * @param subscribe The observable to transform
   * @returns A promise that resolve with the data of the observable or an error
   */
  promise(subscribe:Observable<any>) {
    return new Promise((resolve, reject) => subscribe.subscribe((resul) => resolve(resul), async error => {
      const dataAler:AlertOptions = {};
      console.log(error);
      if (error.status == 500) {
        dataAler.message = error.error.message;
      } else if (error.status == 400) {
        if (error.error.errors) {
          dataAler.message = error.error.errors[0].message;
        } else {
          dataAler.message = error;
        }
      }
      if (dataAler.message !== 'El usuario no se ha activado') {
        if (error.status == 401) {
          const res:any = await this.Alert(dataAler);
          console.log('entro');
          localStorage.removeItem('dataUser');
          location.href = '';
          resolve(error);
        } else {
          this.Alert(dataAler);
        }
        resolve(error);
      } else {
        resolve({ code: 1001, messege: "Activar cuenta" });
      }
    }));
  }

  /**
   * Clears the user data from local storage and navigates to the login page.
   */
  cerrarSesion() {
    localStorage.removeItem('dataUser');
    this.url('login');
  }

  /**
   * Adds a loading spinner to the element passed as a parameter and disables it
   * @param target The HTML element to add the spinner to
   */
  addLoading(target: any) {
    if (target) {
      target.innerHTML += " <i class='fas fa-spinner fa-pulse'></i>"; 
      target.disabled = true;
    } else {
      console.error('El elemento HTML es nulo.');
    }
  }

  /**
   * Removes the loading spinner from the element passed as a parameter and enables it
   * @param target The HTML element to remove the spinner from
   */
  removeLoading(target: any) {
    if (target) {
      let spinner = target.lastChild;
      if (spinner) {
        target.removeChild(spinner);
      }
      target.disabled = false;
    } else {
      console.error('El elemento HTML es nulo.');
    }
  }

  /**
   * Converts a file to a data URL
   * @param file The file to convert
   * @returns A promise that resolves with the data URL of the file
   */
  cargar_img(file:File) {
    return new Promise<string | null | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      }
    });
  }

  /**
   * Validates if the given number is valid, not NaN, undefined, or null.
   */
  validarNumero(valor:number) {
    if (isNaN(valor) === true || valor <= 0.000000 || valor === undefined || valor === null) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Validates if the given number is valid, not NaN, undefined or null.
   * @param valor The number to validate.
   * @returns true if the number is valid, false otherwise.
   */
  validarNumeroConCero(valor:number) {
    if (isNaN(valor) === true || valor === undefined || valor === null) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Validates if the given string is valid, not empty or null.
   * @param valor The string to validate.
   * @returns true if the string is valid, false otherwise.
   */
  validarText(valor:string) {
    if (valor === undefined || valor == null || valor === '' || valor === 'null' || valor.length <= 0) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Validates if the given email string matches a standard email format.
   * 
   * @param email The email string to validate.
   * @returns true if the email matches the pattern, false otherwise.
   */
  validarCorreo(email:string) {
    const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(pattern)) {
        return true;
    } else {
        return false;
    }
  }

  /**
   * Changes the source of the given image element to the given error image.
   * This can be used to handle image loading errors.
   * @param event The event that triggered this function.
   * @param errorImg The URL of the error image to display.
   */
  errorImg(event:any, errorImg:string) {
    event.target.src = errorImg;
  }

  async abrirModal(data:any) {
    const modal = await this.modalCtrl.create(data);
    return modal;
  }
}
