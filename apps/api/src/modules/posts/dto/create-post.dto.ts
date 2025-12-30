import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreatePostDto {
	@IsNotEmpty()
	@MaxLength(1000)
	@IsString()
	title!: string;

	@IsNotEmpty()
	@MaxLength(10000)
	@IsString()
	message!: string;
}
