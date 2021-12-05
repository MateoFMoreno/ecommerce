const Product = require("../models/Products");

const searchProducts = {
    category: (name) => Product.find({ category: { $regex: name, $options: "i" } }).populate("reviews._id"),
    city: (name) => Product.find({ "location.city": { $regex: name, $options: "i" } }).populate("reviews._id"),
    province: (name) => Product.find({ "location.provincia": { $regex: name, $options: "i" } }).populate("reviews._id"),
    title: (name) => Product.find({ title: { $regex: name, $options: "i" } }).populate("reviews._id"),
};

module.exports = searchProducts;
