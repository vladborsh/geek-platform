import { Controller, Post, UseGuards, Body, Request, Param, Get, Delete, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { QuizDto, AuthDataDto } from '@geek-platform/api-interfaces';
import { Observable } from 'rxjs';
import { QuizDomainService } from '../../domain/quiz-domain/quiz-domain.service';

@Controller('quiz')
export class QuizController {
  constructor(private quizDomainService: QuizDomainService) {}

  @Post()
  @UseGuards(AuthGuard())
  public create$(
    @Body() quizDto: QuizDto,
    @Request() req: { user: AuthDataDto },
  ): Observable<QuizDto> {
    return this.quizDomainService.create$(quizDto, req.user, null);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  public update$(
    @Param('id') id: string,
    @Body() quizDto: QuizDto,
    @Request() req: { user: AuthDataDto },
  ): Observable<QuizDto> {
    return this.quizDomainService.update$({ _id: id, ...quizDto }, req.user, null);
  }

  @Get()
  @UseGuards(AuthGuard())
  public findAll$(@Request() req: { user: AuthDataDto }): Observable<QuizDto[]> {
    return this.quizDomainService.find$(req.user);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  public findById$(
    @Param('id') id: string,
    @Request() req: { user: AuthDataDto },
  ): Observable<QuizDto> {
    return this.quizDomainService.findById$(id, req.user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  public delete$(
    @Param('id') id: string,
    @Request() req: { user: AuthDataDto },
  ): Observable<QuizDto> {
    return this.quizDomainService.delete$(id, req.user, null);
  }
}
