import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@geek-platform/ui';
import { CreatorPageComponent } from './creator-page.component';
import { CreatorPageRoutingModule } from './creator-page-routing.module';
import { QuizEditorModule } from '../quiz-editor/quiz-editor.module';

@NgModule({
  declarations: [CreatorPageComponent],
  imports: [CreatorPageRoutingModule, CommonModule, ButtonModule, QuizEditorModule],
})
export class CreatorPageModule {}
