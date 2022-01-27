const mongoose = require("mongoose");
const ShopSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  name: {
    type: String,
    minlength: 5,
  },
  businessNumber: {
    type: String,
    maxlength: 10,
  },
  ceoName: {
    type: String,
  },
  openningDate: {
    type: String,
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  accountNumber: {
    type: String,
  },
  disabledYn: {
    type: String,
  },
});

const Shop = mongoose.model("Shop", ShopSchema);

module.exports = { Shop, ShopSchema };
