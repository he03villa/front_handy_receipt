import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _http: HttpClient = inject(HttpClient);

  constructor() { }

  /**
   * Makes a GET request to the specified URL with the provided header including the user's authorization token.
   * @param url The URL to make the GET request to
   * @returns An observable of the HTTP response from the GET request
   */
  metodoGet(url:string) {
    const header = {
      headers: new HttpHeaders()
    };
    header.headers.set('Content-Type', 'application/json; charset=utf-8');
    const user = localStorage.getItem('dataUser') || '';
    if (user != '') {
      const datauser = JSON.parse(user);
      /* header.headers = header.headers.append('x-api-key', datauser.token); */
      header.headers = header.headers.append('Authorization', `Bearer ${datauser.access_token}`);
    }
    return this._http.get(url, header);
  }

/**
 * Makes a POST request to the specified URL with the provided body and headers,
 * including the user's authorization token if available.
 * @param url The URL to make the POST request to
 * @param body The body of the POST request
 * @returns An observable of the HTTP response from the POST request
 */
  metodoPost(url:string, body:any) {
    const header = {
      headers: new HttpHeaders()
    };
    header.headers.set('Content-Type', 'application/json; charset=utf-8');
    const user = localStorage.getItem('dataUser') || '';
    if (user != '') {
      const datauser = JSON.parse(user);
      /* header.headers = header.headers.append('x-api-key', datauser.token); */
      header.headers = header.headers.append('Authorization',  `Bearer ${datauser.access_token}`);
    }
    return this._http.post(url, body, header);
  }

  /**
   * Makes a PUT request to the specified URL with the provided body and headers,
   * including the user's authorization token if available.
   * @param url The URL to make the PUT request to
   * @param body The body of the PUT request
   * @returns An observable of the HTTP response from the PUT request
   */
  metodoPut(url:string, body:any) {
    const header = {
      headers: new HttpHeaders()
    };
    header.headers.set('Content-Type', 'application/json; charset=utf-8');
    const user = localStorage.getItem('dataUser') || '';
    if (user != '') {
      const datauser = JSON.parse(user);
      /* header.headers = header.headers.append('x-api-key', datauser.token); */
      header.headers = header.headers.append('Authorization',  `Bearer ${datauser.access_token}`);
    }
    return this._http.put(url, body, header);
  }

  /**
   * Makes a DELETE request to the specified URL.
   * @param url The URL to make the DELETE request to
   * @returns An observable of the HTTP response from the DELETE request
   */
  metodoDelete(url:string) {
    const header = {
      headers: new HttpHeaders()
    };
    header.headers.set('Content-Type', 'application/json; charset=utf-8');
    const user = localStorage.getItem('dataUser') || '';
    if (user != '') {
      const datauser = JSON.parse(user);
      /* header.headers = header.headers.append('x-api-key', datauser.token); */
      header.headers = header.headers.append('Authorization', `Bearer ${datauser.access_token}`);
    }
    return this._http.delete(url, header);
  }
}
