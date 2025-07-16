require('dotenv').config();
const { ethers } = require("ethers");
const Domain = require("./models/Domain");
const abi = require("./abi.json");

// Load environment variables
const RPC_URL = process.env.RPC_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const MONGO_URL = process.env.MONGO_URL;

// Connect to MongoDB
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));


// Connect to Ethereum provider
const provider = new ethers.JsonRpcProvider(RPC_URL);
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

// Event: Domain Registered
contract.on("DomainRegistered", async (name, owner, cid) => {
  console.log("Domain Registered:", name, owner, cid);

  try {
    const domain = new Domain({ name, owner, cid });
    await domain.save();
    console.log("Saved to MongoDB");
  } catch (err) {
    console.error("Error saving domain:", err);
  }
});

// Event: CID Updated
contract.on("CIDUpdated", async (name, newCid) => {
  console.log("CID Updated:", name, newCid);

  try {
    await Domain.findOneAndUpdate({ name }, { cid: newCid });
    console.log("CID updated in MongoDB");
  } catch (err) {
    console.error("Error updating CID:", err);
  }
});

// Event: Domain Transferred
contract.on("DomainTransferred", async (name, newOwner) => {
  console.log("Domain Transferred:", name, newOwner);

  try {
    await Domain.findOneAndUpdate({ name }, { owner: newOwner });
    console.log("Owner updated in MongoDB");
  } catch (err) {
    console.error("Error updating domain owner:", err);
  }
});
