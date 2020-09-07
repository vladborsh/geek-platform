import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, ListFilterModule } from '@geek-platform/ui';
import { QuizPageComponent } from './quiz-page.component';
import { QuizPageRoutingModule } from './quiz-page-routing.module';

@NgModule({
  imports: [
    QuizPageRoutingModule,
    CommonModule,
    ButtonModule,
    ListFilterModule,
  ],
  declarations: [QuizPageComponent],
})
export class QuizPageModule {}
