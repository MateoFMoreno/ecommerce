const express = require("express");
const router = express.Router();
const ProductsController = require("../controller/products")


router.get('/', ProductsController.allProducts)
router.get('/search', ProductsController.searchProducts)
router.get('/:productId', ProductsController.getProductById)

router.post('/:productId/review', ProductsController.postReview)


module.exports = router
