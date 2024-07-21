import fs from "fs";
import * as ethers from "ethers";
// import comp from "./compile.js";

// const config = {
//   name: "moonbase-alpha",
//   rpc: "https://rpc.api.moonbase.moonbeam.network",
//   chainId: 1287, // 0x507 in hex,
// };
const config = {
  name: "moonbeam-dev",
  rpc: "http://127.0.0.1:9944",
  chainId: 1281,
};

export const web3Provider = new ethers.JsonRpcProvider(config.rpc, {
  name: config.name,
  chainId: config.chainId,
});

// Gerald
const geraldWallet = {
  privateKey:
    "0x99b3c12287537e38c90a9219d4cb074a89a16e9cdb20bf85728ebd97c343e342",
};

// 4. Create wallet
let wallet = new ethers.Wallet(geraldWallet.privateKey, web3Provider);

// 5. Load contract information
const bytecode = fs
  .readFileSync("./contracts/BlockPerxNFT.bytecode.txt")
  .toString();
const abi = JSON.parse(
  fs.readFileSync("./contracts/BlockPerxNFT.abi.json").toString()
);
// const bytecode = comp.evm.bytecode.object;
// const abi = comp.abi;

// 6. Create contract instance with signer
const contractDef = new ethers.ContractFactory(abi, bytecode, wallet);

// 7. Create deploy function
const deploy = async () => {
  console.log(`Attempting to deploy from account: ${wallet.address}`);

  // 8. Send tx (initial value set to 5) and wait for receipt
  const contract = await contractDef.deploy(wallet.address);
  const txReceipt = await contract.deploymentTransaction()?.wait();

  console.log(`Contract deployed at address: ${txReceipt?.contractAddress}`);
};

// 9. Call the deploy function
deploy();
