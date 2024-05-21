"use strict";

const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const json = require("../../../Traits/ApiResponser");

let o = {};

o.create = async (req, res) => {
  try {
    const product = await Product.findOne({ name: req.body.name });

    if (product) {
      return json.errorResponse(res, "Product Already Exist!", 409);
    }

    let newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      discount: req.body.discount,
      discountDate: req.body.discountDate,
      size: req.body.size,
      category: req.body.category,
      quantity: req.body.quantity,
      description: req.body.description,
      featuredImage: req.body.featuredImage,
      images: req.body.images,
      isFeatured: req.body.isFeatured,
      tags: req.body.tags,
    });

    newProduct = await newProduct.save();
    json.successResponse(res, newProduct, 201);
  } catch (err) {
    return json.errorResponse(res, err);
  }
};

o.getAll = async (req, res) => {
  try {
    const product = await Product.find().populate("category");

    json.successResponse(res, product, 200);
  } catch (err) {
    return json.errorResponse(res, err);
  }
};

o.detail = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });

    if (!product) {
      return json.errorResponse(res, "Product Not Found!", 404);
    }

    json.successResponse(res, product);
  } catch (error) {
    return json.errorResponse(res, err);
  }
};

o.update = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });

    if (!product) {
      return json.errorResponse(res, "Product Not Found!", 404);
    }

    let properties = {};
    req.body.name ? (properties["name"] = req.body.name) : "";
    req.body.price ? (properties["price"] = req.body.price) : "";
    req.body.discount ? (properties["discount"] = req.body.discount) : "";
    req.body.discountDate
      ? (properties["discountDate"] = req.body.discountDate)
      : "";
    req.body.size ? (properties["size"] = req.body.size) : "";
    req.body.category ? (properties["category"] = req.body.category) : "";
    req.body.rating ? (properties["rating"] = req.body.rating) : "";
    req.body.quantity ? (properties["quantity"] = req.body.quantity) : "";
    req.body.description
      ? (properties["description"] = req.body.description)
      : "";
    req.body.featuredImage
      ? (properties["featuredImage"] = req.body.featuredImage)
      : "";
    req.body.images ? (properties["images"] = req.body.images) : "";
    req.body.isFeatured ? (properties["isFeatured"] = req.body.isFeatured) : "";
    req.body.tags ? (properties["tags"] = req.body.tags) : "";

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { $set: properties },
      { new: true }
    );

    json.showOne(res, updatedProduct);
  } catch (error) {
    return json.errorResponse(res, err);
  }
};


o.delete = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });

        if (!product) {
            return json.errorResponse(res, "product Not Found!", 404);
        }

        await Product.deleteOne({ _id: req.params.id });

        return json.successResponse(res, "product successfully deleted.");
    } catch (error) {
        return json.errorResponse(res, error.message);
    }
};

module.exports = o;
