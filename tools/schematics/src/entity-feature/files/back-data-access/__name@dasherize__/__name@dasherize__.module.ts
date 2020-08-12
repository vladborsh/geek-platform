import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { <%= uppercase(underscore(name)) %>_SCHEMA_NAME, <%= camelize(name) %>Schema } from './<%= dasherize(name) %>.schema';
import { <%= classify(name) %>Service } from './<%= dasherize(name) %>.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: <%= uppercase(underscore(name)) %>_SCHEMA_NAME, schema: <%= camelize(name) %>Schema },
    ]),
  ],
  providers: [<%= classify(name) %>Service],
  exports: [<%= classify(name) %>Service],
})
export class <%= classify(name) %>Module {}
