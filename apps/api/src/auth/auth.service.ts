import {
	AdminConfirmSignUpCommand,
	AdminInitiateAuthCommand,
	AdminUpdateUserAttributesCommand,
	type CognitoIdentityProviderClient,
	InitiateAuthCommand,
	SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { createHmac } from "crypto";
import { response } from "express";
import type { CreateUserDto } from "../user/dto/createuser.dto";
import { UserService } from "../user/user.service";
import { COGNITO_PROVIDER } from "./config/cognito.provider";
import { LoginUserDto } from "./dto/login-user.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";

@Injectable()
export class AuthService {
	constructor(
		@Inject(COGNITO_PROVIDER)
		private readonly client: CognitoIdentityProviderClient,
		private readonly userServices: UserService,
	) {}

	requiredEnv(name: string): string {
		const value = process.env[name];
		if (!value) {
			throw new Error(`Missing required environment variable: ${name}`);
		}
		return value;
	}

	generateSecretHash(email: string, clientId: string, clientSecret: string) {
		const message = email + clientId;

		const hmac = createHmac("sha256", clientSecret).update(message).digest("base64");

		return hmac;
	}

	async register(createUserDto: CreateUserDto) {
		const clientId = this.requiredEnv("COGNITO_CLIENT_ID");
		const clientSecret = this.requiredEnv("COGNITO_SECRET_ID");

		const secretHash = this.generateSecretHash(createUserDto.email, clientId, clientSecret);
		try {
			const signUpCmd = new SignUpCommand({
				ClientId: clientId,
				SecretHash: secretHash,
				Username: createUserDto.email,
				Password: createUserDto.password,
				UserAttributes: [{ Name: "email", Value: createUserDto.email }],
			});

			const result = await this.client.send(signUpCmd);

			if (!result.UserSub) {
				throw new Error("Cognito did not return UserSub");
			}

			await this.client.send(
				new AdminConfirmSignUpCommand({
					UserPoolId: this.requiredEnv("COGNITO_USER_POOL_ID"),
					Username: createUserDto.email,
				}),
			);

			await this.client.send(
				new AdminUpdateUserAttributesCommand({
					UserPoolId: this.requiredEnv("COGNITO_USER_POOL_ID"),
					Username: createUserDto.email,
					UserAttributes: [{ Name: "email_verified", Value: "true" }],
				}),
			);

			const newUser = await this.userServices.createUser(createUserDto, result.UserSub);

			return { message: "Usuario Criado com sucesso", newUser: newUser };
		} catch (error) {
			throw new HttpException("Credenciais invalidas", HttpStatus.BAD_REQUEST);
		}
	}

	async login(loginUserDto: LoginUserDto) {
		const clientId = this.requiredEnv("COGNITO_CLIENT_ID");
		const clientSecret = this.requiredEnv("COGNITO_SECRET_ID");

		const secretHash = this.generateSecretHash(loginUserDto.email, clientId, clientSecret);

		try {
			const findUser = await this.userServices.verifyUser(loginUserDto.email);

			const command = new AdminInitiateAuthCommand({
				UserPoolId: process.env.COGNITO_USER_POOL_ID,
				ClientId: process.env.COGNITO_CLIENT_ID,
				AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
				AuthParameters: {
					USERNAME: findUser.email,
					PASSWORD: loginUserDto.password,
					SECRET_HASH: secretHash,
				},
			});

			const res = await this.client.send(command);

			if (!res.AuthenticationResult) {
				throw new Error("Cognito did not return Authentication Result");
			}

			return {
				accessToken: res.AuthenticationResult.AccessToken,
				refreshToken: res.AuthenticationResult.RefreshToken,
				idToken: res.AuthenticationResult.IdToken,
				expiresIn: res.AuthenticationResult.ExpiresIn,
			};
		} catch (error) {
			throw new HttpException("Credenciais invalidas", HttpStatus.BAD_REQUEST);
		}
	}

	async refreshToken(refreshTokenDto: RefreshTokenDto) {
		const clientId = this.requiredEnv("COGNITO_CLIENT_ID");
		const clientSecret = this.requiredEnv("COGNITO_SECRET_ID");

		try {
			const findUser = await this.userServices.verifyUser(refreshTokenDto.email);

			const secretHash = this.generateSecretHash(findUser.cognito_id, clientId, clientSecret);
			const command = new InitiateAuthCommand({
				AuthFlow: "REFRESH_TOKEN_AUTH",
				ClientId: clientId,
				AuthParameters: {
					REFRESH_TOKEN: refreshTokenDto.refreshToken,
					SECRET_HASH: secretHash,
				},
			});

			const res = await this.client.send(command);
			const result = res.AuthenticationResult;

			if (!result) {
				throw new Error("Não foi possível renovar os tokens");
			}

			return {
				accessToken: result.AccessToken,
				idToken: result.IdToken,
				refreshToken: result.RefreshToken ?? refreshTokenDto.refreshToken,
				expiresIn: result.ExpiresIn,
				tokenType: result.TokenType,
			};
		} catch (error) {
			console.log(error);
			throw new HttpException("Credenciais invalidas", HttpStatus.BAD_REQUEST);
		}
	}
}
