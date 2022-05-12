import * as mongoose from 'mongoose';
import {
	IsNotEmpty,
	IsEmail,
	IsEmpty,
	IsUrl,
	IsNumber,
	Length,
	IsOptional,
	IsPositive,
	Min,
	Equals,
	IsArray,
	ValidateNested,
	IsString,
	Max,
	IsEnum,
	IsAlphanumeric,
	IsBoolean,
	isMongoId,
	IsMongoId,
	IsPhoneNumber,
	IsDate,
	ArrayMinSize,
	isObject,
	IsObject,
	IsDateString,
	IsNumberString,
} from 'class-validator';
//import { ApiModelProperty } from '@nestjs/swagger';
//import { Type } from 'class-transformer';
import { UserRoles } from '../utils/app.model';
export const UserSchema = new mongoose.Schema(
	{
		firstName: { type: String },
		lastName: { type: String },
		email: { type: String, trim: true, lowercase: true, sparse: true },
		password: { type: String },
    },
	{
		timestamps: true,
	}
);

// ########## --- DTO's --- ##########
export class UserCreateDTO {
	@IsString()
	@IsNotEmpty()
	firstName: string;

	@IsString()
	@IsNotEmpty()
	lastName: string;

	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	@Length(6, 35)
	password: string;
	
	
}
export class LoginDTO {
	@IsNotEmpty()
	@IsEmail()
	@IsString()
	email: string;

	@IsNotEmpty()
	@Length(6, 35)
	@IsString()
	password: string;
	
}
export class passwordChangeDto {
    @IsNotEmpty()
	@IsEmail()
	@IsString()
	email: string;

	@IsNotEmpty()
	@IsString()
	oldPassword: string;

	@IsNotEmpty()
	@IsString()
	currentPassword: string;
	
}

