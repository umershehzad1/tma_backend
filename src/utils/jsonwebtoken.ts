import jwt from "jsonwebtoken";
import type { TokenPayload } from "@type/index";
import { APP_CONSTANTS } from "@config/app";
export const createToken = (payload: TokenPayload): string => {
	return jwt.sign(payload, APP_CONSTANTS.secret);
};

export const verifyToken = async (token: string): Promise<TokenPayload> => {
	try {
		const decode = (await jwt.verify(
			token,
			APP_CONSTANTS.secret,
		)) as TokenPayload;
		console.log({
			decode,
		});
		return decode;
	} catch (error) {
		console.log(error);
		throw new Error("Token verification failed");
	}
};
