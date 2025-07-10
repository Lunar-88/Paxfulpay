
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  codes: {
    code1: String,
    code2: String,
    code3: String,
    code4: String,
  }
}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema);
