import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('google')
export class GoogleAuthController {
  @Get()
  @UseGuards(AuthGuard('google'))
  public googleLogin(): void {}

  @Get('callback')
  @UseGuards(AuthGuard('google'))
  public googleLoginCallback(@Req() req, @Res() res): void {
    const token: string = req.user && req.user.token;

    res.cookie('sessionId', token, { httpOnly: true });

    if (token) {
      res.redirect(`${process.env.APP_URL}?authorized=true&payload=${JSON.stringify(req.user)}`);
    } else {
      res.redirect(`${process.env.APP_URL}?authorized=false`);
    }
  }
}
