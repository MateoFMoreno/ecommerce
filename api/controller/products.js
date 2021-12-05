const ProductsService = require("../services/products");

class ProductsController {
    static async allProducts(req, res) {
        const { error, data } = await ProductsService.allProducts();

        return error ? res.status(data.status || 500).json({ message: data }) : res.json(data);
    }

    static async searchProducts(req, res) {
        const { type, name } = req.query;
        
        const { error, data } = await ProductsService.searchProducts(type, name);

        return error ? res.status(data.status || 500).json({ message: data }) : res.json(data);
    }

    static async getProductById(req, res) {
        const { error, data } = await ProductsService.getProductById(req.params.productId);

        return error ? res.status(data.status || 500).json({ message: data }) : res.json(data);
    }


    static async postReview(req, res) {
        const { error, data } = await ProductsService.postReview(req.params.productId, req.body);

        return error ? res.status(data.status || 500).json({ message: data }) : res.json(data);
    }
}

module.exports = ProductsController;
