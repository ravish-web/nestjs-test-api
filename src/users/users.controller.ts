import { Controller, Post, Body, BadRequestException, Get, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { UserCreateDTO, LoginDTO, passwordChangeDto } from './users.model';
import { UserRoles } from '../utils/app.model';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';


@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
        private readonly authService: AuthService,


    ) { }
    @Post('/register')
    public async registerNewUser(@Body() userData: UserCreateDTO): Promise<any> {
        try {
            const checkuser = await this.userService.getUserByUsername(userData.username);
            if (checkuser) {
                return `username already exists`;
            }
            const user = await this.userService.createUser(userData);
            return `user created`;
        } catch (e) {
        }
    }
    @Post('/login')
    @UseGuards(AuthGuard('local'))
    public async validateUser(@Body() credential: LoginDTO): Promise<any> {
        try {
            const user = await this.userService.getUserByUsername(credential.username);
            if (!user) return `USER_NAME_NOT_FOUND`;
            console.log('user', user)

            const isValid = await this.authService.verifyPassword(credential.password, user.password);
            if (!isValid) return `USER_NAME_OR_PASSWORD_INVALID`;
            console.log('isValid', isValid)

            const token = await this.authService.generateAccessToken(user._id);
            console.log('token', token)
            return { token: token, id: user._id };
        } catch (e) {
        }
    }
    @Post('/password-change')
    @UseGuards(AuthGuard('jwt'))
    public async passwordChange(@Body() credential: passwordChangeDto): Promise<any> {
        try {
            const user = await this.userService.getUserByUsername(credential.username);
            if (!user) return `USER_NAME_NOT_FOUND`;
            console.log('user', user)

            const isValid = await this.authService.verifyPassword(credential.oldPassword, user.password);
            if (!isValid) return `USER_NAME_OR_PASSWORD_INVALID`;
            console.log('isValid', isValid)

            const token = await this.userService.updatetPassword(user._id, credential.currentPassword );
            return `password change successfully`;
        } catch (e) {
        }
    }
    @Get('/list')
    @UseGuards(AuthGuard('jwt'))
    public async getAllUserList(): Promise<any> {
        try {
            const user = await this.userService.getAllUser()
            return user
        } catch (e) {
        }
    }
}
