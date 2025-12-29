import { Type } from "class-transformer";
import { IsOptional, IsString, ValidateNested } from "class-validator";
import { AvatarUserDto } from "./avatar-user.dto";

export class UpdateUserDto {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsString()
	username?: string;

	@IsOptional()
	@ValidateNested()
	@Type(() => AvatarUserDto)
	avatar?: AvatarUserDto;
}
