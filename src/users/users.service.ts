import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../utils/auth.service';
import { UserCreateDTO } from './users.model';

@Injectable()
export class UsersService {
    constructor(
		@InjectModel('User') private readonly userModel: Model<any>,
		private authService: AuthService,
		//private utilService: UtilService,
	) {}

    public async createUser(userData: UserCreateDTO): Promise<UserCreateDTO> {
		if (userData.email) userData.email = userData.email.toLowerCase();
		const { salt, hashedPassword } = await this.authService.hashPassword(userData.password);
		userData.salt = salt;
		userData.password = hashedPassword;
		
		const user = await this.userModel.create(userData);
		return user;
	}
    public async getUserByEmail(email: string): Promise<any> {
		const user = await this.userModel.findOne({email:email});
		return user;
	}

}
