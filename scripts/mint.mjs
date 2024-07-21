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

const CONTRACT_ADDRESS = "0xBb0CC0fb3e0c06725c67167501f850B4900D6DB5";
// 5. Load contract information
const abi = JSON.parse(
  fs.readFileSync("./contracts/BlockPerxNFT.abi.json").toString()
);

const geraldWallet = {
  privateKey:
    "0x99b3c12287537e38c90a9219d4cb074a89a16e9cdb20bf85728ebd97c343e342",
};
const faithWallet = {
  addr: "0xC0F0f4ab324C46e55D02D0033343B4Be8A55532d",
  privateKey:
    "0xb9d2ea9a615f3165812e8d44de0d24da9bbd164b65c4f0573e1ce2c8dbd9c8df",
};

// 4. Create wallet
const wallet = new ethers.Wallet(geraldWallet.privateKey, web3Provider);

const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

// 7. Create deploy function
const mint = async () => {
  console.log(`Attempting to mint to account: ${faithWallet.addr}`);

  // 8. Send tx (initial value set to 5) and wait for receipt
  const createReceipt = await contract.safeMint(
    faithWallet.addr,
    "1337",
    "https://media.graphassets.com/rUmpz6ZcRw6rS0slQT8O"
  );
  const txReceipt = await createReceipt?.wait();

  console.log("Done", txReceipt);
};

// 9. Call the deploy function
mint();
