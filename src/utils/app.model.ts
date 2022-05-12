import {
	IsArray,
	IsNumber,
	IsOptional,
	IsString,
	IsBoolean,
	IsNumberString,
	IsDateString,
} from 'class-validator';
//import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
export enum UserRoles {
	ADMIN = 'ADMIN',
	USER = 'USER',
}