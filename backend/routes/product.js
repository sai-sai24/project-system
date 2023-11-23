const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/auth");

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  getAdminProducts,
  deleteReview,
} = require("../controllers/productController");

// router.get("/products", isAuthenticatedUser, getProducts);


router.post('/admin/product/new', isAuthenticatedUser, upload.array('images', 10), newProduct)
router.get('/products', getProducts)
router.get('/product/:id', getSingleProduct);
router.route('/admin/product/:id', isAuthenticatedUser,).put(upload.array('images', 10), updateProduct).delete(deleteProduct);
router.get('/admin/products', isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);
router.put('/review', isAuthenticatedUser, createProductReview);
router.get('/reviews', isAuthenticatedUser, getProductReviews)
router.delete('/reviews', isAuthenticatedUser, authorizeRoles('admin'), deleteReview)
router.get('/admin/product-sales', productSales);


// router.route("/products").get(getProducts);
// router.route("/product/new").post(newProduct);
// router.route("/product/:id").get(getSingleProduct);
// router.route("/admin/product/:id").put(updateProduct).delete(deleteProduct);
// router.put("/review", isAuthenticatedUser, createProductReview);
// router.get("/reviews", isAuthenticatedUser, getProductReviews);
// router.route("/reviews").delete(isAuthenticatedUser, deleteReview);
// router.get("/admin/products", isAuthenticatedUser, getAdminProducts);
router.post(
  "/admin/product/new",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  upload.array("images", 10),
  newProduct
);
router
  .route("/admin/product/:id")
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    upload.array("images", 10),
    updateProduct
  );

// router.get(
//   "/products",
//   isAuthenticatedUser,
//   authorizeRoles("admin"),
//   getProducts
// );

// router.post(
//   "/admin/product/new",
//   isAuthenticatedUser,
//   authorizeRoles("admin"),
//   newProduct
// );

// router
//   .route("/admin/product/:id")
//   .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
//   .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

module.exports = router;




