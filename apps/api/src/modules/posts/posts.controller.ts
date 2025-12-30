import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
	UseGuards,
} from "@nestjs/common";
import { PayloadAccessTokenDto } from "../auth/dto/payload-access-token.dto";
import { JwtCognitoGuard } from "../auth/guard/jwt-cognito.guard";
import { TokenPayloadParam } from "../auth/params/token-payload.params";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostsService } from "./posts.service";

@Controller("posts")
export class PostsController {
	constructor(private postsService: PostsService) {}

	@UseGuards(JwtCognitoGuard)
	@Post("create")
	createPost(@TokenPayloadParam() payloadToken: PayloadAccessTokenDto, @Body() createPostDto: CreatePostDto) {
		return this.postsService.createPost(payloadToken, createPostDto);
	}


	@Get()
	getPosts() {
		return this.postsService.getPosts();
	}

	@UseGuards(JwtCognitoGuard)
	@Delete(":uuid")
	@HttpCode(HttpStatus.NO_CONTENT)
	deletePosts(
		@TokenPayloadParam() payloadToken: PayloadAccessTokenDto,
		@Param("uuid", new ParseUUIDPipe()) uuid: string,
	) {
		return this.postsService.softDelete(payloadToken, uuid);
	}

	@UseGuards(JwtCognitoGuard)
	@Patch(":uuid")
	updatePost(
		@TokenPayloadParam() payloadToken: PayloadAccessTokenDto,
		@Param("uuid", new ParseUUIDPipe()) uuid: string,
		@Body() updatePostDto: UpdatePostDto,
	) {
		return this.postsService.updatePost(payloadToken, uuid, updatePostDto);
	}
}
