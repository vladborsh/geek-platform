import { TestBed, async } from '@angular/core/testing';
import { QuestionCardComponent } from './question-card.component';
import { QuestionCardModule } from './question-card.module';

describe('QuestionCardComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [QuestionCardModule],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(QuestionCardComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
