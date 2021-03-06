import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { QuizEditorComponent } from './quiz-editor.component';
import { QuizEditorModule } from './quiz-editor.module';

describe('QuizEditorComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [QuizEditorModule, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(QuizEditorComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
