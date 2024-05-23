"use strict";

const mongoose = require("mongoose");
const Category = mongoose.model("Category");
const Product = mongoose.model("Product");
const json = require("../../../Traits/ApiResponser");

let o = {};

o.getAll = async (req, res) => {
    try {
        const categories = await Category.find({}).lean(); // Use lean() to get plain JavaScript objects instead of mongoose documents
        
        // Populate products for each category and count the number of products
        const categoriesWithProducts = await Promise.all(categories.map(async (category) => {
            const productsCount = await Product.countDocuments({ category: category._id });
            category.productsCount = productsCount;
            return category;
        }));

        // Send response
        json.successResponse(res, categoriesWithProducts, 200);
    } catch (err) {
        return json.errorResponse(res, err);
    }
};

o.create = async (req, res) => {

    try {

        const category = await Category.findOne({ name: req.body.name });

        if (category) {

            return json.errorResponse(res, "Category Already Exist!", 409);
        }

        let newCategory = new Category({

            name: req.body.name,
            image: req.body.image,
        });

        newCategory = await newCategory.save();
        json.successResponse(res, newCategory, 201);

    } catch (err) {

        return json.errorResponse(res, err);
    }

};



o.update = async (req, res) => {
    
    try {

        const category = await Category.findOne({ _id: req.params.id });

        if (!category) {

            return json.errorResponse(res, "Category Not Found!", 404);
        }

        let properties = {};
        (req.body.name)         ?  properties["name"]          = req.body.name          : "";
        (req.body.image)        ?  properties["image"]         = req.body.image         : properties["image"]  ="";

        const updatedCategory = await Category.findOneAndUpdate({_id: req.params.id}, { $set: properties}, { new: true })

        json.showOne(res, updatedCategory);

    } catch (error) {

        return json.errorResponse(res, error);
    }
};
o.delete = async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.params.id });

        if (!category) {
            return json.errorResponse(res, "Category Not Found!", 404);
        }

        await Category.deleteOne({ _id: req.params.id });

        return json.successResponse(res, "Category successfully deleted.");
    } catch (error) {
        return json.errorResponse(res, error.message);
    }
};

module.exports = o;
