const mongoose = require("mongoose");

const parkingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  plat: {
    type: Number,
    required: true,
  },
  plng: {
    type: Number,
    required: true,
  },
  pname: {
    type: String,
    required: true 
  },
},
{ timestamps: true }
);

const parkingModel = mongoose.model('parking', parkingSchema);

module.exports = parkingModel;