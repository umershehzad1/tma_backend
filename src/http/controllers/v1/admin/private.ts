import Collection from "@model/Collection";
import Product from "@model/Product";
import ProductImage from "@model/ProductImage";
import ProductVariants from "@model/ProductVariants";
import ProductVariantOptions from "@model/ProductVariantsOptions";
import { Op } from "sequelize";
import type {
	IAuthRequest,
	ICollectionByAdmin,
	IProductByAdmin,
} from "@type/index";
import { generateHandleCollection } from "@utils/index";
import type { Response } from "express";
export async function addNewCollectionByAdmin(
	req: IAuthRequest<ICollectionByAdmin>,
	res: Response,
) {
	try {
		const { description, handle, title } = req.body;
		const handle_url = generateHandleCollection(handle);
		const file = req.file;

		const collection = await Collection.create({
			description,
			handle: handle_url,
			image: file?.filename as string,
			title,
		});
		return res.status(200).json({
			message: "Collection created successfully",
			data: collection,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Internal server error",
			error,
		});
	}
}

export async function addNewProduct(
	req: IAuthRequest<IProductByAdmin>,
	res: Response,
) {
	try {
		const {
			collectionId,
			description,
			handle,
			price,
			title,
			quantity,
			product_image_quantity,
			variants,
			product_status
		} = req.body;
		console.log({ variants });
		// * All the files attached my multer
		const files = req.files as Express.Multer.File[];
		//  * Validating the collection before adding the product
		const collection = await Collection.findByPk(Number(collectionId));
		if (!collection) {
			return res.status(404).send({
				message: "No Collection is found on the collectionId",
			});
		}

		// * Distributing the images to product and variants based on the quantity number of images coming from the frontend.
		const product_images = files.slice(0, Number(product_image_quantity));
		const variant_images = files.slice(Number(product_image_quantity));
		// * generating a handle based on the handle provided==>
		const handle_url = generateHandleCollection(handle);
		// * Creating the Product with images
		const product = await Product.create(
			{
				description,
				handle: handle_url,
				price: Number(price),
				title,
				collectionId: Number(collectionId),
				quantity: Number(quantity),
				status:product_status
			},
			{
				raw: true,
			},
		);
		// * creating an array of images to save them directly product images using bulkCreate
		const allImage: { image_url: string; product_id: number }[] =
			product_images?.map((file) => ({
				image_url: file.filename,
				product_id: product.id,
			}));
		await ProductImage.bulkCreate(allImage);
		// * Creating the variants
		if (variants) {
			// * Distributing the images to product and variants based on the quantity number of images coming from the frontend.
			const variantPromises = variants.map(async (variantData, _index) => {
				const { options, name } = variantData;
				const variant = await ProductVariants.create({
					name,
					product_id: product.id,
				});

				// Store the shifted value in a variable
				const shiftedImage = variant_images.shift();

				const variantOptionsPromises = options.map(async (option) => {
					return ProductVariantOptions.create({
						image_url: shiftedImage?.filename as string,
						variant_id: variant.id,
						name: option.name,
						price: Number(option.price),
						quantity: Number(option.quantity),
					});
				});

				await Promise.all(variantOptionsPromises);
			});
			await Promise.all(variantPromises);
		}

		return res.status(200).json({
			message: "Product created successfully",
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

export async function updateTheCollection(req: IAuthRequest<ICollectionByAdmin, {collection_id:string}>,
	res: Response) {
	try {
		const { description, handle, title } = req.body;
		const { collection_id } = req.params;
		const handle_url = generateHandleCollection(handle);

		const collection = await Collection.findByPk(Number(collection_id));

		if (!collection) {
			return res.status(404).send({
				message: "No Collection is found on the collectionId",
			});
		}
		const isFile = req.file?.filename as string
		
		await collection.update({
			description,
			handle: handle_url,
			title,
			...(isFile ? {image:isFile} : {})
			
		});
		return res.status(200).json({
			message: "Collection updated successfully",
			data: collection,
		});
		
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			message: "Internal server error",
			error,
		});
	}
}
	 

export async function updateProductByAdmin(
	req: IAuthRequest<IProductByAdmin, { product_id: string }>,
	res: Response,
) {
	const { collectionId, description, handle, price, product_image_quantity, product_status, quantity, title, images_removed, variants } = req.body;
	const { product_id} = req.params;
	const collection = await Collection.findByPk(Number(collectionId));
	const handle_url = generateHandleCollection
	(handle)
	if (!collection) { 
		return res.status(404).send({
			message:"No Collection is found on the collectionId"
		})
	}

	const product = await Product.findByPk(Number(product_id), {
		include: [
			ProductImage,
		]
	});
	if (!product) {
		return res.status(404).send({
			message: "No Product is found on the product_id",
		});
	}

	if (images_removed) { 
		await ProductImage.destroy({
			where: {
				id: {
					[Op.in]:JSON.parse(images_removed)
				}
			}
		})
	}
	const files = req.files as Express.Multer.File[];
	if (files) { 
		const allImage: { image_url: string; product_id: number }[] =
			files?.map((file) => ({
				image_url: file.filename,
				product_id: product.id,
			}));
		await ProductImage.bulkCreate(allImage);
	}
	await product.update({
		collectionId: Number(collectionId),
		description,
		quantity: Number(quantity),
		status:product_status,
		title,
		price: Number(price),
		handle: handle_url,

	})

	return res.status(200).send({
		message: "Product updated successfully",
		data:product,
	})



}



export async function deleteProductByAdmin(
	req: IAuthRequest<{}, { product_id: string }>,
	res: Response,
) {
	try {
		const { product_id } = req.params;
		const product = await Product.findByPk(Number(product_id), {
			include: [
				ProductImage,
				{
					model: ProductVariants,
					include: [
						ProductVariantOptions
					]
				}
				
			]
		});
		if (!product) { 
			return res.status(404).send({
				message: "No Product is found on the product_id",
			});
		}

		await product.destroy();
		return res.status(200).send({
			message: "Product deleted successfully",
		});
	
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			message: "Internal server error",
			error,
		});
	
	
	}
}


export async function deleteCollectionByAdmin(
	req: IAuthRequest<{}, { collection_id: string }>,
	res: Response,
) {
	try {
		const { collection_id } = req.params;
		const collection = await Collection.findByPk(Number(collection_id), {
			include:[Product]
		});
		if (!collection) {
			return res.status(404).send({
				message: "No Collection is found on the collectionId",
			});
		}
			await Product.update(
			{ collectionId: null },
			{ where: { collectionId: Number(collection_id) } }
		);
		await collection.destroy();
		return res.status(200).send({
			message: "Collection deleted successfully",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			message: "Internal server error",
			error,
		})
	}
}