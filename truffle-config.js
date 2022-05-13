const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          process.env.PRIVATE_KEY,
          `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_KEY}`
        ),
      network_id: 4,
    },
    matic: {
      provider: () =>
        new HDWalletProvider(
          process.env.PRIVATE_KEY,
          `https://polygon-rpc.com/`
        ),
      network_id: 137,
    },
    mumbai: {
      provider: () =>
        new HDWalletProvider(
          process.env.PRIVATE_KEY,
          `https://matic-mumbai.chainstacklabs.com
          `
        ),
      network_id: 80001,
    },
  },
  compilers: {
    solc: {
      version: "0.8.9",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
  db: {
    enabled: false,
  },
  plugins: ["truffle-plugin-verify"],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY,
    polygonscan: process.env.POLYGONSCAN_API_KEY,
  },
};
