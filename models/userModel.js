import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    number: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    credit: {
      type: Number,
      default: 5000,
    },
    primaryAddress: {
      address: { type: String, required: true, default: 'no' },
      city: { type: String, required: true, default: 'no' },
      postalCode: { type: String, required: true, default: 'no' },
      state: { type: String, required: true, default: 'no' },
    },
    secondaryAddress: {
      address: { type: String, required: true, default: 'no' },
      city: { type: String, required: true, default: 'no' },
      postalCode: { type: String, required: true, default: 'no' },
      state: { type: String, required: true, default: 'no' },
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model('Users', userSchema);
export default Users;
