import { Test, TestingModule } from '@nestjs/testing';
import { QuizAssignmentController } from './quiz-assignment.controller';
import { instance, mock } from 'ts-mockito';
import { QuizAssignmentDomainService } from '../../domain/quiz-assignment-domain/quiz-assignment-domain.service';
import { PassportModule } from '@nestjs/passport';

describe('QuizAssignment Controller', () => {
  let controller: QuizAssignmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [QuizAssignmentController ],
      providers: [{ provide: QuizAssignmentDomainService, useFactory: () => instance(mock(QuizAssignmentDomainService))} ],
    }).compile();

    controller = module.get<QuizAssignmentController>(QuizAssignmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
