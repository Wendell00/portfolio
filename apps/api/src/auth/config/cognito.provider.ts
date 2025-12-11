import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

export const COGNITO_PROVIDER = "COGNITO_PROVIDER";

export const cognitoFactory = () => {
	return new CognitoIdentityProviderClient({
		region: process.env.AWS_REGION,
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
		},
	});
};
