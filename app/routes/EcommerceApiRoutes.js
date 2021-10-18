const ProductCategoryController = require("../controllers/ProductCategoryController");
const ProductController = require("../controllers/ProductController");
const SubCatController = require("../controllers/ProductSubCatController");
const PublisherController = require("../controllers/PublisherController");
const WishlistController = require("../controllers/WishlistController");
const CartController = require("../controllers/CartController");
module.exports = (app, express) => {
  const router = express.Router();
  const Globals = require("../../configs/globals");

  //   category routes

  router.post("/add_category", (req, res) => {
    const catObj = new ProductCategoryController().boot(req, res);
    return catObj.AddCat();
  });

  router.post("/get_category", (req, res) => {
    const catObj = new ProductCategoryController().boot(req, res);
    return catObj.GetCat();
  });

  router.post("/update_category", (req, res) => {
    const catObj = new ProductCategoryController().boot(req, res);
    return catObj.UpdateCat();
  });

  //   subcategory routes

  router.post("/add_subcategory", (req, res) => {
    const subcatObj = new SubCatController().boot(req, res);
    return subcatObj.AddSubCat();
  });

  router.post("/get_subcategory", (req, res) => {
    const subcatObj = new SubCatController().boot(req, res);
    return subcatObj.GetSubCat();
  });

  router.post("/update_subcategory", (req, res) => {
    const subcatObj = new SubCatController().boot(req, res);
    return subcatObj.UpdateSubCat();
  });

  //   publisher routes

  router.post("/add_publisher", (req, res) => {
    const publisherObj = new PublisherController().boot(req, res);
    return publisherObj.AddPublisher();
  });

  router.post("/get_publisher", (req, res) => {
    const publisherObj = new PublisherController().boot(req, res);
    return publisherObj.GetPublisher();
  });

  router.post("/update_publisher", (req, res) => {
    const publisherObj = new PublisherController().boot(req, res);
    return publisherObj.UpdatePublisher();
  });

  //    Product routes

  router.post("/add_product", (req, res) => {
    const proObj = new ProductController().boot(req, res);
    return proObj.AddProduct();
  });

  router.post("/get_product", (req, res) => {
    const proObj = new ProductController().boot(req, res);
    return proObj.GetProduct();
  });

  router.post("/update_product", (req, res) => {
    const proObj = new ProductController().boot(req, res);
    return proObj.UpdateProduct();
  });

  //    wishlist routes

  router.post("/add_wishlist", (req, res) => {
    const wishObj = new WishlistController().boot(req, res);
    return wishObj.AddWishlist();
  });

  router.post("/get_wishlist", (req, res) => {
    const wishObj = new WishlistController().boot(req, res);
    return wishObj.GetWishlist();
  });

  router.post("/update_wishlist", (req, res) => {
    const wishObj = new WishlistController().boot(req, res);
    return wishObj.UpdateWishlist();
  });

  //    cart routes

  router.post("/add_cart", (req, res) => {
    const cartObj = new CartController().boot(req, res);
    return cartObj.AddCart();
  });

  router.post("/get_cart", (req, res) => {
    const cartObj = new CartController().boot(req, res);
    return cartObj.GetCart();
  });

  router.post("/update_wishlist", (req, res) => {
    const wishObj = new WishlistController().boot(req, res);
    return wishObj.UpdateWishlist();
  });

  app.use(config.baseApiUrl, router);
};
