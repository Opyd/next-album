import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    console.log({
      dto,
    });
    return dto;
  }

  @Post('signin')
  async signin(@Body() dto: AuthDto) {
    return await this.authService.login(dto);
  }
}
