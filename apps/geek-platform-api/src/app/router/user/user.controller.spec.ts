import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { instance, mock } from 'ts-mockito';
import { UserService } from '../../data-access/user/user.service';

describe('User Controller', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        UserController,
      ],
      providers: [
        { provide: UserService, useFactory: () => instance(mock(UserService)) },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
