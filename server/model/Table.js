const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tableSchema = new Schema({
  ClaimID: {
    type: Number,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Ailment: {
    type: String,
    required: true,
  },
  SLA: {
    type: Number,
    required: true,
  },
  "P-TAT": {
    type: String,
  },
  Stage: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    required: true,
  },
  "Approved Amount": {
    type: Number,
    required: true,
  },
  Hospital: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Table", tableSchema);
