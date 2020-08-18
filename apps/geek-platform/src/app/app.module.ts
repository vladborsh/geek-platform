import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ExpandModule } from '@geek-platform/ui';

import { QuizService } from './services/quiz/quiz.service';
import { AuthInterceptor } from './api/interceptors/auth';
import { AppComponent } from './app.component';
import { LoginFormModule } from './components/login-form/login-form.module';
import { AppRoutingModule } from './components/app-routing/app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    LoginFormModule,
    ExpandModule,
  ],
  providers: [
    QuizService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
