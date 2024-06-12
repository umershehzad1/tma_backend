import ProductVariantsOption from "@model/ProductVariantsOptions";
import Product from "@model/Product";
import ProductImage from "@model/ProductImage";
import ProductVariants from "@model/ProductVariants";
import type { IAuthRequest } from "@type/index";
import type { Response } from "express";
import {  Op} from"sequelize"

export async function getSingleProductById(
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	req: IAuthRequest<{}, { productId: string }>,
	res: Response,
) {
	try {
		const { productId } = req.params;
		console.log("Running Single Product Id", productId);
		const product = await Product.findByPk(Number(productId), {
			include: [
				{
					model: ProductImage,
					as: "images",
				},
				{
					model: ProductVariants,
					as: "variants",
					include: [
						{
							model: ProductVariantsOption,
							as: "options",
						},
					],
				},
			],
		});
		if (!product) {
			return res.status(404).send({
				message: "Product not found",
			});
		}

		return res.status(200).send({
			message: "Product fetched successfully",
			data: product,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			message: "Internal server error",
			error,
		});
	}
}


export async function getAllProducts(req: IAuthRequest,
	res: Response) {
	try {
		const products = await Product.findAll({
			include: [
				{
					model: ProductImage,
					as: "images",
				},
				{
					model: ProductVariants,
					as: "variants",
					include: [
						{
							model: ProductVariantsOption,
							as: "options",
						},
					],
				},
			],
			
		});
		return res.status(200).send({
			message: "Products fetched successfully",
			data: products
		})
	} catch (error) {
		return res.status(500).send({
			message: "Internal server error",
			error
		})
	}
	
}