import { inject, Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ServiceService } from './service.service';
import { environment } from 'src/environments/environment.prod';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private _data: DataService = inject(DataService);
  private _service: ServiceService = inject(ServiceService);

  constructor() { }

  async getAllCategorias(data:any) {
    let params = new HttpParams();
    params = params.append('page', data.page);
    if (data.search) {
      params = params.append('search', data.search);
    }
    const url = `${ environment.urlApi }${ environment.api.categoria.name }?${ params.toString() }`;
    return this._service.promise(this._data.metodoGet(url));
  }

  async getCategoria(id:any) {
    const url = `${ environment.urlApi }${ environment.api.categoria.name }/${ id }`;
    return this._service.promise(this._data.metodoGet(url));
  }

  async save(data:any) {
    const url = `${ environment.urlApi }${ environment.api.categoria.name }`;
    return this._service.promise(this._data.metodoPost(url, data));
  }

  async update(id:any, data:any) {
    const url = `${ environment.urlApi }${ environment.api.categoria.name }/${ id }`;
    return this._service.promise(this._data.metodoPut(url, data));
  }

  async delete(id:any) {
    const url = `${ environment.urlApi }${ environment.api.categoria.name }/${ id }`;
    return this._service.promise(this._data.metodoDelete(url));
  }

  async getCategoriasActivas() {
    const url = `${ environment.urlApi }${ environment.api.categoria.name }/${ environment.api.categoria.service.activos }`;
    return this._service.promise(this._data.metodoGet(url));
  }
}
