import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { <%= classify(name) %>Dto, Update } from '@geek-platform/api-interfaces';
import { <%= uppercase(underscore(name)) %>_SCHEMA_NAME } from './<%= dasherize(name) %>.schema';
import { from, Observable } from 'rxjs';
import { query } from '../../helpers/query.helper';

export type <%= classify(name) %>Data = Document & Exclude<<%= classify(name) %>Dto, '_id'>;

@Injectable()
export class <%= classify(name) %>Service {
  constructor(
    @InjectModel(<%= uppercase(underscore(name)) %>_SCHEMA_NAME) private readonly <%= camelize(name) %>Model: Model<<%= classify(name) %>Data>,
  ) {}

  public create$(<%= camelize(name) %>Dto: <%= classify(name) %>Dto): Observable<<%= classify(name) %>Dto> {
    return from(new this.<%= camelize(name) %>Model(<%= camelize(name) %>Dto).save());
  }

  public find$(filter?: Partial<<%= classify(name) %>Dto>): Observable<<%= classify(name) %>Dto[]> {
    return from(this.<%= camelize(name) %>Model.find());
  }

  public findById$(id: string): Observable<<%= classify(name) %>Dto> {
    return from(this.<%= camelize(name) %>Model.findOne(query<<%= classify(name) %>Dto>({ _id: id })));
  }

  public update$(<%= camelize(name) %>Dto: Update<<%= classify(name) %>Dto>): Observable<<%= classify(name) %>Dto> {
    return from(this.<%= camelize(name) %>Model.findByIdAndUpdate(<%= camelize(name) %>Dto._id, <%= camelize(name) %>Dto));
  }

  public delete$(id: string): Observable<<%= classify(name) %>Dto> {
    return from(this.<%= camelize(name) %>Model.findByIdAndRemove(id));
  }
}
