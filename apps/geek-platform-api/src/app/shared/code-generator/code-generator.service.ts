import { Injectable } from '@nestjs/common';

@Injectable()
export class CodeGeneratorService {
  public generateId(): string {
    return [Math.trunc(Math.random() * 36), Date.now()].map(value => value.toString(36)).join('-');
  }

  public generateCode(): string {
    return [Date.now() + Math.trunc(Math.random() * 100)].map(value => value.toString(36)).join('');
  }

  public generatePassword(): string {
    return [Date.now() + Math.trunc(Math.random() * 10000000000000000)].map(value => value.toString(36)).join('');
  }
}
