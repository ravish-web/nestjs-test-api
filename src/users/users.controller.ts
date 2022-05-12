import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserCreateDTO, LoginDTO } from './users.model';
import { UserRoles } from '../utils/app.model';
import { UsersService } from './users.service';
import { AuthService } from '../utils/auth.service';
import { JwtService } from '@nestjs/jwt';




@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
        private readonly authService: AuthService,
        private readonly jwtService: JwtService


    ) { }
    @Post('/register')
    public async registerNewUser(@Body() userData: UserCreateDTO): Promise<any> {
        try {
            const checkuser = await this.userService.getUserByEmail(userData.email);
            if (checkuser) {
                return `user email already exists`;
            }
            const user = await this.userService.createUser(userData);
            return `user created`;
        } catch (e) {
        }
    }
    @Post('/login')
    public async validateUser(@Body() credential: LoginDTO): Promise<any> {
        try {
            const user = await this.userService.getUserByEmail(credential.email);
            if (!user) return `USER_EMAIL_NOT_FOUND`;
            console.log('user', user)


            const isValid = await this.authService.verifyPassword(credential.password, user.password);
            if (!isValid) return `USER_EMAIL_OR_PASSWORD_INVALID`;
            console.log('isValid', isValid)

            const token = await this.authService.generateAccessToken(user._id, user.role);
            console.log('token', token)
            return { token: token, role: user.role, id: user._id };
        } catch (e) {
        }
    }

}
