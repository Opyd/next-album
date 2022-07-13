import { AuthGuard } from '@nestjs/passport';
//to strategia z foldery strategy
export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
