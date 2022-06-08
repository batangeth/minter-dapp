const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

// var Web3 = require('web3');
// var web3 = new Web3('ws://localhost:3000');
// var accounts = web3.eth.accounts;

// var keys = [];
// var amount = 1000;
// var fs = require('fs');

// for(var i = 0; i < amount; i++) {
//     addresses = accounts.create(Web3.utils.randomHex(32))
//     keys.push(addresses.address);

//     fs.writeFileSync("movies.txt",
//         '"' + addresses.address + '"' + "," + "\n",
//         {
//         encoding: "utf8",
//         flag: "a+",
//         mode: 0o666
//         });
// }

// let whitelistAddresses = [
//     "0xb4a9391C658bc1d5a4fd7928c5306d16046141f8",
//     "0x17Ca3D67b7AD32a3c83bAd88b509AE3D8C8371c4"
// ];

let whitelistAddresses = [
    "0xdD870fA1b7C4700F2BD7f44238821C26f7392148",
    "0x583031D1113aD414F02576BD6afaBfb302140225",
    "0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB",
    "0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C",
    "0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c",
    "0x17Ca3D67b7AD32a3c83bAd88b509AE3D8C8371c4",
    "0xb4a9391C658bc1d5a4fd7928c5306d16046141f8"
    ];


const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});

const rootHash = merkleTree.getRoot().toString('hex');
console.log('Whitelist Merkle Tree\n', merkleTree.toString());
console.log('Root Hash: ', rootHash);


// const buf2hex = x => '0x' + x.toString('hex')

// console.log(buf2hex(merkleTree.getRoot()))

// const claimingAddresses = leafNodes[5];
const claimingAddress = keccak256("0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c");
const hexProof = merkleTree.getHexProof(claimingAddress);
console.log(hexProof);

console.log(merkleTree.verify(hexProof, claimingAddress, rootHash));



// 0x4783f0efcbd96a6e7c075fabb3d311d66c54822e8f3c9ec86bb7e29f23a9d04adbc22069
// 0xf70994be2480f035d2834bf5d2bb6b41c8d39456f8195ae19e8240c148f784ad
// new MerkleRoot = 0x9f271daa258ba1b2170c18a3cfa009423045761c3dbe60015b991c886e164a1f