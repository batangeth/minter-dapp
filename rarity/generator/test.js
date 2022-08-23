const Moralis = require("moralis/node");

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const serverUrl = "https://zxcx8wsmj6zl.usemoralis.com:2053/server"; //Moralis Server Url here
const appId = "Gwc3nrOnTHuZ0sMfEcWeIbAGcwtcHHy6PatOZYzc"; //Moralis Server App ID here

Moralis.start({ serverUrl, appId });

const collectionAddress = "0xa5C4d73C118661C3939CcAe67132207668FEec3f";

async function generateRarity() {
    const NFTs = await Moralis.Web3API.token.getAllTokenIds({
        address: collectionAddress,
        chain: "eth",
    });

    await timer(1000);

    const totalNum = NFTs.total;
    const pageSize = NFTs.page_size;
    console.log(totalNum);
    console.log(pageSize);
    let allNFTs = NFTs.result;

    let cursor = null;
    do {
        const response = await Moralis.Web3API.token.getAllTokenIds({
        address: collectionAddress,
        chain: "eth",
        limit: 100,
        cursor: cursor,
        });
        allNFTs = allNFTs.concat(response.result);
        cursor = response.cursor;
        await timer(1000);
        console.log(cursor)
    } while (cursor != "" && cursor != null);

    console.log(response.result);
}

generateRarity()
.then( ( result ) => { console.log( result ) } )
.catch( ( error ) => { console.log( error ) } )
