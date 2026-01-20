import { Type } from "class-transformer";
import { IsOptional, IsString, ValidateNested } from "class-validator";
import { AvatarUserDto } from "./avatar-user.dto";

export class UserDto {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsString()
	username?: string;
}
export class UpdateUserDto {
	@IsOptional()
	@ValidateNested()
	@Type(() => UserDto)
	user?: UserDto;

	@IsOptional()
	@ValidateNested()
	@Type(() => AvatarUserDto)
	avatar?: AvatarUserDto;
}
