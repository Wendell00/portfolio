import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PayloadAccessTokenDto } from "../auth/dto/payload-access-token.dto";
import { PrismaService } from "../prisma/prisma.service";
import { UsersService } from "../users/users.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Injectable()
export class PostsService {
	constructor(
		private prisma: PrismaService,
		private userService: UsersService,
	) {}

	async createPost(payloadToken: PayloadAccessTokenDto, createPostDto: CreatePostDto) {
		try {
			const user = await this.userService.getUser(payloadToken);

			const newPost = await this.prisma.posts.create({
				data: { userId: user.id, title: createPostDto.title, message: createPostDto.message },
				select: { title: true, message: true },
			});

			return newPost;
		} catch (_error) {
			throw new HttpException("Credenciais invalidas", HttpStatus.BAD_REQUEST);
		}
	}

	async getPosts(payloadToken: PayloadAccessTokenDto) {
		const user = await this.userService.getUser(payloadToken);

		const userPosts = await this.prisma.posts.findMany({
			where: { userId: user.id, deletedAt: null },
			orderBy: { createdAt: "desc" },
		});

		return userPosts;
	}

	async softDelete(payloadToken: PayloadAccessTokenDto, uuid: string) {
		try {
			const user = await this.userService.getUser(payloadToken);

			const userPosts = await this.prisma.posts.findUnique({
				where: { userId: user.id, id: uuid, deletedAt: null },
			});

			if (!userPosts) {
				throw new HttpException("Post não encontrado", HttpStatus.BAD_REQUEST);
			}

			await this.prisma.posts.update({
				where: {
					id: userPosts.id,
				},
				data: {
					deletedAt: new Date(),
				},
			});
			return { message: "Post removido com sucesso" };
		} catch (_error) {
			throw new HttpException("Credenciais invalidas", HttpStatus.BAD_REQUEST);
		}
	}

	async updatePost(payloadToken: PayloadAccessTokenDto, uuid: string, updatePostDto: UpdatePostDto) {
		const user = await this.userService.getUser(payloadToken);

		const userPosts = await this.prisma.posts.findUnique({
			where: { userId: user.id, id: uuid, deletedAt: null },
		});

		if (!userPosts) {
			throw new HttpException("Post não encontrado", HttpStatus.BAD_REQUEST);
		}

		const newPost = await this.prisma.posts.update({
			where: {
				id: userPosts.id,
			},
			data: {
				title: updatePostDto.title ? updatePostDto.title : userPosts.title,
				message: updatePostDto.message ? updatePostDto.message : userPosts.message,
			},
		});

		return newPost;
	}
}
