import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from '../auth/auth.service';
import { UsersController } from './users.controller';
import { UserSchema } from './users.model';
import { UsersService } from './users.service';


@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
  JwtModule.register({ 
    secret: 'secret',
    signOptions: {expiresIn: '30d'}
  })
],
  controllers: [UsersController],
  providers: [UsersService, AuthService]
})
export class UsersModule {}
