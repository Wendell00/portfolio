import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "@/user/dto/createuser.dto";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login-user.dto";

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
}
