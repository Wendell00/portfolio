import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./modules/auth/auth.module";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { UserModule } from "./modules/users/users.module";

@Module({
	imports: [AuthModule, ConfigModule.forRoot({ isGlobal: true }), UserModule, PrismaModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
