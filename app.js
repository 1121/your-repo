const express = require('express');
const mongoose = require('mongoose');
//const { ethers } = require('ethers'); // Correctly import ethers
const { ethers } = require('ethers');
const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/48ed2cfd2eaa40dc96cc87ed1962720a');

const dotenv = require('dotenv');
//const decimals = 6; // USDT usually has 6 decimals
const decimals = 6;
//const decimals = await usdtContract.decimals();
console.log('Decimals:', decimals);

console.log('Decimals:', decimals); // ✅ now works
//const provider = new ethers.JsonRpcProvider('<https://mainnet.infura.io/v3/48ed2cfd2eaa40dc96cc87ed1962720a>');


const usdtAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7';  // USDT contract address
//const usdtAbi = [
  // ABI fragment to interact with balanceOf method
 // "function balanceOf(address owner) view returns (uint256)"
//];

//console.log("Sender address:", wallet.address);


const usdtAbi = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address recipient, uint256 amount) returns (bool)",
  "function decimals() view returns (uint8)"
];


// Initialize the contract
const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, provider);

//const amount = ethers.utils.parseUnits("1", 6); // ✅
const amount = ethers.utils.parseUnits("1", decimals); // GOOD ✅

console.log("Amount:", amount.toString());
console.log("Parsed amount:", amount.toString());
console.log(usdtContract);

dotenv.config();


console.log("MongoDB URI:", process.env.MONGODB_URI);
console.log("Private Key:", process.env.PRIVATE_KEY ? "Loaded" : "Not Loaded");
console.log("Infura URL:", process.env.INFURA_URL ? "Loaded" : "Not Loaded");


const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.log('❌ Error connecting to MongoDB:', err));




// Initialize the provider here
//const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL); // Make sure INFURA_URL is set in your .env
//const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);

// Wallet Initialization
//const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

//const amount = ethers.utils.parseUnits("1", 6);  // "1" USDT is equivalent to 1,000,000 units (6 decimals)

// Ensure the amount and decimals are properly passed
//const amount = ethers.utils.parseUnits(amountString, 6); // assuming USDT has 6 decimals

// This will throw an error if 'amount' is undefined or invalid
//const amount = ethers.utils.parseUnits(amount, decimals); 


// Function to send USDT
async function sendUSDT(amount, recipientAddress) {
  try {
    // Convert amount to units (6 decimals for USDT)
    const amountInUnits = ethers.utils.parseUnits(amount, 6);

    // Get the USDT contract address (ERC-20)
    const USDT_ADDRESS = '0xdac17f958d2ee523a2206206994597c13d831ec7'; // USDT contract on Ethereum mainnet
    const USDT_ABI = [
      'function transfer(address to, uint amount) public returns (bool)',
      'function balanceOf(address owner) public view returns (uint256)',
    ];

    // Initialize USDT contract
//    const usdtContract = new ethers.Contract(USDT_ADDRESS, USDT_ABI, wallet);
// Correct order
const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, provider);

    // Ensure the wallet has enough balance
    const balance = await usdtContract.balanceOf(wallet.address);
    console.log('Current Balance:', ethers.utils.formatUnits(balance, 6));
console.log("Sender address:", wallet.address);

    // Send USDT
    console.log(`Sending ${amount} USDT to ${recipientAddress}...`);
//    const tx = await usdtContract.transfer(recipientAddress, amountInUnits);
  
const tx = await usdtContract.transfer(recipientAddress, amount); // GOOD ✅

  console.log('Transaction Hash:', tx.hash);
    
    // Wait for the transaction to be mined
    await tx.wait();
    console.log('✅ Transaction Successful!');
  } catch (error) {
    console.log('❌ Error sending USDT:', error);
  }
}

// Example Usage: Sending USDT
app.post('/send-usdt', async (req, res) => {
  const { amount, recipient } = req.body;
  try {
    await sendUSDT(amount, recipient);
    res.send('Transaction Successful');
  } catch (error) {
    res.status(500).send('Error sending USDT');
  }
});

// Start Server
//app.listen(3000, () => {
  //console.log('🚀 Server running at http://localhost:3000');
//});


//const PORT = 3001; // or even 3100
//app.listen(PORT, () => {
  //console.log(`🚀 Server running at http://localhost:${PORT}`);
//});


console.log('Amount:', amount);
console.log('Decimals:', decimals);
//const parsedAmount = ethers.utils.parseUnits(amount, decimals);
//const amount = ethers.utils.parseUnits("1", 6);
//const tx = await usdtContract.transfer(recipientAddress, amount);
//async function main() {
    //const tx = await usdtContract.transfer(recipientAddress, amount);
  //  console.log("Transaction hash:", tx.hash);
//}
main().catch(console.error);



//const { ethers } = require('ethers');
//require('dotenv').config();




//const { ethers } = require('ethers');
//require('dotenv').config();


//const { ethers } = require('ethers');
//require('dotenv').config();

// Start Server
//app.listen(3000, () => {
 // console.log('🚀 Server running at http://localhost:3000');
//});

// Asynchronous logic wrapped inside the main function


//const { ethers } = require('ethers');
//require('dotenv').config();

// Start Server
//app.listen(3000, () => {
  //console.log('🚀 Server running at http://localhost:3000');
//});

// Asynchronous logic wrapped inside the main function

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// ✅ Configs
const INFURA_URL = process.env.INFURA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const MONGODB_URI = process.env.MONGODB_URI;
const RECIPIENT = process.env.RECIPIENT_ADDRESS || "0xYourRecipientAddress"; // Replace this!

console.log("MongoDB URI:", MONGODB_URI);
console.log("Private Key: Loaded");
console.log("Infura URL: Loaded");

// ✅ Setup provider & signer
//const provider = new ethers.providers.JsonRpcProvider(INFURA_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// ✅ USDT Contract ABI & address (change if needed)
//const usdtAbi = [
  "function decimals() view returns (uint8)",
  "function transfer(address to, uint amount) returns (bool)"
//];
//const usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; // Mainnet USDT

//const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, wallet);
  //const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, wallet);

async function main() {
  // Define the recipient address and contract details
 const decimals = await usdtContract.decimals(); // ✅ define it early
  console.log("Decimals:", decimals);

const amount = "1000000";  // Amount you want to send
    const parsedAmount = ethers.utils.parseUnits(amount, decimals); // Correctly parse the amount
    console.log("Parsed amount:", parsedAmount.toString());

    // Check sender balance before sending the transaction
    const balance = await usdtContract.balanceOf(wallet.address);
    console.log("Sender balance:", balance.toString());
    if (balance.lt(parsedAmount)) {
      console.log("❌ Insufficient funds");
      return;
  const recipientAddress = '0x518f42d2C507ffe2a0CD6D99605074a99b6052b8'; // Replace with actual recipient address
  const usdtAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7'; // USDT Contract Address
   const parsedAmount = ethers.utils.parseUnits("1", decimals);

  // Create a provider and wallet using Infura and your private key
  const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  // Define the USDT contract ABI
  const usdtAbi = [
    'function transfer(address to, uint256 value) public returns (bool)',
    'function decimals() view returns (uint8)',
  ];

  // Connect to the USDT contract
//  const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, wallet);

  // Fetch the decimals (USDT typically has 6 decimals)
//  const decimals = await usdtContract.decimals();
  console.log("Decimals:", decimals);

  // Define the amount to transfer (e.g., 1 USDT)
  const amount = "1000";  // 1 USDT (as string)

  // Convert the amount to the smallest unit using the correct number of decimals
//  const parsedAmount = ethers.utils.parseUnits(amount, decimals);
  console.log('Parsed Amount:', parsedAmount.toString());

  // Send the transfer transaction
  const tx = await usdtContract.transfer(recipientAddress, parsedAmount);
  console.log("✅ Transaction sent! Hash:", tx.hash);
}

// Make sure to call the main function to execute the async logic
//main().catch(console.error);

}




// Make sure to call the main function to execute the async logic
//main().catch(console.error);





// Call the async function
main().catch((err) => {
    console.error("❌ Error:", err);
console.log("Sender address:", wallet.address);

});


