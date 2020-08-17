import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Quiz } from '../../types/quiz';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private quizUrl = 'api/quiz';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private authService: AuthService) {}

  getQuizzes(): Observable<Quiz[]> {
    const dayInMs = 8.64e7;
    const {token, lastSignInTimestamp} = this.authService;
    const isTokenOutDate = Date.now() - lastSignInTimestamp > dayInMs;

    if(isTokenOutDate || !token) {
      this.loginWithGoogle();
      return;
    }


    return this.http.get<Quiz[]>(this.quizUrl, this.httpOptions).pipe(
      tap((_) => console.log('fetched quizzes')),
      catchError(this.handleError<Quiz[]>('getQuizzes', []))
    );
  }

  public loginWithGoogle(): void {
    window.location.replace(`${ environment.loginWithGoogleRedirect || window.location.href }api/google`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
