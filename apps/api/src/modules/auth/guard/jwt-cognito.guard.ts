import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Request } from "express";
import * as jwt from "jsonwebtoken";
import { JwksClient } from "jwks-rsa";
import { REQUEST_TOKEN_PAYLOAD_NAME } from "../common/auth.constants";

@Injectable()
export class JwtCognitoGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenHeader(request);

		try {
			const decoded = jwt.decode(token, { complete: true });

			if (!decoded || typeof decoded === "string") {
				throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
			}

			const { kid } = decoded.header;
			const client = new JwksClient({
				jwksUri: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
			});

			const key = await client.getSigningKey(kid);
			const publicKey = key.getPublicKey();

			const payload = jwt.verify(token, publicKey, {
				issuer: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`,
			}) as jwt.JwtPayload;

			request[REQUEST_TOKEN_PAYLOAD_NAME] = {
				sub: payload.sub,
				client_id: payload.client_id,
				scope: payload.scope,
				groups: payload["cognito:groups"] ?? [],
			};

			return true;
		} catch (error) {
			console.log(error);
			throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
		}
	}

	extractTokenHeader(request: Request) {
		const authHeader = request.headers.authorization;

		if (!authHeader) {
			throw new HttpException("Authorization header not found", HttpStatus.UNAUTHORIZED);
		}

		const [type, token] = authHeader.split(" ");

		if (type !== "Bearer" || !token) {
			throw new HttpException("Invalid authorization format", HttpStatus.UNAUTHORIZED);
		}
		return token;
	}
}
