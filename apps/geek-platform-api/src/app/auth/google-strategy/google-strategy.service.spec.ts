import { Test, TestingModule } from '@nestjs/testing';
import { GoogleStrategyService } from './google-strategy.service';
import { AuthService } from '../auth.service';
import { instance, mock } from 'ts-mockito';

describe('GoogleStrategyService', () => {
  let service: GoogleStrategyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoogleStrategyService,
        { provide: AuthService, useFactory: () => instance(mock(AuthService)) },
      ],
    }).compile();

    service = module.get<GoogleStrategyService>(GoogleStrategyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
