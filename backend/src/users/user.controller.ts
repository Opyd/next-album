import { Body, Controller, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { RegisterDto } from '../auth/dto';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UserController {
  constructor() {}
}
