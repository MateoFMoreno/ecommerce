const Product = require("../models/Products");
const search = require("../utils/searchProducts");

class ProductsService {
    static async allProducts() {
        try {
            const products = await Product.find({ state: true });

            return { error: false, data: products };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async searchProducts(type, name) {
        try {
            const resp = await search[type](name);

            return { error: false, data: resp };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async getProductById(id) {
        try {
            const product = await Product.findById(id).populate("reviews._id");

            return { error: false, data: product };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }

    static async postReview(id, body) {
        try {
            const product = await Product.findOneAndUpdate(
                { _id: id },
                {
                    $push: {
                        reviews: {
                            review: body.review,
                            _id: body._id,
                            ratings: body.raiting,
                        },
                    },
                },
                { new: true }
            );

            return { error: false, data: product };
        } catch (error) {
            return { error: true, data: error.message };
        }
    }
}

module.exports = ProductsService;
