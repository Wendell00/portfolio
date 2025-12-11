import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import type { Role } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import type { CreateUserDto } from "./dto/createuser.dto";
import { PayloadAccessTokenDto } from "@/auth/dto/payload-access-token.dto";

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
				where: { email: email ? , active: true, deletedAt: null },
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

	async updateUser(){}

	async getUser(payloadAccessToken: PayloadAccessTokenDto){

	}
}
