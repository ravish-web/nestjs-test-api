import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public async hashPassword(password: string) {
    const hashedPassword = await hash(password, 10);
    return  hashedPassword ;
  }

  public async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await compare(password, hashedPassword);
  }

  public async generateAccessToken(_id: string) {
    const payload = { _id };
    return this.jwtService.signAsync(payload, { expiresIn: '30d' });
  }
}

