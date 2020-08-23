import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async } from '@angular/core/testing';
import { QuizAssignmentCreatePageComponent } from './quiz-assignment-create-page.component';
import { QuizAssignmentCreatePageModule } from './quiz-assignment-create-page.module';

describe('QuizAssignmentCreatePageComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        QuizAssignmentCreatePageModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(QuizAssignmentCreatePageComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
