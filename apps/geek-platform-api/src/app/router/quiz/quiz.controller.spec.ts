import { Test, TestingModule } from '@nestjs/testing';
import { QuizController } from './quiz.controller';
import { instance, mock } from 'ts-mockito';
import { QuizDomainService } from '../../domain/quiz-domain/quiz-domain.service';
import { PassportModule } from '@nestjs/passport';

describe('Quiz Controller', () => {
  let controller: QuizController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [ QuizController ],
      providers: [{ provide: QuizDomainService, useFactory: () => instance(mock(QuizDomainService))} ],
    }).compile();

    controller = module.get<QuizController>(QuizController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
