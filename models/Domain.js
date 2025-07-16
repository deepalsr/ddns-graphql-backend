const mongoose = require("mongoose");

const domainSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  owner: { type: String, required: true },
  cid: { type: String, required: true },
  registeredAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Domain", domainSchema);