import mongoose from 'mongoose';

const categoriesSchema = mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    categoriesImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Categories = mongoose.model('Categories', categoriesSchema);
export default Categories;
