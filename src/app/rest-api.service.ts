import { Injectable } from '@angular/core';
import { Observable, of, throwError, from } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map ,retryWhen, retry, timeout} from 'rxjs/operators';
import { Router, NavigationExtras } from '@angular/router';
// import { HTTP } from '@ionic-native/http/ngx';


const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};


// const httpOptions = {'Content-Type': 'application/json'}

// const apiUrl = ' http://webapi.contentshare.biz/api/v1';
// const apiUrl = ' http://csapi.soltystudio.com/api/v1';


@Injectable({
    providedIn: 'root'
})

export class RestApiService {
    status:boolean;
    apiUrl:string;
    servers: Observable<any>;
    email: any;
    constructor(private http:HttpClient,
        private router: Router) { }



    checkServer(email): Observable<any> {
        // console.log(email);
        const url = `https://serverconsoleapi.contentshare.biz/api/v1/Security/check?email=${email}`;
        // console.log(url);
        return this.http.get(url).pipe(
            timeout(5000),
            retry(2),
            catchError(this.handleError)
        );       
    }

       
    getDocuments(id:number) :Observable <any>{
        const url = `${this.apiUrl}/documents/GetView?EntityId=${id}&EntityType=task`;
        return this.http.get(url).pipe(
            timeout(5000),
            retry(2),
            catchError(this.handleError)
            );
        }
    getDocumentById(documentId: number): any {
        const url = `${this.apiUrl}/documents/${documentId}`;
        return this.http.get(url, {responseType: 'blob'}).pipe(
            timeout(5000),
            retry(2),
            catchError(this.handleError)
            );
        }
            


    uploadFiles(files: Blob, entityType: string, entityId: number, documentName: string): Observable<any> {
        const httpUploadOptions = {
            headers: new HttpHeaders()
        };
        // window.alert(`preup:`);
        httpUploadOptions.headers.append('Content-Type', 'multipart/form-gridData');
        httpUploadOptions.headers.append('Cache-Control', 'no-cach e');
        const formData = new FormData();
        formData.append('entityType', entityType);
        formData.append('entityId', `${entityId}`);
        formData.append('documentName', documentName);
        formData.append('files', files, documentName);
        const url = `${this.apiUrl}/Documents/.init`;
        // window.alert(`finishup:`);
        return this.http.post(url, formData, httpUploadOptions).pipe(
            catchError(this.handleError)
        );
        }

    commitFile(entityType: string, entityId: number, doc: any): Observable<any> {

        const httpUploadOptions = {
            headers: new HttpHeaders()
        };
        // window.alert(`precommit:`);
        httpUploadOptions.headers.append('Content-Type', 'multipart/form-gridData');
        httpUploadOptions.headers.append('Cache-Control', 'no-cache');
        const formData = new FormData();
        formData.append('entityType', entityType);
        formData.append('entityId', entityId.toString());
        formData.append('document', JSON.stringify(doc));
        const url = `${this.apiUrl}/Documents/.commit`;
        // window.alert(`finishcommit:`);
        return this.http.post(url, formData, httpUploadOptions).pipe(
            catchError(this.handleError)
        );     
    }

    updateContact(data): Observable<any> {
        const url = `${this.apiUrl}/Contacts`;
        return this.http.put(url, data, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    exportContact(data): Observable<any> {
        const url = `${this.apiUrl}/Contacts`;
        return this.http.post(url, data, httpOptions).pipe(
            catchError(this.handleError)
        );       
    }

    getContactById(contactId: number): any {
        const url = `${this.apiUrl}/Contacts/${contactId}`;
        return this.http.get(url, httpOptions).pipe(
            timeout(5000),
            retry(2),
            catchError(this.handleError)
        );
    }


    setServers(servers,email){
        console.log('dis mail: '+email);
        console.log(servers);
        this.servers=servers;
        this.email=email;
        console.log('the serverss:'+this.servers);
        // this.router.navigate(['/login'], email);


        let navigationExtras: NavigationExtras = {
            state: {
              email: this.email
            }
          };
          console.log('the email exists:'+this.email);
          this.router.navigate(['login'], navigationExtras);
       
     
    }
    getServers(){  
        return this.servers;
    }
    setSolty(){
        this.apiUrl=' https://csapi.soltystudio.com/api/v1';
    }

    setBiz(){
        this.apiUrl=' https://webapi.contentshare.biz/api/v1'
     console.log(this.apiUrl);
    }
            
    getProfile(): Observable <any>{            
        return this.http.get(this.apiUrl+'/Account/MyContactInfo').pipe(
            timeout(5000),
            retry(2),
            catchError(this.handleError)
        );
    }
                            
    updateProfile(data): Observable<any> {
        const url = `${this.apiUrl}/Account/MyContactInfo`;
        return this.http.put(url, data, httpOptions).pipe(
            catchError(this.handleError)
        );
    }
                    
    getCompanies() :Observable <any>{  
        return this.http.get(this.apiUrl+'/Companies/Get').pipe(
            timeout(5000),
            retry(2),
            catchError(this.handleError)
        );
    }
                                            
    getCompanyById(id:number) :Observable <any>{
        const url = `${this.apiUrl}/Companies/${id}`;
        return this.http.get(url).pipe(
            timeout(5000),
            retry(2),
            catchError(this.handleError)
        );
    }
                                                    
    getNotes(id: string): Observable<any> {
        const url = `${this.apiUrl}/Notes?EntityId=${id}&EntityType=Company`;
        return this.http.get(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }
                                
    addCompany(data): Observable<any> {
        const url = `${this.apiUrl}/Companies`;
        return this.http.post(url, data, httpOptions).pipe(
            catchError(this.handleError)
        );
    }  
                                    
    getCategories(): Observable <any>{
        return this.http.get(this.apiUrl+'/Companies/Categories').pipe(
            catchError(this.handleError)
        );
    }                                    
                                                                        
    updateCompany(data): Observable<any> {
        const url = `${this.apiUrl}/Companies`;
        return this.http.put(url, data, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    addNote(data): Observable<any> {
        const url = `${this.apiUrl}/Notes`;
        return this.http.post(url, data, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    getUrl(){
        console.log(this.apiUrl);
        return this.apiUrl;
    }                                 
                                                
    getMyTasks(data): Observable <any>{
        return this.http.post(this.apiUrl+'/tasks/get',data,httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    getGivenTasks(data): Observable <any>{
        return this.http.post(this.apiUrl+'/tasks/get',data,httpOptions).pipe(
            catchError(this.handleError)
        );                                                  
    }
                                                        
    getTaskById(id:number) :Observable <any>{
        const url = `${this.apiUrl}/Tasks/${id}`;
        return this.http.get(url).pipe(
            timeout(5000),
            retry(2),
            catchError(this.handleError)
        );
    }

    updateTask(data): Observable<any> {
        const url = `${this.apiUrl}/Tasks`;
        return this.http.put(url, data, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    getContacts(): Observable <any>{
        return this.http.get(this.apiUrl+'/Contacts/GetAllSimple').pipe(
            timeout(5000),
            retry(2),
            catchError(this.handleError)
        );
    }

    resetPassword(data): Observable<any> {
        const url = `${this.apiUrl}/Account/RequestResetPassword`;
        return this.http.post(url, data, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    private extractData(res: Response) {
        let body = res;
        return body || { };
    }

    deleteNote(id:number): Observable<any>{
        const url = `${this.apiUrl}/Notes/${id}`;
        return this.http.delete(url,httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    getSimpleUsers(): Observable<any> {
        return this.http.get(this.apiUrl+'/users/GetSimple').pipe(
            timeout(5000),
            retry(2),
            catchError(this.handleError)
        );
    }

    // private handleError(error) {
    //     let errorMessage = '';
    //     if (error.error instanceof ErrorEvent) {
    //         // client-side error
    //         errorMessage = `Error: ${error.error.message}`;
    //     } else {
    //         // server-side error
    //         errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    //     }
    //     window.alert(errorMessage);
    //     return throwError(errorMessage);
    // }

    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
          }
          switch (error.status) {
            case 400:
            window.alert('Die Anfrage war nicht erfolgreich');
            break;
            case 401:
            window.alert('Ungültiger Benutzer oder Passwort');
            break;
            case 403:
            window.alert('Zugang verweigert');
            break;
            case 500:
            window.alert('Serverfehler, Kontakt mit Admin');
            break;
            default:
  
            if(error.error.message==null ||error.error.message==''){
              window.alert('Verbindungsfehler');
            }else{
              window.alert(error.error.message);
            }
            break;
          }
          // return an observable with a user-facing error message
          // window.alert(error.error);
       
          return throwError('Something bad happened; please try again later.');
        }

    setStatus(stat){
        this.status=stat;
    }

    getStatus(){
        return this.status;
    }

    addTask(data): Observable<any> {
        console.log(data);
        const url = `${this.apiUrl}/Tasks`;
        return this.http.post(url, data, httpOptions).pipe(
            catchError(this.handleError)
        );
    }
    
}
                                                                                    