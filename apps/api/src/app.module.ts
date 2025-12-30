import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./modules/auth/auth.module";
import { PostsModule } from "./modules/posts/posts.module";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
	imports: [AuthModule, ConfigModule.forRoot({ isGlobal: true }), UsersModule, PrismaModule, PostsModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
