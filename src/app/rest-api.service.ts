import { Injectable } from '@angular/core';
import { Observable, of, throwError, from } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map ,retryWhen, retry, timeout} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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
    apiUrl=' http://csapi.soltystudio.com/api/v1';
    constructor(private http:HttpClient) { }

    setSolty(){
        this.apiUrl=' http://csapi.soltystudio.com/api/v1';
    }
    setBiz(){
        this.apiUrl=' http://webapi.contentshare.biz/api/v1'
        // console.log(this.apiUrl);
    }

    getProfile(): Observable <any>{

        return this.http.get(this.apiUrl+'/Account/MyContactInfo').pipe(
            timeout(5000),
            retry(2),
            catchError(this.handleError)
        );
    }


    // getProfile(): Observable <any>{

    //     return from(this.http.get(this.apiUrl+'/Account/MyContactInfo',{},httpOptions)).pipe(
    //         timeout(5000),
    //         retry(2),
    //         catchError(this.handleError)
    //     );
    // }


    


    // updateProfile(data): Observable<any> {
    //     const url = `${this.apiUrl}/Account/MyContactInfo`;
    //     return from(this.http.put(url, data, httpOptions))
    //     .pipe(
    //         catchError(this.handleError)
    //     );
    // }

    updateProfile(data): Observable<any> {
        const url = `${this.apiUrl}/Account/MyContactInfo`;
        return this.http.put(url, data, httpOptions)
        .pipe(
            catchError(this.handleError)
        );
    }

    // getCompanies() :Observable <any>{
    //     return from(this.http.get(this.apiUrl+'/Companies/Get',{},httpOptions)).pipe(
    //         timeout(5000),
    //         retry(2),
    //         catchError(this.handleError)
    //     )
    // }
    getCompanies() :Observable <any>{

        return this.http.get(this.apiUrl+'/Companies/Get').pipe(
            timeout(5000),
            retry(2),
            catchError(this.handleError)
        )
    }

    // getCompanyById(id:number) :Observable <any>{
    //     const url = `${this.apiUrl}/Companies/${id}`;
    //     return from(this.http.get(url,{},httpOptions)).pipe(
    //         timeout(5000),
    //         retry(2),
    //         catchError(this.handleError)
    //     );
    // }

    getCompanyById(id:number) :Observable <any>{
            const url = `${this.apiUrl}/Companies/${id}`;
            return this.http.get(url).pipe(
                timeout(5000),
                retry(2),
                catchError(this.handleError)
            );
        }

  


    // getNotes(id: string): Observable<any> {
    //     const url = `${this.apiUrl}/Notes?EntityId=${id}&EntityType=Company`;
    //     return from(this.http.get(url,{}, httpOptions)).pipe(
    //         catchError(this.handleError)
    //     );
    // }

    getNotes(id: string): Observable<any> {
            const url = `${this.apiUrl}/Notes?EntityId=${id}&EntityType=Company`;
            return this.http.get(url, httpOptions).pipe(
                catchError(this.handleError)
            );
        }


    // addCompany(data): Observable<any> {
    //     const url = `${this.apiUrl}/Companies`;
    //     return from(this.http.post(url, data, httpOptions))
    //     .pipe(
    //         catchError(this.handleError)
    //     );

    // }

    addCompany(data): Observable<any> {
            const url = `${this.apiUrl}/Companies`;
            return this.http.post(url, data, httpOptions)
            .pipe(
                catchError(this.handleError)
            );

        }


    // getCategories(): Observable <any>{

    //     return from(this.http.get(this.apiUrl+'/Companies/Categories',{},httpOptions)).pipe(
    //         catchError(this.handleError)
    //     );
    // }

    getCategories(): Observable <any>{

            return this.http.get(this.apiUrl+'/Companies/Categories').pipe(
                catchError(this.handleError)
            );
        }



    // updateCompany(data): Observable<any> {
    //     const url = `${this.apiUrl}/Companies`;
    //     return from(this.http.put(url, data, httpOptions))
    //     .pipe(
    //         catchError(this.handleError)
    //     );
    // }

    updateCompany(data): Observable<any> {
            const url = `${this.apiUrl}/Companies`;
            return this.http.put(url, data, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
        }


    
        // addNote(data): Observable<any> {
        //     const url = `${this.apiUrl}/Notes`;
        //     return from(this.http.post(url, data, httpOptions))
        //     .pipe(
        //         catchError(this.handleError)
        //     );
        // }

            addNote(data): Observable<any> {
            const url = `${this.apiUrl}/Notes`;
            return this.http.post(url, data, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
        }
    getUrl(){
            console.log(this.apiUrl);
            return this.apiUrl;
        }


        // getTasks(): Observable <any>{

        //     return from(this.http.get(this.apiUrl+'/Tasks?Take=54',{},httpOptions)).pipe(
        //         catchError(this.handleError)
        //     );


        // } 
    getTasks(): Observable <any>{

            return this.http.get(this.apiUrl+'/Tasks?Take=54').pipe(
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
            return this.http.put(url, data, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
        }


    // getContacts(): Observable <any>{

    //     return from(this.http.get(this.apiUrl+'/Contacts/GetAllSimple',{},httpOptions)).pipe(
    //         timeout(5000),
    //         retry(2),
    //         catchError(this.handleError)
    //     );
    // }
    getContacts(): Observable <any>{

            return this.http.get(this.apiUrl+'/Contacts/GetAllSimple').pipe(
                timeout(5000),
                retry(2),
                catchError(this.handleError)
            );
        }

    // resetPassword(data): Observable<any> {
    //     const url = `${this.apiUrl}/Account/RequestResetPassword`;
    //     return from(this.http.post(url, data, httpOptions))
    //     .pipe(
    //         catchError(this.handleError)
    //     );
    // }
    resetPassword(data): Observable<any> {
            const url = `${this.apiUrl}/Account/RequestResetPassword`;
            return this.http.post(url, data, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
        }


    private extractData(res: Response) {
            let body = res;
            return body || { };
        }


    // getItems(): Observable <any>{
    //         return this.http.get(this.apiUrl);
    //     }

    // getItemById(id: string): Observable<any> {
    //         const url = `${this.apiUrl}/${id}`;
    //         return this.http.get(url, httpOptions).pipe(
    //             map(this.extractData))
    //         }


    // deleteItem(id:string): Observable<{}>{
    //     const url = `${this.apiUrl}/${id}`;
    //     return from(this.http.delete(url,{},httpOptions)).pipe(
    //         catchError(this.handleError)
    //     );
    // }
    // deleteItem(id:string): Observable<{}>{
    //             const url = `${this.apiUrl}/${id}`;
    //             return this.http.delete(url,httpOptions).pipe(
    //                 catchError(this.handleError)
    //             );
    //         }

    // addItem(data): Observable<any> {
    //             const url = `${this.apiUrl}`;
    //             return this.http.post(url, data, httpOptions)
    //             .pipe(
    //                 catchError(this.handleError)
    //             );
    //         }



    // deleteNote(id:number): Observable<any>{
    //     const url = `${this.apiUrl}/Notes/${id}`;
    //     return from(this.http.delete(url,{},httpOptions)).pipe(
    //         catchError(this.handleError)
    //     );
    // }

    deleteNote(id:number): Observable<any>{
                const url = `${this.apiUrl}/Notes/${id}`;
                return this.http.delete(url,httpOptions).pipe(
                    catchError(this.handleError)
                );
            }



    // getSimpleUsers(): Observable<any> {
    //     return from(this.http.get(this.apiUrl+'/users/GetSimple',{},httpOptions)).pipe(
    //         timeout(5000),
    //         retry(2),
    //         catchError(this.handleError)
    //     );
    // }
    getSimpleUsers(): Observable<any> {
        return this.http.get(this.apiUrl+'/users/GetSimple').pipe(
            timeout(5000),
            retry(2),
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
                    window.alert(error.error.message);
                    return throwError('Something bad happened; please try again later.');
                }
    setStatus(stat){
        this.status=stat;
    }            
    getStatus(){
        return this.status;
    }

    // addTask(data): Observable<any> {
    //     const url = `${this.apiUrl}/Tasks`;
    //     console.log(data);
    //     return from(this.http.post(url, data, httpOptions))
    //     .pipe(
    //         catchError(this.handleError)
    //     );
    // }

    addTask(data): Observable<any> {
        console.log(data);
        const url = `${this.apiUrl}/Tasks`;
        console.log(data);
        return this.http.post(url, data, httpOptions)
        .pipe(
            catchError(this.handleError)
        );
    }
}
