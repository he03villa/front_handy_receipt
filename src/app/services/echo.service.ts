import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EchoService {

  private echo: Echo<any>;

  constructor() { 
    (window as any).Pusher = Pusher;
    this.echo = new Echo({
      broadcaster: 'reverb',
      key: environment.VITE_REVERB_APP_KEY,
      wsHost: environment.VITE_REVERB_HOST,
      wsPort: environment.VITE_REVERB_PORT,
      wssPort: environment.VITE_REVERB_PORT,
      forceTLS: (environment.VITE_REVERB_SCHEME ?? 'https') === 'https',
      enabledTransports: ['ws', 'ws'],
      /*authEndpoint: `${environment.urlApi}broadcasting/auth`,
      auth: {
        headers: {
          Accept: 'application/json',
          "X-Authorization": `Bearer ${ localStorage.getItem('token') }`
        }
      }*/
    });
  }

  getEcho() {
    console.log(this.echo);
    return this.echo;
  }
}
