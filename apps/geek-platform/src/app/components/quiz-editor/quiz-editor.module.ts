import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { InputModule, CardModule, ButtonModule } from '@geek-platform/ui';
import { QuizEditorComponent } from './quiz-editor.component';
import { QuestionEditorModule } from '../question-editor/question-editor.module';

@NgModule({
  imports: [CommonModule, FormsModule, InputModule, QuestionEditorModule, CardModule, ButtonModule, DragDropModule],
  declarations: [QuizEditorComponent],
  exports: [QuizEditorComponent],
})
export class QuizEditorModule {}
