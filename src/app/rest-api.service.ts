import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map ,retryWhen, retry, timeout} from 'rxjs/operators';



const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
// const apiUrl = ' http://webapi.contentshare.biz/api/v1';
const apiUrl = ' http://csapi.soltystudio.com/api/v1';
@Injectable({
  providedIn: 'root'
})

export class RestApiService {
  
   
  constructor(private http: HttpClient) { }
  
 
  getProfile(): Observable <any>{

    return this.http.get(apiUrl+'/Account/MyContactInfo').pipe(
      timeout(5000),
      retry(2),
      catchError(this.handleError)
    );
  }


  updateProfile(data): Observable<any> {
    const url = `${apiUrl}/Account/MyContactInfo`;
    return this.http.put(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );  
  }

  getCompanies() :Observable <any>{

    return this.http.get(apiUrl+'/Companies/Get').pipe(
      timeout(5000),
      retry(2),
      catchError(this.handleError)
    

      // tap(() => console.log(apiUrl)),
      // retry(3),  // retry the failed request up to 3 times
      // catchError(err => {
      //     console.log(err);
      //     return of(null);
      // })
    )}

  getCompanyById(id:number) :Observable <any>{
    const url = `${apiUrl}/Companies/${id}`;
    return this.http.get(url).pipe(
      timeout(5000),
      retry(2),
      catchError(this.handleError)
    );
  }

 

  getNotes(id: string): Observable<any> {
    const url = `${apiUrl}/Notes?EntityId=${id}&EntityType=Company`;
    return this.http.get(url, httpOptions)
  }

  


  addCompany(data): Observable<any> {
    const url = `${apiUrl}/Companies`;
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    
  }

  getCategories(): Observable <any>{

    return this.http.get(apiUrl+'/Companies/Categories')
  }

  updateCompany(data): Observable<any> {
    const url = `${apiUrl}/Companies`;
    return this.http.put(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  addNote(data): Observable<any> {
    const url = `${apiUrl}/Notes`;
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      ); 
  }

  getTasks(): Observable <any>{

    return this.http.get(apiUrl+'/Tasks?Take=54');

    
  }


  resetPassword(data): Observable<any> {
    const url = `${apiUrl}/Account/RequestResetPassword`;
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );

    
  }


  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  
  getItems(): Observable <any>{
    return this.http.get(apiUrl);
  }

  getItemById(id: string): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData))
  }

  deleteItem(id:string): Observable<{}>{
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  
  addItem(data): Observable<any> {
    const url = `${apiUrl}`;
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteNote(id:number): Observable<{}>{
    const url = `${apiUrl}/Notes/${id}`;
    return this.http.delete(url,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
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
    // return an observable with a user-facing error message
    // window.alert(error.error.message);
    return throwError('Something bad happened; please try again later.');
  }
}