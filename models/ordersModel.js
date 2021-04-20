import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Users',
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'shops',
    },
    orderMode: {
      type: String,
      required: true,
    },
    orderedItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Products',
        },
        shopId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'shops',
        },
        mainCategoryId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Categories',
        },
        subCategoryId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'SubCategories',
        },
        productImageURL: {
          type: String,
          required: true,
        },
        productName: {
          type: String,
          required: true,
        },
        productPrice: {
          type: String,
          required: true,
        },
        productQuantity: {
          type: Number,
          required: true,
        },
      },
    ],
    shippingAddress: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Orders = mongoose.model('Orders', orderSchema);

export default Orders;
