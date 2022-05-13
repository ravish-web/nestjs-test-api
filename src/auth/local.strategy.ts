import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,

  ) {
    super();
  }
  async validate(username: string): Promise<any> {
    console.log('username', username)
    const user = await this.usersService.getUserByUsername(username);
    console.log('user', user)

    if (!user) {
      throw new UnauthorizedException();

    }
    return user;
  }
}