import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

import { environment } from './../../../environments/environment';

import { DeviceInfo } from './../interface/deviceInfo';

import { Observable } from 'rxjs';
import { throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ConnectionService } from 'ng-connection-service';

import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpErrorResponse,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';

const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root',
})
export class MainServiceService {
  deviceInfo: DeviceInfo;
  status = 'ONLINE';
  isConnected = true;
  public ver = environment.version;
  constructor(
    private deviceService: DeviceDetectorService,private connectionService: ConnectionService,
    private _httpClient: HttpClient
  ) {}

  getDeviceInfo() {
    this.deviceInfo.deviceinfo = JSON.stringify(
      this.deviceService.getDeviceInfo()
    );
    this.deviceInfo.isMobile = this.deviceService.isMobile(); // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    this.deviceInfo.isTablet = this.deviceService.isTablet(); // returns if the device us a tablet (iPad etc)
    this.deviceInfo.isDesktopDevice = this.deviceService.isDesktop(); // returns if the app is running on a Desktop browser.
    return this.deviceInfo;
  }

  /**
   * generate groups of 4 random characters
   * @example getUniqueId(1) : 607f
   * @example getUniqueId(2) : 95ca-361a-f8a1-1e73
   */
  getUniqueId(parts: number): string {
    const stringArr = [];
    for (let i = 0; i < parts; i++) {
      // tslint:disable-next-line:no-bitwise
      const S4 = (((1 + Math.random()) * 0x10000) | 0)
        .toString(16)
        .substring(1);
      stringArr.push(S4);
     // console.log('stringArr   : ' + stringArr);
    }
    return stringArr.join('-');
  }



  getConnectionStatus() {
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;

      console.log('isConnected : '+ JSON.stringify(this.isConnected));
      if (this.isConnected) {
        this.status = "ONLINE";
      }
      else {
        this.status = "OFFLINE";
      }
    })
    return this.status;
  }
  
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
    headers = headers.set(
      'Access-Control-Allow-Headers',
      'Origin, Content-Type'
    );

    // const at = this.auth.getToken();
    const params = new HttpParams();
    // params = params.set('Authorization', 'Token' + this.auth.getToken());
    // params = params.set('Authorization', 'Token 5f3e92df8f973ccbbae3ef7fc0a3231322ceb87e');

    const reqOpt = {
      body: body ? body : {},
      headers,
    };

    if (body) {
    } else {
      delete reqOpt.body;
    }
    // if (at) { } else {
    //   delete reqOpt.params;
    // }
    return this._httpClient.request<any>(method, url, reqOpt).pipe(
      tap((data) => {
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
          error: err.error.error,
        };
      }
      if (err.status === 401) {
        //this.auth.logout();
      }
      return throwError(errResp);
    };
  }

  pushFile(reqUrl: string, file: File, name: string): Observable<any> {
    const url = `${API_URL}/${reqUrl}/`; 
    const data: FormData = new FormData();
    data.append('file', file);
    data.append('name', name);
    data.append('data', JSON.stringify(name));

    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'multipart/form-data');
    // headers = headers.set('Content-Type', 'multipart/form-data');
    const newRequest = new HttpRequest('POST', url, data, {
      reportProgress: true,
      responseType: 'text',
      headers,
    });

    return this._httpClient.request<any>(newRequest).pipe(
      tap((data) => {
        // console.log('server data:', data);
      }),
      catchError(this.handleError(url))
    );
  }
  pushFileToStorage(
    reqUrl: string,
    file: File,
    imageResources: string
  ): Observable<any> {
    const url = `${API_URL}/${reqUrl}/`;
    const data: FormData = new FormData();
    data.append('file', file);
    data.append('appname', imageResources);
    data.append('data', JSON.stringify(imageResources));

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data');
    const newRequest = new HttpRequest('POST', url, data, {
      reportProgress: true,
      responseType: 'text',
      headers,
    });

    return this._httpClient.request<any>(newRequest).pipe(
      tap((data) => {
        // console.log('server data:', data);
      }),
      catchError(this.handleError(url))
    );
  } 
}
