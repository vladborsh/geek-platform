import { TestBed, async } from '@angular/core/testing';
import { QuestionEditorComponent } from './question-editor.component';
import { QuestionEditorModule } from './question-editor.module';

describe('QuestionEditorComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [QuestionEditorModule],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(QuestionEditorComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
