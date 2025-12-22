import { IsNumber, IsString, IsUrl } from "class-validator";

export class AvatarUserDto {

	@IsUrl()
	path_url!: string;

	@IsString()
	mime_type!: string;

	@IsNumber()
	size!: number;
	
	@IsString()
	name!: string;
}
