const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

const fxRateSchema = new Schema({
  rates: String,
  end_at: {
    type: Date,
    default: moment().format("YYYY-MM-DD HH:mm:ss")
  },
  start_at: {
    type: Date,
    default: moment().format("YYYY-MM-DD HH:mm:ss")
  },
  lastupdated_date: {
    type: Date,
    default: moment().format("YYYY-MM-DD HH:mm:ss")
  },
  base: String
});

module.exports = mongoose.model("fxRate", fxRateSchema);
