import { inject, Injectable } from '@angular/core';
import { ServiceService } from './service.service';
import { DataService } from './data.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _data: DataService = inject(DataService);
  private _service: ServiceService = inject(ServiceService);

  constructor() { }

  async register(data:any) {
    const url = `${ environment.urlApi }${ environment.api.auth.service.register }`;
    return this._service.promise(this._data.metodoPost(url, data));
  }

  async registerEmpresa(data:any) {
    const url = `${ environment.urlApi }${environment.api.empresa.name}/${ environment.api.empresa.service.register }`;
    console.log(url);
    return this._service.promise(this._data.metodoPost(url, data));
  }

  async login(data:any) {
    const url = `${ environment.urlApi }${ environment.api.auth.service.login }`;
    return this._service.promise(this._data.metodoPost(url, data));
  }

  async getUser() {
    const url = `${ environment.urlApi }${ environment.api.auth.service.show }`;
    return this._service.promise(this._data.metodoGet(url));
  }

  async updateEmpresa(id:any, data:any) {
    const url = `${ environment.urlApi }${ environment.api.empresa.name }/${ id }`;
    return this._service.promise(this._data.metodoPut(url, data));
  }
}
