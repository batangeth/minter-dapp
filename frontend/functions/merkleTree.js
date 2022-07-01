const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

exports.handler = async (event, context) => {
  let whitelistAddresses = [
    "0x17Ca3D67b7AD32a3c83bAd88b509AE3D8C8371c4",
    "0xb4a9391C658bc1d5a4fd7928c5306d16046141f8"
  ];

  const wallet = event.queryStringParameters && event.queryStringParameters.wallet
  const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});
  const claimingAddress = keccak256(wallet);
  const hexProof = merkleTree.getHexProof(claimingAddress);

  return {
    'statusCode': 200,
    'headers': {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    },
    'body': JSON.stringify(hexProof)
  }
}
