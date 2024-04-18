"use strict";

const mongoose = require("mongoose");
const Product = mongoose.model("Product");
let config = {};
config.app = require("../../../../config/app");
config.services = require("../../../../config/services");
const json = require("../../../Traits/ApiResponser");

let o = {};

o.create = async (req, res) => {
  try {
    const product = await Product.findOne({ title: req.body.title });

    if (product) {
      return json.errorResponse(res, "Product Already Exist!", 409);
    }
    let newProduct = new Product({
      title: req.body.title,
      image: req.body.image,
      price: req.body.price,
    });

    newProduct = await newProduct.save();
    json.showOne(res, newProduct, 201);
  } catch (err) {
    return json.errorResponse(res, err);
  }
};
o.show = async (req, res) => {
  try {
    const product = await Product.find();

    if (!product) {
      return json.errorResponse(res, "No Product Found", 404);
    }
    json.showOne(res, product, 201);
  } catch (err) {
    return json.errorResponse(res, err);
  }
};
o.getone = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
  };
o.update = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndUpdate(id, req.body);
      if (!product) {
        res.status(404).json({ message: "Product Not Found" });
      }
      const updatedProduct = await Product.findById(id);
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


o.delete = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        res.status(404).json({ message: "Product Not Found" });
      }
  
      res.status(200).json({ message: "Product deleted Successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }











o.login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      $or: [
        { email: req.body.emailOrUsername },
        { username: req.body.emailOrUsername },
      ],
    }).select(
      "_id username email password roles phone address image xp threshold rank"
    );

    if (!user) {
      return json.errorResponse(res, "User Not found", 404);
    }

    const validUser = bcrypt.compareSync(req.body.password, user.password);

    if (!validUser) {
      return json.errorResponse(res, "Wrong password", 401);
    }

    let newUserInfo = user._doc;
    delete newUserInfo.password;

    newUserInfo.token = createToken(user);

    json.showOne(res, newUserInfo);
  } catch (err) {
    return json.errorResponse(res, err);
  }
};

o.me = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.decoded._id });

    json.showOne(res, user);
  } catch (err) {
    return json.errorResponse(res, err);
  }
};

o.edit = async (req, res, next) => {
  try {
    let properties = {};
    req.body.address ? (properties["address"] = req.body.address) : "";
    req.body.phone ? (properties["phone"] = req.body.phone) : "";
    req.body.image ? (properties["image"] = req.body.image) : "";

    if (req.body.username) {
      const user = await User.findOne({ username: req.body.username });
      if (user && user._id != req.decoded._id) {
        // if another user have this username
        console.log(1);
        return json.errorResponse(res, "Username Already Exist!", 409);
      } else if (
        user &&
        user._id == req.decoded._id &&
        user.username != req.body.username
      ) {
        // if you are the user and you updated another username
        properties["username"] = req.body.username;
      } else if (!user) {
        // if user not exists
        properties["username"] = req.body.username;
      }
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.decoded._id },
      { $set: properties },
      { upsert: true, new: true }
    );

    json.showOne(res, updatedUser);
  } catch (err) {
    return json.errorResponse(res, err);
  }
};

module.exports = o;
