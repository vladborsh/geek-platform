import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { QuizDto } from '@geek-platform/api-interfaces';
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

  public getQuizzes$(): Observable<QuizDto[]> {
    const dayInMs = 8.64e7;
    const { token, lastSignInTimestamp } = this.authService;
    const isTokenOutDate = Date.now() - lastSignInTimestamp > dayInMs;

    if (isTokenOutDate || !token) {
      this.loginWithGoogle();
    }

    return this.http.get<QuizDto[]>(this.quizUrl, this.httpOptions).pipe(
      catchError(
        (error: any): Observable<QuizDto[]> => {
          console.error(error);

          return of([] as QuizDto[]);
        },
      ),
    );
  }

  private loginWithGoogle(): void {
    window.location.replace(
      `${environment.loginWithGoogleRedirect || window.location.href}api/google`,
    );
  }
}
