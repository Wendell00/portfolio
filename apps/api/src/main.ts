import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: {
			origin: [process.env.CLIENT_ORIGIN || "http://localhost:3000"],
			credentials: true,
		},
	});
	app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

	const config = new DocumentBuilder()
		.setTitle("Portifolio")
		.setDescription("Documentação da API para o portifolio pessoal")
		.setVersion("1.0")
		.addBearerAuth({ type: "http", scheme: "bearer", bearerFormat: "JWT" }, "jwt")
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("docs", app, document);

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
