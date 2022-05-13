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
    secret: 'key',
    signOptions: {expiresIn: '30d'}
  })
],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  exports: [UsersService, MongooseModule, JwtModule]
})
export class UsersModule {}
