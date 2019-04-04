import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import {
  Router
} from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import{Storage} from '@ionic/storage'
import { from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  
  constructor(private storage: Storage, private alertCtrl: AlertController,) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
    

    const tokenPromise = this.storage.get('accessToken');

 
 const token = from(tokenPromise);

    return token.pipe(mergeMap(token => {

          
            let clonedReq = this.addToken(request, token);
            return next.handle(clonedReq);
        }));
}

// Adds the token to your headers if it exists
private addToken(request: HttpRequest<any>, token: any) {
    if (token) {
        let clone: HttpRequest<any>;
        clone = request.clone({
            setHeaders: {
                Accept: `application/json`,
                'Content-Type': `application/json`,
                Authorization: `Bearer ${token}`
            }
        });
        return clone;
    }

    return request;
}
  // constructor(private router: Router,private storage: Storage,
  //   public toastController: ToastController) {}
  //   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
  //     // const token = localStorage.getItem('accessToken');
  //   const tokenPromise = this.storage.get('accessToken');

 
  //   const token = from(tokenPromise);
      
  //     if (token) {
  //       request = request.clone({
  //         setHeaders: {
  //           'Authorization': token
  //         }
  //       });
  //     }
      
  //     if (!request.headers.has('Content-Type')) {
  //       request = request.clone({
  //         setHeaders: {
  //           'content-type': 'application/json'
  //         }
  //       });
  //     }
      
  //     request = request.clone({
  //       headers: request.headers.set('Accept', 'application/json')
  //     });
      
  //     return next.handle(request).pipe(
  //       map((event: HttpEvent<any>) => {
  //         if (event instanceof HttpResponse) {
  //           console.log('event--->>>', event);
  //         }
  //         return event;
  //       }),
  //       );
        
  //     }
  //     async presentToast(msg) {
  //       const toast = await this.toastController.create({
  //         message: msg,
  //         duration: 2000,
  //         position: 'top'
  //       });
  //       toast.present();
  //     }
    }
    