import { Module } from '@nestjs/common';
import { <%= classify(name) %>DomainService } from './<%= dasherize(name) %>-domain.service';
import { <%= classify(name) %>Module } from '../../data-access/<%= dasherize(name) %>/<%= dasherize(name) %>.module';

@Module({
  imports: [
    <%= classify(name) %>Module,
  ],
  providers: [<%= classify(name) %>DomainService],
  exports: [<%= classify(name) %>DomainService],
})
export class <%= classify(name) %>DomainModule {}
