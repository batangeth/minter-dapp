const fetch = require('node-fetch')

const AUTH = process.env.NFTPORT_API_KEY;
const include = "merkle_proofs";

const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

exports.handler = async (event, context) => {
  const wallet = event.queryStringParameters && event.queryStringParameters.wallet
  const chain = event.queryStringParameters && event.queryStringParameters.chain
  const contract_address = event.queryStringParameters && event.queryStringParameters.contract
  const url = 'https://api.nftport.xyz/v0/me/contracts/collections?';

  let whitelistAddresses = [
    "0xdD870fA1b7C4700F2BD7f44238821C26f7392148",
    "0x583031D1113aD414F02576BD6afaBfb302140225",
    "0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB",
    "0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C",
    "0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c",
    "0x17Ca3D67b7AD32a3c83bAd88b509AE3D8C8371c4",
    "0xb4a9391C658bc1d5a4fd7928c5306d16046141f8"
  ];

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: AUTH
    }
  };
  const query = new URLSearchParams({
    chain: chain,
    include
  });
  
  const data = await fetch(url + query, options)
  const json = await data.json();
  const contractInfo = json.contracts.filter(contract => contract.address.toLowerCase() === contract_address.toLowerCase());
  const merkleProofs = contractInfo[0].merkle_proofs || {};
  const merkleProof = merkleProofs[wallet.toLowerCase()] || [];


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
    'body': JSON.stringify(merkleProof)
  }
}
