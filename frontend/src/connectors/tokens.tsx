import Web3 from "web3";

// examples
// provider = "https://kovan.infura.io/v3/0db1e82f224a4fa5b282f92a37e96988"
// tokenAddress = "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD";
// walletAddress = "0xdf4DedE67d9A086ad7EDeC69886101bE8D2CEa35";
export async function getBalance(provider : string, tokenAddress : string, walletAddress : string) {
  const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));

  // The minimum ABI required to get the ERC20 Token balance
  const minABI : any = [
    {// balanceOf
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "balance", type: "uint256" }],
      type: "function",
    },
  ];
  const contract = new Web3Client.eth.Contract(minABI, tokenAddress);
  const result = await contract.methods.balanceOf(walletAddress).call(); // 29803630997051883414242659
  
  const format = Web3Client.utils.fromWei(result); // 29803630.997051883414242659
  return format;
}
  