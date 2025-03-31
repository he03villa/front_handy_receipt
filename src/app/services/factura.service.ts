import { inject, Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ServiceService } from './service.service';
import { environment } from 'src/environments/environment.prod';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private _data: DataService = inject(DataService);
  private _service: ServiceService = inject(ServiceService);

  constructor() { }

  async getAllFacturas(data:any) {
    let params = new HttpParams();
    params = params.append('page', data.page);
    if (data.search) {
      params = params.append('search', data.search);
    }
    const url = `${ environment.urlApi }${ environment.api.orden.name }?${ params.toString() }`;
    return this._service.promise(this._data.metodoGet(url));
  }

  async getFactura(id:any) {
    const url = `${ environment.urlApi }${ environment.api.orden.name }/${ id }`;
    return this._service.promise(this._data.metodoGet(url));
  }

  async save(data:any) {
    const url = `${ environment.urlApi }${ environment.api.orden.name }`;
    return this._service.promise(this._data.metodoPost(url, data));
  }

  async update(id:any, data:any) {
    const url = `${ environment.urlApi }${ environment.api.orden.name }/${ id }`;
    return this._service.promise(this._data.metodoPut(url, data));
  }

  async delete(id:any) {
    const url = `${ environment.urlApi }${ environment.api.orden.name }/${ id }`;
    return this._service.promise(this._data.metodoDelete(url));
  }

  async updateStatus(id:any, data:any) {
    const url = `${ environment.urlApi }${ environment.api.orden.name }/${ id }/${ environment.api.orden.service.status }`;
    return this._service.promise(this._data.metodoPut(url, data));
  }

  async getDashboard() {
    const url = `${ environment.urlApi }${ environment.api.orden.name }/${ environment.api.orden.service.dashboard }`;
    return this._service.promise(this._data.metodoGet(url));
  }
}
