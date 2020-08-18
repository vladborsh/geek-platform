import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form.component';
import { ButtonModule } from '@geek-platform/ui';

@NgModule({
  declarations: [
    LoginFormComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
  ],
  exports: [LoginFormComponent],
})
export class LoginFormModule { }
