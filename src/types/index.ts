import type { Request } from "express";
import type {
	adminSignUpSchema,
	adminLoginSchema,
	addCollectionByAdmin,
} from "@schema/admin";
import type { z } from "zod";
// import type { TokenPayload } from "@type/jwt";
// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type TRequest<T, P = {}, Q = {}> = Request<P, {}, T, Q>;
// biome-ignore lint/complexity/noBannedTypes: <explanation>
export interface IAuthRequest<T = {}, P = {}, Q = {}>
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	extends Request<P, {}, T, Q> {
	user?: TokenPayload;
}
// ? JWT TOKEN PAYLOAD
export type TokenPayload = {
	email: string;
	id: number;
	isAdmin: "customer" | "admin";
};

// ? Admin types

export type IAdminUser = z.infer<typeof adminSignUpSchema>;
export type IAdminLogin = z.infer<typeof adminLoginSchema>;
export type ICollectionByAdmin = z.infer<typeof addCollectionByAdmin>;
