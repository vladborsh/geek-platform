import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
      return ;
    }

    return this.http.get<Quiz[]>(this.quizUrl, this.httpOptions).pipe(
      catchError( (error: any): Observable<Quiz[]> => {
        console.error(error);
        return of([] as Quiz[]);
      })
    );
  }

  private loginWithGoogle(): void {
    window.location.replace(`${ environment.loginWithGoogleRedirect || window.location.href }api/google`);
  }

}
