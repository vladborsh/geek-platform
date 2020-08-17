import { TestBed } from '@angular/core/testing';

import { QuizService } from './quiz.service';
import { HttpClientModule } from '@angular/common/http';

describe('QuizService', () => {
  let service: QuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(QuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
