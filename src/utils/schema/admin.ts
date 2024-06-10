import { z } from "zod";

export const adminSignUpSchema = z.object({
	email: z
		.string({
			required_error: "email is required!",
		})
		.email(),
	password: z
		.string({
			required_error: "password is required!",
		})
		.min(8),
	first_name: z.string({
		required_error: "first_name is required!",
	}),
	last_name: z.string({
		required_error: "last_name is required!",
	}),
});

export const adminLoginSchema = z.object({
	email: z
		.string({
			required_error: "email is required!",
		})
		.email(),
	password: z
		.string({
			required_error: "password is required!",
		})
		.min(8),
});
export const addCollectionByAdmin = z.object({
	title: z.string({
		required_error: "title is required",
	}),
	description: z.string({
		required_error: "description is required",
	}),
	tags: z.string({
		required_error: "tags is required",
	}),
	handle: z.string({
		required_error: "handle is required",
	}),
});

export const addProductByAdmin = z.object({
	price: z.string({
		required_error: "price is required",
	}),
	handle: z.string({
		required_error: "handle is required",
	}),
	title: z.string({
		required_error: "title is required",
	}),
	description: z.string({
		required_error: "description is required",
	}),
	collectionId: z.string({
		required_error: "collectionId is required!",
	}),
});
