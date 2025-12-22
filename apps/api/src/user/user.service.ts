import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import type { Role } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { PayloadAccessTokenDto } from "@/auth/dto/payload-access-token.dto";
import { AvatarUserDto } from "./dto/avatar-user.dto";
import type { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async createUser(
		createUserDto: CreateUserDto,
		cognitoId: string,
		role: Role = "USER",
	) {
		const newUser = await this.prisma.users.create({
			data: {
				name: createUserDto.name,
				username: createUserDto.username,
				email: createUserDto.email,
				role: role,
				cognito_id: cognitoId,
			},
		});

		return newUser;
	}

	async verifyUser(email: string) {
		try {
			const findUser = await this.prisma.users.findFirst({
				where: { email: email, active: true, deletedAt: null },
			});

			if (!findUser) {
				throw new HttpException(
					"Credenciais invalidas",
					HttpStatus.BAD_REQUEST,
				);
			}
			return findUser;
		} catch (error) {
			throw new HttpException("Credenciais invalidas", HttpStatus.BAD_REQUEST);
		}
	}

	async updateUser(
		updateUserDto: UpdateUserDto,
		payloadAccessToken: PayloadAccessTokenDto,
		avatarUploadDto: AvatarUserDto,
	) {
		const user = await this.getUser(payloadAccessToken);

		const newUser = await this.prisma.users.update({
			where: { id: user.id },
			data: {
				name: updateUserDto?.name ? updateUserDto?.name : user.name,
				username: updateUserDto.username
					? updateUserDto.username
					: user.username,updatedAt: new Date()
			},
		});

		return newUser;
	}

	async createAvatarUser(
		payloadAccessToken: PayloadAccessTokenDto,
		avatarCreateDto: AvatarUserDto,
	) {
		const user = await this.getUser(payloadAccessToken);

		const newAvatar = await this.prisma.upload.create({
			data: {
				name: avatarCreateDto.name,
				path_url: avatarCreateDto.path_url,
				mime_type: avatarCreateDto.mime_type,
				size: avatarCreateDto.size,
				type: "AVATAR",
				user_id: user.id,
			},
		});

		return newAvatar;
	}

	async getUser(payloadAccessToken: PayloadAccessTokenDto) {
		try {
			const findUser = await this.prisma.users.findFirst({
				where: {
					cognito_id: payloadAccessToken.sub,
					active: true,
					deletedAt: null,
				},
			});

			if (!findUser) {
				throw new HttpException("Usuario não existe", HttpStatus.BAD_REQUEST);
			}

			return {
				id: findUser.id,
				name: findUser.name,
				username: findUser.name,
				email: findUser.email,
			};
		} catch (error) {
			throw new HttpException("Credenciais invalidas", HttpStatus.BAD_REQUEST);
		}
	}

	async softDelete(tokenPayload: PayloadAccessTokenDto) {
		const user = await this.getUser(tokenPayload);

		return this.prisma.users.update({
			where: { id: user.id }, data: {deletedAt: new Date()}
		});
	}
}
