import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginFormModule } from './components/login-form/login-form.module';
import {ExpandModule} from '@geek-platform/ui';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot([]), LoginFormModule, ExpandModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
