import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { LoginFormModule } from '../login-form/login-form.module';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, LoginFormModule],
  exports: [LoginPageComponent],
})
export class LoginPageModule {}
