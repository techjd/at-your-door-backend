import mongoose from 'mongoose';

const shopsModelSchema = mongoose.Schema(
  {
    shopOwnerID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Users',
    },
    shopName: {
      type: String,
      required: true,
    },
    shopImageURL: {
      type: String,
      required: true,
    },
    shopAddress: {
      type: String,
      required: true,
    },
    shopNumber: {
      type: String,
      required: true,
    },
    shopLocation: {
      type: [Number],
      index: '2dsphere',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Shops = mongoose.model('shops', shopsModelSchema);

export default Shops;
