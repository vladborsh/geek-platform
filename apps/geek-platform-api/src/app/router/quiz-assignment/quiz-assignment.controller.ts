import { Controller, Post, UseGuards, Body, Request, Param, Get, Delete, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { QuizAssignmentDto, AuthDataDto } from '@geek-platform/api-interfaces';
import { Observable } from 'rxjs';
import { QuizAssignmentDomainService } from '../../domain/quiz-assignment-domain/quiz-assignment-domain.service';

@Controller('quiz_assignment')
export class QuizAssignmentController {
  constructor(private quizAssignmentDomainService: QuizAssignmentDomainService) {}

  @Post()
  @UseGuards(AuthGuard())
  public create$(
    @Body() quizAssignmentDto: QuizAssignmentDto,
    @Request() req: { user: AuthDataDto },
  ): Observable<QuizAssignmentDto> {
    return this.quizAssignmentDomainService.create$(quizAssignmentDto, req.user, null);
  }

  @Post(':id/start')
  @UseGuards(AuthGuard())
  public startById$(
    @Param('id') id: string,
    @Request() req: { user: AuthDataDto },
  ): Observable<QuizAssignmentDto> {
    return this.quizAssignmentDomainService.start$(id, req.user);
  }

  @Post(':id/finish')
  @UseGuards(AuthGuard())
  public finishById$(
    @Param('id') id: string,
    @Body() quizAssignmentPickDto: Pick<QuizAssignmentDto, 'answers'>,
    @Request() req: { user: AuthDataDto },
  ): Observable<QuizAssignmentDto> {
    return this.quizAssignmentDomainService.finish$(id, quizAssignmentPickDto, req.user);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  public update$(
    @Param('id') id: string,
    @Body() quizAssignmentDto: QuizAssignmentDto,
    @Request() req: { user: AuthDataDto },
  ): Observable<QuizAssignmentDto> {
    return this.quizAssignmentDomainService.update$({ _id: id, ...quizAssignmentDto }, req.user, null);
  }

  @Get()
  @UseGuards(AuthGuard())
  public findAll$(@Request() req: { user: AuthDataDto }): Observable<QuizAssignmentDto[]> {
    return this.quizAssignmentDomainService.find$(req.user);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  public findById$(
    @Param('id') id: string,
    @Request() req: { user: AuthDataDto },
  ): Observable<QuizAssignmentDto> {
    return this.quizAssignmentDomainService.findById$(id, req.user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  public delete$(
    @Param('id') id: string,
    @Request() req: { user: AuthDataDto },
  ): Observable<QuizAssignmentDto> {
    return this.quizAssignmentDomainService.delete$(id, req.user, null);
  }
}
