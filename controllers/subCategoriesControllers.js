import asynHandler from '../middleware/async.js';
import SubCategories from '../models/subCategoriesModel.js';
import Products from '../models/productsModel.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';

// @desc Fetch All Categories
// @route GET /api/subcategories/:categoryId
// @access Public
const getSubCategoriesById = asynHandler(async (req, res, next) => {
  let subCategory = await SubCategories.find({
    mainCategoryId: req.params.categoryId,
  });

  if (subCategory.length == 0) {
    return next(
      new ErrorResponse(
        `No SubCategory Found with the id of ${req.params.categoryId}`
      ),
      404
    );
  }

  res.status(200).json(subCategory);
});

// @desc Fetch Sub Categories Of Shops
// @route GET /api/subcategories/getSubCategories/:shopId
// @access Public
const getSubCategoriesOfShops = asynHandler(async (req, res) => {
  const getDistinctSubCategories = await Products.distinct('subCategoryId', {
    shopId: req.params.shopId,
  });

  let start = 0;
  let outputToDisplay = [];
  for (let start = 0; start < getDistinctSubCategories.length; start++) {
    const element = getDistinctSubCategories[start];
    console.log(element);

    const getAllDetails = await SubCategories.findById(element);
    outputToDisplay.push(getAllDetails);
  }
  console.log(outputToDisplay);

  res.status(200).json(outputToDisplay);

  // res.status(200).json({ getDistinctSubCategories });
});

// @desc Fetch Sub Categories Of Shops from CategoryID
// @route GET /api/subcategories/getSubCategoriesfromCategoryId/:categoryId/:shopId
// @access Public
const getSubCatgeoryfromCategoryId = asyncHandler(async (req, res) => {
  const mainCategoryId = req.params.categoryId;
  const getSubCategories = await Products.distinct('subCategoryId', {
    shopId: req.params.shopId,
  });

  let start = 0;
  let displayOutput = [];
  for (start; start < getSubCategories.length; start++) {
    const element = getSubCategories[start];

    const getAllDetails = await SubCategories.findById(element);
    console.log(getAllDetails.mainCategoryId);
    // displayOutput.push(getAllDetails);
    if (getAllDetails.mainCategoryId == mainCategoryId) {
      displayOutput.push(getAllDetails);
    }
  }

  res.status(200).json(displayOutput);
});
export {
  getSubCategoriesById,
  getSubCategoriesOfShops,
  getSubCatgeoryfromCategoryId,
};
