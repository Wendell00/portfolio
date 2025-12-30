import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { COGNITO_PROVIDER, cognitoFactory } from "./config/cognito.provider";

@Module({
	imports: [UsersModule, PrismaModule],
	controllers: [AuthController],
	providers: [
		AuthService,
		{
			provide: COGNITO_PROVIDER,
			useFactory: cognitoFactory,
		},
	],
	exports: [AuthService],
})
export class AuthModule {}
