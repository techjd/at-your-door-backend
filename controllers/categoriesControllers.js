import asyncHandler from '../middleware/async.js';
import Categories from '../models/categoriesModel.js';
import Products from '../models/productsModel.js';
import ErrorResponse from '../utils/errorResponse.js';
// @desc Fetch All Categories
// @route GET /api/categories
// @access Public
const getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Categories.find({});
  res.json(categories);
});

// @desc Fetch Category By Id
// @route GET /api/category/:id
// @access Public
const getCategoryById = asyncHandler(async (req, res, next) => {
  let category = await Categories.findById(req.params.id);

  if (!category) {
    return next(
      new ErrorResponse(`No Category Found with the id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json(category);
});

// @desc Fetch Categories Of Shops
// @route GET /api/category/getCategory/:shopId
// @access Public
const getCategoriesOfShops = asyncHandler(async (req, res) => {
  const getDistinctCategories = await Products.distinct('mainCategoryId', {
    shopId: req.params.shopId,
  });

  let start = 0;
  let outputToDisplay = [];
  for (let start = 0; start < getDistinctCategories.length; start++) {
    const element = getDistinctCategories[start];
    console.log(element);

    const getAllDetails = await Categories.findById(element);
    outputToDisplay.push(getAllDetails);
  }
  console.log(outputToDisplay);
  // res.status(200).json({ getDistinctCategories });
  res.status(200).json(outputToDisplay);
});
export { getCategories, getCategoryById, getCategoriesOfShops };
