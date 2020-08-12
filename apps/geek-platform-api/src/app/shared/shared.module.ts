import { Module } from '@nestjs/common';
import { MailerService } from './mailer/mailer.service';
import { CodeGeneratorService } from './code-generator/code-generator.service';

@Module({
  providers: [
    MailerService,
    CodeGeneratorService,
  ],
  exports: [
    MailerService,
    CodeGeneratorService,
  ],
})
export class SharedModule {}
