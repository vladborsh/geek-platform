import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { HomeGuard } from './route/guards/home-guard';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './components/app-routing/app-routing.module';
import { LoginPageModule } from './components/login-page/login-page.module';
import { HomePageModule } from './components/home-page/home-page.module';
import { WelcomePageModule } from './components/welcome-page/welcome-page.module';
import { QuizePageModule } from './components/quize-page/quize-page.module';
import { EditorPageModule } from './components/editor-page/editor-page.module';
import { QuizAssignmentPageModule } from './components/quiz-assignment-page/quiz-assignment-page.module';
import { QuizAssignmentCreatePageModule } from './components/quiz-assignment-create-page/quiz-assignment-create-page.module';

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
    QuizAssignmentPageModule,
    QuizAssignmentCreatePageModule,
  ],
  providers: [HomeGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
