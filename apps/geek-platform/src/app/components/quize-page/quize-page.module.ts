import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizePageComponent } from './quize-page.component';
import { ButtonModule } from '@geek-platform/ui';

import { QuestionCardModule } from '../question-card/question-card.module';

@NgModule({
  declarations: [QuizePageComponent],
  imports: [CommonModule, ButtonModule, QuestionCardModule],
  exports: [QuizePageComponent],
})
export class QuizePageModule {}
