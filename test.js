const { ethers } = require("ethers");

const amount = ethers.utils.parseUnits("1", 6);
console.log("Parsed amount:", amount.toString());
