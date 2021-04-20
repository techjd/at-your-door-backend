import mongoose from 'mongoose';

const subCategoriesSchema = mongoose.Schema(
  {
    mainCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Categories',
    },
    subCategoryName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SubCategories = mongoose.model('SubCategories', subCategoriesSchema);

export default SubCategories;
