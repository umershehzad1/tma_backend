"use strict";

const mongoose = require("mongoose");
const Favorite = mongoose.model("Favorite");
const json = require("../../../Traits/ApiResponser");

let o = {};

o.create = async (req, res) => {

    try {

        const Favorite = await Favorite.findOneAndUpdate({ product: req.body.product_id, user: req.decoded._id });

        if (Favorite) {

            return json.errorResponse(res, "Favorite Already Exist!", 409);
        }

        let newFavorite = new Favorite({

            name: req.body.name,
            image: req.body.image,
        });

        newFavorite = await newFavorite.save();
        json.successResponse(res, newFavorite, 201);

    } catch (err) {

        return json.errorResponse(res, err);
    }

};

o.getAll = async (req, res) => {

    try {

        const Categories = await Favorite.find({});

        json.successResponse(res, Categories, 200);

    } catch (err) {

        return json.errorResponse(res, err);
    }

};

o.update = async (req, res) => {
    
    try {

        const Favorite = await Favorite.findOne({ _id: req.params.id });

        if (!Favorite) {

            return json.errorResponse(res, "Favorite Not Found!", 404);
        }

        let properties = {};
        (req.body.name)         ?  properties["name"]          = req.body.name          : "";
        (req.body.image)        ?  properties["image"]         = req.body.image         : "";

        const updatedFavorite = await Favorite.findOneAndUpdate({_id: req.decoded._id}, { $set: properties}, { upsert: true, new: true })

        json.showOne(res, updatedFavorite);

    } catch (error) {

        return json.errorResponse(res, err);
    }
};

module.exports = o;
