import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, pipe, of, throwError, map } from 'rxjs';
import { ItpcFlight2 } from './models/itpc-flight2';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItpcDataArrivalFlightService {
  constructor(private http: HttpClient) {}

  // url connecting to the api
  urlVolApi: string = environment.srv;

  returnLoadArrivalDataHttpClient: any = [];

  // HTTP Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  //HTTP to load itpc Arrival List

  getDataVolDetailHttp(): Observable<ItpcFlight2[]> {
    return this.http.get<ItpcFlight2[]>(this.urlVolApi).pipe(
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    );
  }
  loadVolDetailListHttp(): ItpcFlight2[] {
    this.getDataVolDetailHttp().subscribe(
      (response) => (this.returnLoadArrivalDataHttpClient = response),
      (error: any) => console.log('Something wrong !' + error),
      () => console.log('Done, retrieving data Arrival Flight!')
    );

    return this.returnLoadArrivalDataHttpClient['listVol'];
  }

  //http to load itpc vol detail list

  urlUsVolApi: string = environment.srv + '/' + '{id}';
  getDataUsVolDetailHttp(id: string): Observable<ItpcFlight2[]> {
    const url = this.urlUsVolApi.replace('{id}', id);
    let params = new HttpParams();
    params = params.set('id', id);
    console.log(url);
    console.log('getting the US vol arriving detail');

    return this.http.get<ItpcFlight2[]>(url, { params }).pipe(
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    );
  }
  loadUsVolDetailListHttp(id: string): Observable<ItpcFlight2[]> {
    console.log('enter load');
    return this.getDataUsVolDetailHttp(id).pipe(
      map((response: any) => response['listUsVol']),
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    );
  }
}
