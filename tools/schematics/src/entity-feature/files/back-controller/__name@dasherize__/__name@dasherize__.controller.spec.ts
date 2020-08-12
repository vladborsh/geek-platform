import { Test, TestingModule } from '@nestjs/testing';
import { <%= classify(name) %>Controller } from './<%= dasherize(name) %>.controller';
import { instance, mock } from 'ts-mockito';

describe('<%= classify(name) %> Controller', () => {
  let controller: <%= classify(name) %>Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [<%= classify(name) %>Controller, useFactory: () => instance(mock(<%= classify(name) %>DomainService)) ],
    }).compile();

    controller = module.get<<%= classify(name) %>Controller>(<%= classify(name) %>Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
