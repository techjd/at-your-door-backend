import asyncHandler from '../middleware/async.js';
import Products from '../models/productsModel.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc GET ALL PRODUCTS OF DB
// @route GET /api/products
// @access Public
const getAllProductsOfDB = asyncHandler(async (req, res) => {
  const allProducts = await Products.find({}).populate('shopId');

  res.status(200).json(allProducts);
});

// @desc GET ALL PRODUCTS OF SHOP
// @route GET /api/products/:shopId
// @access Public
const getAllProducts = asyncHandler(async (req, res) => {
  const shopProducts = await Products.find({ shopId: req.params.id });

  res.status(200).json(shopProducts);
});

// @desc SEARCH FOR A SPECIFIC PRODUCT NAME
// @route GET /api/products/search/:shopId/:query
// @access Public
const getAllProductsBySearch = asyncHandler(async (req, res) => {
  const shopId = req.params.shopId;
  const query = req.params.query;

  console.log(query);

  function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

  // const QueryString = '/' + `${query}` + '/i';
  const finalString = new RegExp(escapeRegex(query), 'gi');
  // console.log(QueryString);
  const getShopProductsByShop = await Products.find({
    productName: finalString,
  });
  console.log(getShopProductsByShop);
  res.status(200).json(getShopProductsByShop);
});

// @desc GET PRODUCTS BY SUBCATEGORYWISE
// @route GET /api/products/subCategory/:subCategoryId
// @access Public
const getProductsBySubCategories = asyncHandler(async (req, res) => {
  const getProducts = await Products.find({
    subCategoryId: req.params.subCategoryId,
  }).populate('shopId');

  res.status(200).json(getProducts);
});

// @TODO - Test This Query on Large Dataset
// @desc GET PRODUCTS BY SUBCATEGORYWISE OF SPECIFIC SHOPS
// @route GET /api/products/subCategory/:subCategoryId
// @access Public
const getOnlyShopSubCategoryProducts = asyncHandler(async (req, res) => {
  const products = await Products.find({
    shopId: req.params.shopId,
    subCategoryId: req.params.subCategoryId,
  });

  res.status(200).json(products);
});

// @desc GET A SINGLE PRODUCT
// @route GET /api/get/a/single/product/:productId
// @access Public
const getASingleProduct = asyncHandler(async (req, res) => {
  const singleProduct = await Products.findById(req.params.productId);

  res.status(200).json(singleProduct);
});
export {
  getAllProducts,
  getProductsBySubCategories,
  getOnlyShopSubCategoryProducts,
  getAllProductsBySearch,
  getASingleProduct,
  getAllProductsOfDB,
};
