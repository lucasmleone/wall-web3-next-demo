import { defineConfig, configVariable } from "hardhat/config";
import HardhatToolbox from "@nomicfoundation/hardhat-toolbox-mocha-ethers";
import HardhatKeystore from "@nomicfoundation/hardhat-keystore";

export default defineConfig({
  solidity: "0.8.28",
  plugins: [HardhatToolbox, HardhatKeystore],
  networks: {
    amoy: {
      type: "http",
      url: "https://rpc-amoy.polygon.technology",
      chainId: 80002,
      // Esto le dice a Hardhat: "Buscá la clave en la caja fuerte"
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
});