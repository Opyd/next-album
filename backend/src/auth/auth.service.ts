import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(private jwt: JwtService, private config: ConfigService) {}
  async login(dto: AuthDto) {
    //temp user for testing purposes
    const user = {
      email: 'joedoe@gmail.com',
      password: '123',
    };
    if (!(dto.email === user.email && dto.password == user.password)) {
      throw new HttpException('Credentials Taken', HttpStatus.FORBIDDEN);
    }
    return {
      access_token: await this.signToken(1, user.email),
    };
  }

  signup() {}

  async signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    return this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
  }
}
