import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { RegisterDto } from '../auth/dto';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get()
  async userInfo(@Req() req: Request) {
    const user = JSON.parse(JSON.stringify(req.user));
    delete user.hash;
    return { user: user };
  }
}
