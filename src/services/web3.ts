import ethers from "ethers";

const config = {
  name: "moonbase-alpha",
  rpc: "https://rpc.api.moonbase.moonbeam.network",
  chainId: 1287, // 0x507 in hex,
};

export const web3Provider = new ethers.JsonRpcProvider(config.rpc, {
  name: config.name,
  chainId: config.chainId,
});
