import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

export const COGNITO_PROVIDER = "COGNITO_PROVIDER";

function requiredEnv(name: string): string {
	const value = process.env[name];
	if (!value) {
		throw new Error(`Missing environment variable: ${name}`);
	}
	return value;
}

export const cognitoFactory = () => {
	return new CognitoIdentityProviderClient({
		region: requiredEnv("AWS_REGION"),
		credentials: {
			accessKeyId: requiredEnv("AWS_ACCESS_KEY_ID"),
			secretAccessKey: requiredEnv("AWS_SECRET_ACCESS_KEY"),
		},
	});
};
