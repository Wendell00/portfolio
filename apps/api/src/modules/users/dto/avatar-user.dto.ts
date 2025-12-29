import { IsNumber, IsString, IsUrl } from "class-validator";

export class AvatarUserDto {
	@IsUrl()
	pathUrl!: string;

	@IsString()
	mimeType!: string;

	@IsNumber()
	size!: number;

	@IsString()
	name!: string;
}
