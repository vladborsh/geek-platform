import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HomeGuard } from './route/guards/home-guard';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './components/app-routing/app-routing.module';
import { LoginPageModule } from './components/login-page/login-page.module';
import { WelcomePageModule } from './components/welcome-page/welcome-page.module';
import { QuizPageModule } from './components/quiz-page/quiz-page.module';
import { EditorPageModule } from './components/editor-page/editor-page.module';
import { QuizAssignmentPageModule } from './components/quiz-assignment-page/quiz-assignment-page.module';
import { QuizAssignmentCreatePageModule } from './components/quiz-assignment-create-page/quiz-assignment-create-page.module';
import { QuizRunModule } from './components/quiz-run/quiz-run.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoginPageModule,
    WelcomePageModule,
    QuizPageModule,
    EditorPageModule,
    QuizAssignmentPageModule,
    QuizAssignmentCreatePageModule,
    QuizRunModule,
    NoopAnimationsModule,
  ],
  providers: [HomeGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
