import { IsOptional, IsString, MaxLength } from "class-validator";

export class UpdatePostDto {
	@IsOptional()
	@MaxLength(30)
	@IsString()
	title?: string;

	@IsOptional()
	@IsString()
	message?: string;
}
