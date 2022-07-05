import { Component, OnInit } from '@angular/core';
import { Subscription, Observable, timer, Subject, interval } from 'rxjs';
import * as uuid from 'uuid';
import { startWith, takeUntil } from 'rxjs/operators';

import { ChatService } from './../../Shared/services/chat-service';


import { MainServiceService } from './../../Shared/services/main-service.service';
import { CacheService } from './../../Shared/services/cache.service';
import { AuthService } from './../../Shared/services/auth.service';
import { Router } from '@angular/router';



export class NgxQrCode {
  text: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myyear: number = new Date().getFullYear();

  private isAuthedSubj = new Subject<boolean>();
  private tokenSubj = new Subject<string>();
  readonly TokenKey = 'auth-token';
  token: string;
  token$: Observable<string>;
  private timer;
  items: any[];

  subscription: Subscription;
  intervalId: number;
  reload: boolean = false;
  qrcode_data: string;
  version: string;

  isBrokenNetwork: boolean = false;
  isScan: boolean = false;
  isWaitingAsConfirm: boolean = false;
  isNeedRefresh: boolean = false;
  showPrivacyTips: boolean = false;
  deviceInfo: any; qrcode: string;


  isToken: boolean = false;
  returnedToken: any;
  status: string;
  constructor(private cService: ChatService,
    private api: MainServiceService,
    private cache: CacheService,
    private router: Router,) {
    // //get QRData
    // this.qrcode_data = this.api.getUniqueId(4);
    // // console.log('qrcode_data   : ' + this.qrcode_data);

    // const token = cache.get(this.qrcode_data);
    // this.isAuthedSubj.next(token != null);

  }

  ngOnDestroy() {
    // Destroy Interval counter
    this.subscription && this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.version = this.api.ver.toString();
    this.isBrokenNetwork = false;
    this.isScan = false;
    this.isWaitingAsConfirm = false;
    this.isNeedRefresh = false;
    this.showPrivacyTips = true;


    this.isBrokenNetwork = false;
    this.isScan = true;
    let status = this.api.getConnectionStatus();
    if (status === "ONLINE") {
      // console.log(status);
      this.refreshQrcode();
    }
    else {
      this.isBrokenNetwork = true;
      //console.log(status);
    }


  }
  refreshQrcode() {
    this.isNeedRefresh = false;
    this.isToken = false;
    this.requestToken().subscribe((next) => (this.qrcode = next),
      (error) => console.log('Auth: ', error),
      () => {
        console.log('Auth: completing token request subscription.');
        //check if token has been returned true
        if (!this.isToken) {
          this.isNeedRefresh = true;
        }else{
          this.isNeedRefresh = false;
        }
        this.reload = true;
      }
    );
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
          console.log("Service:  token at ", x);
          //this.isAuthedSubj.next(true);
        } else {
          console.log("Service:  token request ===> ", x);
        }
        console.log("Service: emitting token request ", x);
        this.fetchLogin();

      })
      .add(() => {
        this.tokenSubj.complete();
      });
    return this.tokenSubj.asObservable();
  }
  onTimeOut() {
    this.fetchLogin();
  }

  fetchLogin() {

    // this.api.get('post').subscribe(data => {
    //   this.qrcode_data = data

    // })
    this.token = this.qrcode_data;
    this.qrcode_data = this.api.getUniqueId(4);
    //console.log(this.qrcode_data);
    this.cService.connect();
    this.cService.myChannel = this.qrcode_data;
    this.cService.initSubscription(this.qrcode_data);
    this.search();
  }
  search() {
    this.api.get('gettoken')
      .subscribe(data => {
        console.log('Get Token :' + data);
        if (!data) {
          this.returnedToken = data.key;
          if (data.token === this.qrcode_data) {
            this.isToken = true;
            this.openchat();
          }

        } else {
          //set status as false for no token return
          this.isToken = false;
        }


        // for (const d of (data as any)) {
        //    console.log('D :'+); d
        // }

      });
  }

  openchat() {
    this.router.navigate(['/chat']);
  }

}
