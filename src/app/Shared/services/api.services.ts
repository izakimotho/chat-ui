
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { throwError, of } from 'rxjs';
// import { _throw as throwError, _throw } from 'rxjs/observable/throw';
import { catchError, tap } from 'rxjs/operators';

import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse, HttpRequest, HttpEvent } from '@angular/common/http';
 
const API_URL = environment.apiUrl;

declare const $: any;

@Injectable()
export class ApiService {

    constructor(private _httpClient: HttpClient ) { }


 signout() {
   // this.auth.logout();
  }

  get(url: string) {
    return this.request(url, 'GET');
  }

  post(url: string, body: Object) {
    return this.request(url, 'POST', body);
  }

  put(url: string, body: Object) {
    // console.log('Saving data' + JSON.stringify(body));
    return this.request(url, 'PUT', body);
  }

  patch(url: string, body: Object) {
    return this.request(url, 'PATCH', body);
  }

  delete(url: string) {
    return this.request(url, 'DELETE');
  }

  request(reqUrl: string, method: string, body?: Object): Observable<any> {
    const url = `${API_URL}/${reqUrl}`;
  
    let headers = new HttpHeaders();


   
    if (!headers.has('Content-Type')) {
      headers = headers.set('Content-Type', 'application/json');
    }
    // headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
   // headers = headers.set('Authorization', 'Bearer ' + token);
   // Access-Control-Allow-Origin = http://localhost:4200
    headers = headers.set('Access-Control-Allow-Origin', '*');
    headers = headers.set('Access-Control-Allow-Credentials', 'true');
    // headers = headers.set('Access-Control-Allow-Methods', 'HEAD, GET, POST,OPTIONS, PUT, PATCH, DELETE');
    headers = headers.set('Access-Control-Allow-Headers', 'Origin, Content-Type');

    // const at = this.auth.getToken();
    const params = new HttpParams();
    // params = params.set('Authorization', 'Token' + this.auth.getToken());
    // params = params.set('Authorization', 'Token 5f3e92df8f973ccbbae3ef7fc0a3231322ceb87e');

    const reqOpt = {
      body: body ? body : {},
      headers
    };

    if (body) { } else {
      delete reqOpt.body;
    }
    // if (at) { } else {
    //   delete reqOpt.params;
    // }
    return this._httpClient.request<any>(method, url, reqOpt)
      .pipe(
        tap(data => {
          // console.log('server data:', data);
        }),
        catchError(this.handleError(url))
      );
  }

  private handleError(operation: string) {
    return (err: any) => {
      let errResp = {};
      if (err instanceof HttpErrorResponse) {
        errResp = {
          op: operation,
          status: err.status,
          statusText: err.statusText,
          error: err.error.error
        };
      }
      if (err.status === 401) {
        //this.auth.logout();
      }
      return throwError(errResp);
    };
  }


 

}
