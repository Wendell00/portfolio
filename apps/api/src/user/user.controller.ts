import { Body, Controller, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { PayloadAccessTokenDto } from "@/auth/dto/payload-access-token.dto";
import { JwtCognitoGuard } from "@/auth/guard/jwt-cognito.guard";
import { TokenPayloadParam } from "@/auth/params/token-payload.params";
import { AvatarUserDto } from "./dto/avatar-user.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UseGuards(JwtCognitoGuard)
	@Get()
	getUser(@TokenPayloadParam() tokenPayload: PayloadAccessTokenDto) {
		return this.userService.getUser(tokenPayload);
	}

	@UseGuards(JwtCognitoGuard)
	@Post("avatar")
	createAvatar(
		@TokenPayloadParam() tokenPayload: PayloadAccessTokenDto,
		@Body() avatarCreateDto: AvatarUserDto
	) {
		return this.userService.createAvatarUser(tokenPayload, avatarCreateDto);
	}

}
