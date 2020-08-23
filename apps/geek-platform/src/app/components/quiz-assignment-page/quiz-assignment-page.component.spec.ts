import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async } from '@angular/core/testing';
import { QuizAssignmentPageComponent } from './quiz-assignment-page.component';
import { QuizAssignmentPageModule } from './quiz-assignment-page.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('QuizAssignmentPageComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        QuizAssignmentPageModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(QuizAssignmentPageComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
