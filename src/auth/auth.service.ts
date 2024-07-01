import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthDto, RegisterDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../users/user.service';

@Injectable({})
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private userService: UserService,
  ) {}

  async signin(dto: AuthDto) {
    const user = await this.userService.findOneByEmail(dto.email);
    if (!user) {
      throw new HttpException('Credentials Incorrect', HttpStatus.FORBIDDEN);
    }

    const pwMatches = await argon.verify(user.hash, dto.password);
    if (!pwMatches) {
      throw new HttpException('Credentials Incorrect', HttpStatus.FORBIDDEN);
    }

    return {
      name: user.name,
      access_token: await this.signToken(1, user.email),
    };
  }

  async signup(dto: RegisterDto) {
    try {
      const hash = await argon.hash(dto.password);
      const user = await this.userService.create({
        name: dto.name,
        email: dto.email,
        hash: hash,
      });
      // const token = await this.signToken(user._id.toString(), user.email);
      return {
        // access_token: token,
        // name: user.name,
        message: 'Account successfully created',
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new HttpException('Credentials Taken', HttpStatus.FORBIDDEN);
      }
    }
  }

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
