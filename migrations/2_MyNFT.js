const MyNFT = artifacts.require("MyNFT");
const fs = require('fs');
const jsonconfig = JSON.parse(fs.readFileSync('../config.json'));

module.exports = async (deployer) => {
  
  try {
      await deployer.deploy(MyNFT, jsonconfig.maxSupply, jsonconfig.baseUri, jsonconfig.name, jsonconfig.symbol)
  } catch(err) {
        console.log(err);
  }
  
};