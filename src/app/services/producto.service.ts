import { inject, Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ServiceService } from './service.service';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private _data: DataService = inject(DataService);
  private _service: ServiceService = inject(ServiceService);

  constructor() { }

  async getAllProductos(data:any) {
    let params = new HttpParams();
    params = params.append('page', data.page);
    if (data.search) {
      params = params.append('search', data.search);
    }
    const url = `${ environment.urlApi }${ environment.api.producto.name }?${ params.toString() }`;
    return this._service.promise(this._data.metodoGet(url));
  }

  async getProducto(id:any) {
    const url = `${ environment.urlApi }${ environment.api.producto.name }/${ id }`;
    return this._service.promise(this._data.metodoGet(url));
  }

  async save(data:any) {
    const url = `${ environment.urlApi }${ environment.api.producto.name }`;
    return this._service.promise(this._data.metodoPost(url, data));
  }

  async update(id:any, data:any) {
    const url = `${ environment.urlApi }${ environment.api.producto.name }/${ id }`;
    return this._service.promise(this._data.metodoPut(url, data));
  }

  async delete(id:any) {
    const url = `${ environment.urlApi }${ environment.api.producto.name }/${ id }`;
    return this._service.promise(this._data.metodoDelete(url));
  }

  async getCountActivosInactivos() {
    const url = `${ environment.urlApi }${ environment.api.producto.name }/${ environment.api.producto.service.countActivoInactivo }`;
    return this._service.promise(this._data.metodoGet(url));
  }

  async updateStatus(id:any, data:any) {
    const url = `${ environment.urlApi }${ environment.api.producto.name }/${ id }/${ environment.api.producto.service.status }`;;
    return this._service.promise(this._data.metodoPut(url, data));
  }

  async getProductosActivos() {
    const url = `${ environment.urlApi }${ environment.api.producto.name }/${ environment.api.producto.service.productosActivos }`;
    return this._service.promise(this._data.metodoGet(url));
  }
}
