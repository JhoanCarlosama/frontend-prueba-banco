import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovimientoService {
  readonly URL_API = environment.apiUrl + '/movimiento';

  constructor( private http: HttpClient ) { }

  list(): Observable<any> {
    return this.http.get(this.URL_API + '/list');
  }

  createOrUpdate(data): Observable<any> {
    return this.http.post(this.URL_API + '/create-update', data);
  }

  show(id: String): Observable<any> {
    return this.http.get(this.URL_API + '/show/' + id);
  }

  delete(id: String): Observable<any> {
    return this.http.delete(this.URL_API + '/delete/' + id);
  }

  report(data): Observable<any> {
    return this.http.post(this.URL_API + '/search-filter', data);
  }
}
