import { Controller, Post, UseGuards, Body, Request, Param, Get, Delete, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { <%= classify(name) %>Dto, AuthDataDto } from '@geek-platform/api-interfaces';
import { Observable } from 'rxjs';
import { <%= classify(name) %>DomainService } from '../../domain/<%= dasherize(name) %>-domain/<%= dasherize(name) %>-domain.service';

@Controller('api/<%= underscore(name) %>')
export class <%= classify(name) %>Controller {
  constructor(private <%= camelize(name) %>DomainService: <%= classify(name) %>DomainService) {}

  @Post()
  @UseGuards(AuthGuard())
  public create$(
    @Body() <%= camelize(name) %>Dto: <%= classify(name) %>Dto,
    @Request() req: { user: AuthDataDto },
  ): Observable<<%= classify(name) %>Dto> {
    return this.<%= camelize(name) %>DomainService.create$(<%= camelize(name) %>Dto, req.user, null);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  public update$(
    @Param('id') id: string,
    @Body() <%= camelize(name) %>Dto: <%= classify(name) %>Dto,
    @Request() req: { user: AuthDataDto },
  ): Observable<<%= classify(name) %>Dto> {
    return this.<%= camelize(name) %>DomainService.update$({ _id: id, ...<%= camelize(name) %>Dto }, req.user, null);
  }

  @Get()
  @UseGuards(AuthGuard())
  public findAll$(@Request() req: { user: AuthDataDto }): Observable<<%= classify(name) %>Dto[]> {
    return this.<%= camelize(name) %>DomainService.find$(req.user);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  public findById$(
    @Param('id') id: string,
    @Request() req: { user: AuthDataDto },
  ): Observable<<%= classify(name) %>Dto> {
    return this.<%= camelize(name) %>DomainService.findById$(id, req.user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  public delete$(
    @Param('id') id: string,
    @Request() req: { user: AuthDataDto },
  ): Observable<<%= classify(name) %>Dto> {
    return this.<%= camelize(name) %>DomainService.delete$(id, req.user, null);
  }
}
