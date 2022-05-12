import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { genSalt, compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  private async generateSalt(): Promise<string> {
    return await genSalt();
  }

  public async hashPassword(password: string) {
    const salt = await this.generateSalt();
    const hashedPassword = await hash(password, salt);
    return { salt, hashedPassword };
  }

  public async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await compare(password, hashedPassword);
  }

  public async generateAccessToken(_id: string, role: string): Promise<string> {
    const payload = { _id, role };
    return this.jwtService.signAsync(payload, { expiresIn: '30d' });
  }
}
