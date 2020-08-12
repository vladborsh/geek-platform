import { Test, TestingModule } from '@nestjs/testing';
import { CodeGeneratorService } from './code-generator.service';

describe('CodeGeneratorService', () => {
  let service: CodeGeneratorService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodeGeneratorService],
    }).compile();
    service = module.get<CodeGeneratorService>(CodeGeneratorService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
