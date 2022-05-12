import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { UserCreateDTO } from './users.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<any>,
        private authService: AuthService,
    ) { }

    public async createUser(userData: UserCreateDTO): Promise<UserCreateDTO> {
        if (userData.email) userData.email = userData.email.toLowerCase();

        const hashedPassword = await this.authService.hashPassword(userData.password);
        userData.password = hashedPassword;

        const user = await this.userModel.create(userData);
        return user;
    }
    public async getUserByEmail(email: string): Promise<any> {
        const user = await this.userModel.findOne({ email: email });
        return user;
    }
    public async updatetPassword(userId: string, currentPassword: string): Promise<any> {
        const hashedPassword = await this.authService.hashPassword(currentPassword);
        const user = await this.userModel.findByIdAndUpdate(userId, { password: hashedPassword });
        return user;
    }

}
