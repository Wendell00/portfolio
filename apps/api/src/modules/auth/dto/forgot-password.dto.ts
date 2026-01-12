import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class ForgotPasswordDto {
	@IsNotEmpty()
	@IsString()
	email!: string;
}

export class ConfirmForgotPasswordDto {
	@IsNotEmpty()
	@IsString()
	email!: string;
	@IsNotEmpty()
	@IsString()
	code!: string;
	@MinLength(8)
	@IsNotEmpty()
	@IsString()
	newPassword!: string;
}
