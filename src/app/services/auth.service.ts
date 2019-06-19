import { Platform, AlertController, LoadingController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject, from } from 'rxjs';
import { RestApiService } from '../rest-api.service';
// import { HTTP } from '@ionic-native/http/ngx';

const TOKEN_KEY = 'accessToken';
const SERVER = 'server';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  url ;
  user = null;
  authenticationState = new BehaviorSubject(false);
  
  constructor(
    private http: HttpClient,
    private helper: JwtHelperService, 
    public api: RestApiService, 
    public storage: Storage,
    private plt: Platform, 
    public loadingController: LoadingController,
    private alertController: AlertController) {
      this.plt.ready().then(() => {
        this.checkToken();
        this.checkServer();
      });
    }
    
    checkToken() {
      this.storage.get(TOKEN_KEY).then(token => {
        if (token) {
          let decoded = this.helper.decodeToken(token);
          let isExpired = this.helper.isTokenExpired(token);
          
          if (!isExpired) {
            this.user = decoded;
            this.authenticationState.next(true);
          } else {
            this.storage.remove(TOKEN_KEY);
          }
        }
      });
    }
    
    checkServer() {
     
        this.storage.get('server').then(server => {
          console.log('serverOnInit'+server);
          switch (server) {

            case 'CS Test Solty':
            this.api.setSolty();
            
            break;
            case 'Internal CS':
            this.api.setBiz();
            default:
            this.api.apiUrl='https://webapi.contentshare.biz/api/v1';
            break;
          }
          console.log('the api url at init'+this.api.apiUrl);
        });
     
    }
    
    
    
    login(credentials) {
      this.url=this.api.getUrl();
      
      return this.http.post(`${this.url}/Account/Login`, credentials)
      .pipe(
        tap(res => {
          this.storage.set(TOKEN_KEY, res['accessToken']);
          this.user = this.helper.decodeToken(res['accessToken']);
          this.authenticationState.next(true);
        }),
        catchError(e => {
          console.log(e.error);
          if(e.error==null|| e.error==''){
            this.showAlert('Connection error');
          }else{
            this.showAlert(e.error.message);
          }
          
          throw new Error(e);
        })
        );
      }
      
      
      
      
      logout() {
        this.storage.remove(TOKEN_KEY).then(() => {
          this.authenticationState.next(false);
          this.api.setBiz();
          this.storage.set('server','Internal CS');
        });
       
      }
      
      
      
      isAuthenticated() {
        return this.authenticationState.value;
      }
      
      showAlert(msg) {
        let alert = this.alertController.create({
          message: msg,
          header: 'Error',
          buttons: ['OK']
        });
        alert.then(alert => alert.present());
      }
    }