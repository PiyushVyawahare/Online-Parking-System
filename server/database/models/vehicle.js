const mongoose = require("mongoose");

const vechicleSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  vname: {
      type: String,
      required: true,
  },
  vtype: {
    type: String,
    required: true
  },
  vnumber: {
    type: String,
    required: true
  }
},
{ timestamps: true }
);

const vehicleModel = mongoose.model('vehicle', vechicleSchema);

module.exports = vehicleModel;