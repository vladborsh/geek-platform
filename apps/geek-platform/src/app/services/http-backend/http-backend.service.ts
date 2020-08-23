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
export class HttpBackendService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  public get$<T>(url: string): Observable<T> {
    return this.http.get<T>(url, this.getHttpOptions());
  }

  public post$<T>(url: string, data: T): Observable<T> {
    return this.http.post<T>(url, data, this.getHttpOptions());
  }

  public put$<T>(url: string, id: string, data: T): Observable<T> {
    return this.http.put<T>(`${url}/${id}`, data, this.getHttpOptions());
  }

  public patch$<T>(url: string, id: string, data: T): Observable<T> {
    return this.http.patch<T>(`${url}/${id}`, data, this.getHttpOptions());
  }

  public delete$<T>(url: string, id: string): Observable<T> {
    return this.http.delete<T>(`${url}/${id}`, this.getHttpOptions());
  }

  private getHttpOptions(): HttpOptionsInterface {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.user.token}`,
      }),
      responseType: 'json',
    };
  }
}
