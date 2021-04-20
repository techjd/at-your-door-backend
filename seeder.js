import fs from 'fs';
import mongoose from 'mongoose';
import colors from 'colors';
import connectDB from './config/db.js';
import categories from './data/categories.js';
import Categories from './models/categoriesModel.js';
import subCategories from './data/subCategories.js';
import SubCategories from './models/subCategoriesModel.js';
import products from './data/products.js';
import Products from './models/productsModel.js';
import dotenv from 'dotenv';

// Load Env Variables
dotenv.config();

// Connect to Database
connectDB();

// Import into DB
const importData = async () => {
  try {
    // await Categories.insertMany(categories);
    await SubCategories.insertMany(subCategories);
    // await Products.insertMany(products);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Deleted Data from DB
const deleteData = async () => {
  try {
    // await Categories.deleteMany();
    await SubCategories.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}
