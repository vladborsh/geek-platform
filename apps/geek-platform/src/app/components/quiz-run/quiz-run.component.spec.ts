import { TestBed, async } from '@angular/core/testing';
import { QuizRunComponent } from './quiz-run.component';
import { QuizRunModule } from './quiz-run.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('QuizRunComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        QuizRunModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(QuizRunComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
