import mongoose from 'mongoose';

const adminSchema = mongoose.Schema({
  ownerName: {
    type: String,
    required: true,
  },
  ownerNumber: {
    type: String,
    required: true,
  },
  ownerPassword: {
    type: String,
    required: true,
  },
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'shops',
  },
});

const Admin = mongoose.model('admin', adminSchema);
export default Admin;
