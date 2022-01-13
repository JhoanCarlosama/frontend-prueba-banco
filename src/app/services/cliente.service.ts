import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  readonly URL_API = environment.apiUrl + '/cliente';

  constructor( private http: HttpClient ) { }

  list(): Observable<any> {
    return this.http.get(this.URL_API + '/list');
  }

  new(data): Observable<any> {
    return this.http.post(this.URL_API + '/new', data);
  }

  edit(data, _id): Observable<any> {
    return this.http.put(this.URL_API + '/edit/' + `${_id}` , data);
  }

  delete(data): Observable<any> {
    return this.http.post(this.URL_API + '/delete', data);
  }
}
