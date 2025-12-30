import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import type { Role, Upload } from "@prisma/client";
import { PayloadAccessTokenDto } from "../auth/dto/payload-access-token.dto";
import { PrismaService } from "../prisma/prisma.service";
import { AvatarUserDto } from "./dto/avatar-user.dto";
import type { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async createUser(createUserDto: CreateUserDto, cognitoId: string, role: Role = "USER") {
		const newUser = await this.prisma.users.create({
			data: {
				name: createUserDto.name,
				username: createUserDto.username,
				email: createUserDto.email,
				role: role,
				cognitoId: cognitoId,
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
				throw new HttpException("Credenciais invalidas", HttpStatus.BAD_REQUEST);
			}
			return findUser;
		} catch (_error) {
			throw new HttpException("Credenciais invalidas", HttpStatus.BAD_REQUEST);
		}
	}

	async updateUser(payloadAccessToken: PayloadAccessTokenDto, updateUserDto: UpdateUserDto) {
		const user = await this.getUser(payloadAccessToken);

		const { avatar, ...updateuser } = updateUserDto;

		try {
			return await this.prisma.$transaction(async (tx) => {
				let newAvatar: Upload | null = null;

				if (avatar) {
					newAvatar = await tx.upload.create({
						data: {
							name: avatar.name,
							pathUrl: avatar.pathUrl,
							mimeType: avatar.mimeType,
							size: avatar.size,
							type: "AVATAR",
							userId: user.id,
						},
					});
				}

				// B) atualizar user
				const newUser = await tx.users.update({
					where: { id: user.id },
					data: {
						name: updateuser?.name ? updateuser?.name : user.name,
						username: updateuser.username ? updateuser.username : user.username,
						updatedAt: new Date(),
					},
				});
				// C) retorno
				return {
					user: newUser,
					avatar: newAvatar,
				};
			});
		} catch (_error) {
			throw new HttpException("Credenciais invalidas", HttpStatus.BAD_REQUEST);
		}
	}

	async createAvatarUser(payloadAccessToken: PayloadAccessTokenDto, avatarCreateDto: AvatarUserDto) {
		const user = await this.getUser(payloadAccessToken);

		const newAvatar = await this.prisma.upload.create({
			data: {
				name: avatarCreateDto.name,
				pathUrl: avatarCreateDto.pathUrl,
				mimeType: avatarCreateDto.mimeType,
				size: avatarCreateDto.size,
				type: "AVATAR",
				userId: user.id,
			},
		});

		return newAvatar;
	}

	async getUser(payloadAccessToken: PayloadAccessTokenDto) {
		try {
			const findUser = await this.prisma.users.findFirst({
				where: {
					cognitoId: payloadAccessToken.sub,
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
				username: findUser.username,
				email: findUser.email,
			};
		} catch (_error) {
			throw new HttpException("Credenciais invalidas", HttpStatus.BAD_REQUEST);
		}
	}

	async softDelete(tokenPayload: PayloadAccessTokenDto) {
		try {
			const user = await this.getUser(tokenPayload);

			return this.prisma.users.update({
				where: { id: user.id },
				data: { deletedAt: new Date(), active: false },
			});
		} catch (_error) {
			throw new HttpException("Credenciais invalidas", HttpStatus.BAD_REQUEST);
		}
	}
}
