import { Injectable, NotFoundException } from '@nestjs/common';
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
    public async getUserById(userId: String): Promise<any> {
		const user = await this.userModel.findById(userId);
		return user;
	}
    

    public async createUser(userData: UserCreateDTO): Promise<UserCreateDTO> {

        const hashedPassword = await this.authService.hashPassword(userData.password);
        userData.password = hashedPassword;

        const user = await this.userModel.create(userData);
        return user;
    }
    public async getUserByUsername(username: string): Promise<any> {
        const user = await this.userModel.findOne({ username: username });
        return user;
    }
    public async updatetPassword(userId: string, currentPassword: string): Promise<any> {
        const hashedPassword = await this.authService.hashPassword(currentPassword);
        const user = await this.userModel.findByIdAndUpdate(userId, { password: hashedPassword });
        return user;
    }
    public async getAllUser(): Promise<any> {
        const user = await this.userModel.find();
        return user;
    }
}
