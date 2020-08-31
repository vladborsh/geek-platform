import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { QuestionEditorComponent } from './question-editor.component';
import { ButtonModule, InputModule, RadioModule } from '@geek-platform/ui';

@NgModule({
  imports: [CommonModule, InputModule, RadioModule, ButtonModule, FormsModule, DragDropModule],
  declarations: [QuestionEditorComponent],
  exports: [QuestionEditorComponent],
})
export class QuestionEditorModule {}
