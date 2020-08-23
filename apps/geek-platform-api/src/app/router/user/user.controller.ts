import { AuthDataDto, UserDto } from '@geek-platform/api-interfaces';
import { Controller, UseGuards, Request, Get, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { from, Observable } from 'rxjs';
import { UserService } from '../../data-access/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard())
  public findAll$(@Request() req: { user: AuthDataDto }): Observable<UserDto[]> {
    return this.userService.find$();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  public findById$(
    @Param('id') id: string,
    @Request() req: { user: AuthDataDto },
  ): Observable<UserDto> {
    return this.userService.findById$(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  public delete$(
    @Param('id') id: string,
    @Request() req: { user: AuthDataDto },
  ): Observable<UserDto> {
    return from(this.userService.deleteOne(id));
  }
}
