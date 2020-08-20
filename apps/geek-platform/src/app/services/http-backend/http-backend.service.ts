import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

interface HttpOptionsInterface {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]: string | string[];
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class HttpBackendService<T> {
  private readonly httpOptions: HttpOptionsInterface;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.user.token}`,
      }),
      responseType: 'json',
    };
  }

  public get$(url: string): Observable<T[]> {
    return this.http.get<T[]>(url, this.httpOptions);
  }

  public post$(url: string, data: T): Observable<T> {
    return this.http.post<T>(url, data, this.httpOptions);
  }

  public put$(url: string, data: T): Observable<T> {
    return this.http.put<T>(url, data, this.httpOptions);
  }

  public patch$(url: string, data: T): Observable<T> {
    return this.http.patch<T>(url, data, this.httpOptions);
  }

  public delete$(url: string, id: number): Observable<T> {
    return this.http.delete<T>(`${url}/${id}`, this.httpOptions);
  }
}
