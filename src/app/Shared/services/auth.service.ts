import { Injectable } from "@angular/core";
import { Observable, Subject, interval, timer } from "rxjs";
import { map, takeUntil, startWith } from "rxjs/operators";

import { CacheService } from "./cache.service";
import { MainServiceService } from "./main-service.service";
import { Token } from "./token";

@Injectable()
export class AuthService {
  private isAuthedSubj = new Subject<boolean>();
  private tokenSubj = new Subject<string>();
  readonly TokenKey = "auth-token";
  items: any[];
  constructor(private cache: CacheService, private api: MainServiceService) {
    const token = cache.get(this.TokenKey);
    this.isAuthedSubj.next(token != null);
  }



  isClientAuthed(): Observable<boolean> {
    return this.isAuthedSubj.asObservable();
  }

  requestToken(): Observable<string> {
    const oneMinute = 30000;
    interval(oneMinute)
      .pipe(
        startWith(0),
        takeUntil(timer(oneMinute * 8)),
        takeUntil(this.isAuthedSubj)
      )
      .subscribe(x => {
        // automatic login after 1 sec.
        if (x === 40) {
          console.log("socket-service:  token request ", x);
          //this.isAuthedSubj.next(true);
        }
        console.log("socket-service: emitting token request ", x);
        this.fetchLogin();
      })
      .add(() => {
        this.tokenSubj.complete();
      });
    return this.tokenSubj.asObservable();
  }

  fetchLogin() {
    const qrcode_data=this.api.getUniqueId(4);
    this.api.get('qrcode/' + qrcode_data).subscribe(result => {
      this.items = result.result;
      console.log('Fetching data :' + JSON.stringify(result.result));
    },
      errResp => {
        console.log('Error fetching data');
      });
  }
}
