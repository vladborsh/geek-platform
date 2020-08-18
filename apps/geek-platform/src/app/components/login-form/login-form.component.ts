import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { filter, map, catchError, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthDataDto } from '@geek-platform/api-interfaces';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.checkRouteForAuth();
  }

  public loginWithGoogle(): void {
    window.location.replace(
      `${environment.loginWithGoogleRedirect || window.location.href}api/google`,
    );
  }

  public checkRouteForAuth(): void {
    this.activatedRoute.queryParamMap
      .pipe(
        filter(
          (params: ParamMap) =>
            params &&
            params.has('authorized') &&
            params.get('authorized') === 'true',
        ),
        map((params: ParamMap) => JSON.parse(params.get('payload'))),
        catchError((error: Error) => {
          console.warn(`Invalid auth data: ${String(error)}`);

          return of(null);
        }),
        take(1),
      )
      .subscribe((authData: AuthDataDto) => {
        this.authService.user = authData;
        this.authService.lastSignInTimestamp = Date.now();
        this.router.navigate([`/`]);
      });
  }
}
