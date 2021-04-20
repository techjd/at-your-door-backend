import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import errorHandler from './middleware/error.js';
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();

// Connect To Database
connectDB();

//Route Files
import categories from './routes/categoriesRoutes.js';
import subCategories from './routes/subCategoriesRoutes.js';
import users from './routes/userRoutes.js';
import shops from './routes/shopsRoutes.js';
import products from './routes/productsRoutes.js';
import orders from './routes/ordersRoutes.js';
import admin from './routes/adminRoutes.js';
// const categories = require('./routes/categoriesRoutes');
app.use(errorHandler);
// Mount Routers
app.use('/api/v1/categories', categories);
app.use('/api/v1/subcategories', subCategories);
app.use('/api/v1/user', users);
app.use('/api/v1/shops', shops);
app.use('/api/v1/products', products);
app.use('/api/v1/orders', orders);
app.use('/api/v1/admin', admin);
// Just a Test Route to check
app.get('/', (req, res) => {
  res.json({ msg: 'SERVER IS RUNNING' });
});

app.listen(
  PORT,
  console.log(
    `Server Successfully Running on PORT ${PORT} in ${process.env.NODE_ENV} MODE`
      .yellow
  )
);
