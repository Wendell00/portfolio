import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { ConfirmForgotPasswordDto, ForgotPasswordDto } from "./dto/forgot-password.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("register")
	registerUser(@Body() createUserDto: CreateUserDto) {
		return this.authService.register(createUserDto);
	}

	@Post("login")
	loginUser(@Body() loginUserDto: LoginUserDto) {
		return this.authService.login(loginUserDto);
	}

	@Post("refresh")
	refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
		return this.authService.refreshToken(refreshTokenDto);
	}

	@Post("forgot-password")
	forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
		return this.authService.forgotPassword(forgotPasswordDto);
	}

	@Post("confirm-forgot-password")
	confirmForgotPassword(@Body() confirmForgotPasswordDto: ConfirmForgotPasswordDto) {
		return this.authService.confirmForgotPassword(confirmForgotPasswordDto);
	}
}
