"use strict";

const mongoose = require("mongoose");
const Category = mongoose.model("Category");
const json = require("../../../Traits/ApiResponser");

let o = {};

o.create = async (req, res) => {

    try {

        const Category = await Category.findOne({ name: req.body.name });

        if (Category) {

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

o.getAll = async (req, res) => {

    try {

        const Categories = await Category.find({});

        json.successResponse(res, Categories, 200);

    } catch (err) {

        return json.errorResponse(res, err);
    }

};

o.update = async (req, res) => {
    
    try {

        const Category = await Category.findOne({ _id: req.params.id });

        if (!Category) {

            return json.errorResponse(res, "Category Not Found!", 404);
        }

        let properties = {};
        (req.body.name)         ?  properties["name"]          = req.body.name          : "";
        (req.body.image)        ?  properties["image"]         = req.body.image         : "";

        const updatedCategory = await Category.findOneAndUpdate({_id: req.decoded._id}, { $set: properties}, { upsert: true, new: true })

        json.showOne(res, updatedCategory);

    } catch (error) {

        return json.errorResponse(res, err);
    }
};

module.exports = o;
