import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HomeGuard } from './route/guards/home-guard';
import { AuthInterceptor } from './api/interceptors/auth';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './components/app-routing/app-routing.module';
import { LoginPageModule } from './components/login-page/login-page.module';
import { HomePageModule } from './components/home-page/home-page.module';
import { WelcomePageModule } from './components/welcome-page/welcome-page.module';
import { QuizePageModule } from './components/quize-page/quize-page.module';
import { EditorPageModule } from './components/editor-page/editor-page.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    LoginPageModule,
    HomePageModule,
    WelcomePageModule,
    QuizePageModule,
    EditorPageModule,
  ],
  providers: [
    HomeGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
