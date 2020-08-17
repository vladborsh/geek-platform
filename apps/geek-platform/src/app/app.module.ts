import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ExpandModule } from '@geek-platform/ui';

import { AppComponent } from './app.component';
import { LoginFormModule } from './components/login-form/login-form.module';
import {QuizService} from './services/quiz/quiz.service';
import {AuthInterceptor} from './api/interceptors/auth';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    LoginFormModule,
    ExpandModule,
  ],
  providers: [
    QuizService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
