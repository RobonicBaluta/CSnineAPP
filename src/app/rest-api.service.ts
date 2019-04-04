import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = ' http://csapi.soltystudio.com/api/v1/Companies/Get';
@Injectable({
  providedIn: 'root'
})

export class RestApiService {
  
   
  constructor(private http: HttpClient) { }
  
  getItems(): Observable <any>{
    
    return this.http.get(apiUrl);
    
  }
  getItemById(id: string): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData))
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
    return throwError('Something bad happened; please try again later.');
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

  updateItem(id: string, data): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
}