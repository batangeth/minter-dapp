require('dotenv').config();
const basePath = process.cwd();
const fs = require("fs");
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "";
const description = 'Batang ETH, also known as BETH, is a project initiated to showcase Filipino culture through the art of NFT. The project`s name was derived from the Filipino word "bata," which means "kid," and ETH from the short form of Ethereum — a decentralized, open-source blockchain with smart contract functionality. Its first collection supply consists of 5000 generative Batang ETH NFT that are drawn by the inspiration of the great artwork of Azuki. Moreover, the project aims to give children with cancer in the Philippines the help, hope, and heart to live.';

const baseUri = "ipfs://NewUriToReplace"; // This will be replaced automatically

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    growEditionSizeTo: 1,
    layersOrder: [
      { name: "beth female Binibini/background" },
      { name: "beth female Binibini/type" },
      { name: "beth female Binibini/clothing" },
      { name: "beth female Binibini/hair" },
      { name: "beth female Binibini/ear" },
      { name: "beth female Binibini/headgear" },
      { name: "beth female Binibini/mouth" },
      { name: "beth female Binibini/eye" },
      { name: "beth female Binibini/offhand" },
    ],
  },
  {
    growEditionSizeTo: 2,
    layersOrder: [
      { name: "beth female Black binibini/background" },
      { name: "beth female Black binibini/type" },
      { name: "beth female Black binibini/clothing" },
      { name: "beth female Black binibini/hair" },
      { name: "beth female Black binibini/ear" },
      { name: "beth female Black binibini/headgear" },
      { name: "beth female Black binibini/mouth" },
      { name: "beth female Black binibini/eye" },
      { name: "beth female Black binibini/offhand" },
    ],
  },
  {
    growEditionSizeTo: 3,
    layersOrder: [
      { name: "beth female Gintong binibini/background" },
      { name: "beth female Gintong binibini/type" },
      { name: "beth female Gintong binibini/clothing" },
      { name: "beth female Gintong binibini/hair" },
      { name: "beth female Gintong binibini/ear" },
      { name: "beth female Gintong binibini/headgear" },
      { name: "beth female Gintong binibini/mouth" },
      { name: "beth female Gintong binibini/eye" },
      { name: "beth female Gintong binibini/offhand" },
    ],
  },
  {
    growEditionSizeTo: 4,
    layersOrder: [
      { name: "beth male pinas hoodie/background" },
      { name: "beth male pinas hoodie/type" },
      { name: "beth male pinas hoodie/face" },
      { name: "beth male pinas hoodie/eye" },
      { name: "beth male pinas hoodie/clothing" },
      { name: "beth male pinas hoodie/mouth" },
      { name: "beth male pinas hoodie/hair" },
    ],
  },
  {
    growEditionSizeTo: 5,
    layersOrder: [
      { name: "Elemento Alab/background" },
      { name: "Elemento Alab/offhand" },
      { name: "Elemento Alab/type" },
      { name: "Elemento Alab/eye" },
      { name: "Elemento Alab/hair" },
      { name: "Elemento Alab/clothing" },
      { name: "Elemento Alab/mouth" },
      { name: "Elemento Alab/special" },
    ],
  },
  {
    growEditionSizeTo: 6,
    layersOrder: [
      { name: "Elemento Amihan/background" },
      { name: "Elemento Amihan/offhand" },
      { name: "Elemento Amihan/type" },
      { name: "Elemento Amihan/eye" },
      { name: "Elemento Amihan/hair" },
      { name: "Elemento Amihan/clothing" },
      { name: "Elemento Amihan/mouth" },
      { name: "Elemento Amihan/special" },
    ],
  },
  {
    growEditionSizeTo: 7,
    layersOrder: [
      { name: "Elemento Bulkan/background" },
      { name: "Elemento Bulkan/offhand" },
      { name: "Elemento Bulkan/type" },
      { name: "Elemento Bulkan/eye" },
      { name: "Elemento Bulkan/hair" },
      { name: "Elemento Bulkan/clothing" },
      { name: "Elemento Bulkan/mouth" },
      { name: "Elemento Bulkan/special" },
    ],
  },
  {
    growEditionSizeTo: 8,
    layersOrder: [
      { name: "Elemento Delta/background" },
      { name: "Elemento Delta/offhand" },
      { name: "Elemento Delta/type" },
      { name: "Elemento Delta/eye" },
      { name: "Elemento Delta/hair" },
      { name: "Elemento Delta/clothing" },
      { name: "Elemento Delta/mouth" },
      { name: "Elemento Delta/special" },
    ],
  },
  {
    growEditionSizeTo: 9,
    layersOrder: [
      { name: "Elemento Dilim/background" },
      { name: "Elemento Dilim/aura" },
      { name: "Elemento Dilim/offhand" },
      { name: "Elemento Dilim/type" },
      { name: "Elemento Dilim/eye" },
      { name: "Elemento Dilim/hair" },
      { name: "Elemento Dilim/clothing" },
      { name: "Elemento Dilim/mouth" },
      { name: "Elemento Dilim/headgear" },
    ],
  },
  {
    growEditionSizeTo: 10,
    layersOrder: [
      { name: "Elemento Liwanag/background" },
      { name: "Elemento Liwanag/offhand" },
      { name: "Elemento Liwanag/type" },
      { name: "Elemento Liwanag/eye" },
      { name: "Elemento Liwanag/hair" },
      { name: "Elemento Liwanag/clothing" },
      { name: "Elemento Liwanag/mouth" },
      { name: "Elemento Liwanag/headgear" },
      { name: "Elemento Liwanag/special" },
    ],
  },
  {
    growEditionSizeTo: 11,
    layersOrder: [
      { name: "beth male model salakot/background" },
      { name: "beth male model salakot/type" },
      { name: "beth male model salakot/clothing" },
      { name: "beth male model salakot/eye" },
      { name: "beth male model salakot/mouth" },
      { name: "beth male model salakot/hair" },
      { name: "beth male model salakot/headgear" },
    ],
  },
  {
    growEditionSizeTo: 12,
    layersOrder: [
      { name: "genesis 1/background" },
      { name: "genesis 1/type" },
      { name: "genesis 1/eye" },
      { name: "genesis 1/hair" },
      { name: "genesis 1/clothing" },
      { name: "genesis 1/mouth" },
      { name: "genesis 1/headgear" },
      { name: "genesis 1/face" },
      { name: "genesis 1/special" },
    ],
  },
  {
    growEditionSizeTo: 13,
    layersOrder: [
      { name: "genesis 2/background" },
      { name: "genesis 2/offhand" },
      { name: "genesis 2/type" },
      { name: "genesis 2/eye" },
      { name: "genesis 2/clothing" },
      { name: "genesis 2/ear" },
      { name: "genesis 2/headgear" },
      { name: "genesis 2/hair" },
      { name: "genesis 2/mouth" },
      { name: "genesis 2/special" },
    ],
  },
  {
    growEditionSizeTo: 16,
    layersOrder: [
      { name: "beth male 1 AK/background" },
      { name: "beth male 1 AK/offhand" },
      { name: "beth male 1 AK/type" },
      { name: "beth male 1 AK/eye" },
      { name: "beth male 1 AK/hair" },
      { name: "beth male 1 AK/mouth" },
      { name: "beth male 1 AK/face" },
      { name: "beth male 1 AK/clothing" },
      { name: "beth male 1 AK/ear" },
      { name: "beth male 1 AK/headgear" },
    ],
  },
  {
    growEditionSizeTo: 17,
    layersOrder: [
      { name: "beth male 2 AK/background" },
      { name: "beth male 2 AK/offhand" },
      { name: "beth male 2 AK/type" },
      { name: "beth male 2 AK/eye" },
      { name: "beth male 2 AK/hair" },
      { name: "beth male 2 AK/mouth" },
      { name: "beth male 2 AK/face" },
      { name: "beth male 2 AK/clothing" },
      { name: "beth male 2 AK/ear" },
    ],
  },
  {
    growEditionSizeTo: 18,
    layersOrder: [
      { name: "beth male 3 AK/background" },
      { name: "beth male 3 AK/offhand" },
      { name: "beth male 3 AK/type" },
      { name: "beth male 3 AK/eye" },
      { name: "beth male 3 AK/mouth" },
      { name: "beth male 3 AK/face" },
      { name: "beth male 3 AK/hair" },
      { name: "beth male 3 AK/clothing" },
      { name: "beth male 3 AK/ear" },
    ],
  },
  {
    growEditionSizeTo: 20,
    layersOrder: [
      { name: "beth male astig cap AK/background" },
      { name: "beth male astig cap AK/offhand" },
      { name: "beth male astig cap AK/type" },
      { name: "beth male astig cap AK/eye" },
      { name: "beth male astig cap AK/mouth" },
      { name: "beth male astig cap AK/face" },
      { name: "beth male astig cap AK/clothing" },
      { name: "beth male astig cap AK/ear" },
      { name: "beth male astig cap AK/headgear" },
      { name: "beth male astig cap AK/hair" },
    ],
  },
  {
    growEditionSizeTo: 22,
    layersOrder: [
      { name: "beth male salakot AK/background" },
      { name: "beth male salakot AK/offhand" },
      { name: "beth male salakot AK/type" },
      { name: "beth male salakot AK/eye" },
      { name: "beth male salakot AK/hair" },
      { name: "beth male salakot AK/face" },
      { name: "beth male salakot AK/mouth" },
      { name: "beth male salakot AK/clothing" },
      { name: "beth male salakot AK/ear" },
      { name: "beth male salakot AK/headgear" },
    ],
  },
  {
    growEditionSizeTo: 23,
    layersOrder: [
      { name: "special beth male AK/background" },
      { name: "special beth male AK/offhand" },
      { name: "special beth male AK/type" },
      { name: "special beth male AK/eye" },
      { name: "special beth male AK/hair" },
      { name: "special beth male AK/mouth" },
      { name: "special beth male AK/face" },
      { name: "special beth male AK/clothing" },
      { name: "special beth male AK/ear" },
      { name: "special beth male AK/special" },
    ],
  },
  {
    growEditionSizeTo: 500,
    layersOrder: [
      { name: "beth female 1/background" },
      { name: "beth female 1/offhand" },
      { name: "beth female 1/type" },
      { name: "beth female 1/eye" },
      { name: "beth female 1/face" },
      { name: "beth female 1/mouth" },
      { name: "beth female 1/clothing" },
      { name: "beth female 1/ear" },
      { name: "beth female 1/hair" },
      { name: "beth female 1/headgear" },
    ],
  },
  {
    growEditionSizeTo: 750,
    layersOrder: [
      { name: "beth female 2/background" },
      { name: "beth female 2/offhand" },
      { name: "beth female 2/type" },
      { name: "beth female 2/eye" },
      { name: "beth female 2/hair" },
      { name: "beth female 2/mouth" },
      { name: "beth female 2/face" },
      { name: "beth female 2/clothing" },
      { name: "beth female 2/ear" },
    ],
  },
  {
    growEditionSizeTo: 1250,
    layersOrder: [
      { name: "beth female 3/background" },
      { name: "beth female 3/offhand" },
      { name: "beth female 3/type" },
      { name: "beth female 3/hair" },
      { name: "beth female 3/eye" },
      { name: "beth female 3/face" },
      { name: "beth female 3/mouth" },
      { name: "beth female 3/clothing" },
      { name: "beth female 3/ear" },
    ],
  },
  {
    growEditionSizeTo: 1277,
    layersOrder: [
      { name: "Beth female bantaybata/background" },
      { name: "Beth female bantaybata/type" },
      { name: "Beth female bantaybata/clothing" },
      { name: "Beth female bantaybata/eye" },
      { name: "Beth female bantaybata/face" },
      { name: "Beth female bantaybata/mouth" },
      { name: "Beth female bantaybata/ear" },
      { name: "Beth female bantaybata/hair" },
      { name: "Beth female bantaybata/headgear" },
    ],
  },
  {
    growEditionSizeTo: 1477,
    layersOrder: [
      { name: "beth female buck cap/background" },
      { name: "beth female buck cap/offhand" },
      { name: "beth female buck cap/type" },
      { name: "beth female buck cap/eye" },
      { name: "beth female buck cap/face" },
      { name: "beth female buck cap/mouth" },
      { name: "beth female buck cap/clothing" },
      { name: "beth female buck cap/ear" },
      { name: "beth female buck cap/headgear" },
      { name: "beth female buck cap/hair" },
    ],
  },
  {
    growEditionSizeTo: 1577,
    layersOrder: [
      { name: "beth female hoodie/background" },
      { name: "beth female hoodie/offhand" },
      { name: "beth female hoodie/type" },
      { name: "beth female hoodie/face" },
      { name: "beth female hoodie/eye" },
      { name: "beth female hoodie/clothing" },
      { name: "beth female hoodie/mouth" },
      { name: "beth female hoodie/hair" },
    ],
  },
  {
    growEditionSizeTo: 1597,
    layersOrder: [
      { name: "beth female tanod/background" },
      { name: "beth female tanod/offhand" },
      { name: "beth female tanod/type" },
      { name: "beth female tanod/clothing" },
      { name: "beth female tanod/eye" },
      { name: "beth female tanod/face" },
      { name: "beth female tanod/mouth" },
      { name: "beth female tanod/ear" },
      { name: "beth female tanod/hair" },
      { name: "beth female tanod/headgear" },
    ],
  },
  {
    growEditionSizeTo: 2097,
    layersOrder: [
      { name: "beth male 1/background" },
      { name: "beth male 1/offhand" },
      { name: "beth male 1/type" },
      { name: "beth male 1/eye" },
      { name: "beth male 1/hair" },
      { name: "beth male 1/mouth" },
      { name: "beth male 1/face" },
      { name: "beth male 1/clothing" },
      { name: "beth male 1/ear" },
      { name: "beth male 1/headgear" },
    ],
  },
  {
    growEditionSizeTo: 2347,
    layersOrder: [
      { name: "beth male 2/background" },
      { name: "beth male 2/offhand" },
      { name: "beth male 2/type" },
      { name: "beth male 2/eye" },
      { name: "beth male 2/hair" },
      { name: "beth male 2/mouth" },
      { name: "beth male 2/face" },
      { name: "beth male 2/clothing" },
      { name: "beth male 2/ear" },
    ],
  },
  {
    growEditionSizeTo: 2847,
    layersOrder: [
      { name: "beth male 3/background" },
      { name: "beth male 3/offhand" },
      { name: "beth male 3/type" },
      { name: "beth male 3/eye" },
      { name: "beth male 3/mouth" },
      { name: "beth male 3/face" },
      { name: "beth male 3/hair" },
      { name: "beth male 3/clothing" },
      { name: "beth male 3/ear" },
    ],
  },
  {
    growEditionSizeTo: 3047,
    layersOrder: [
      { name: "beth male astig cap/background" },
      { name: "beth male astig cap/offhand" },
      { name: "beth male astig cap/type" },
      { name: "beth male astig cap/eye" },
      { name: "beth male astig cap/mouth" },
      { name: "beth male astig cap/face" },
      { name: "beth male astig cap/clothing" },
      { name: "beth male astig cap/ear" },
      { name: "beth male astig cap/headgear" },
      { name: "beth male astig cap/hair" },
    ],
  },
  {
    growEditionSizeTo: 3073,
    layersOrder: [
      { name: "beth male bantaybata/background" },
      { name: "beth male bantaybata/offhand" },
      { name: "beth male bantaybata/type" },
      { name: "beth male bantaybata/eye" },
      { name: "beth male bantaybata/headgear" },
      { name: "beth male bantaybata/hair" },
      { name: "beth male bantaybata/face" },
      { name: "beth male bantaybata/mouth" },
      { name: "beth male bantaybata/clothing" },
      { name: "beth male bantaybata/ear" },
    ],
  },
  {
    growEditionSizeTo: 3173,
    layersOrder: [
      { name: "beth male hoodie/background" },
      { name: "beth male hoodie/offhand" },
      { name: "beth male hoodie/type" },
      { name: "beth male hoodie/face" },
      { name: "beth male hoodie/eye" },
      { name: "beth male hoodie/clothing" },
      { name: "beth male hoodie/mouth" },
      { name: "beth male hoodie/hair" },
    ],
  },
  {
    growEditionSizeTo: 3373,
    layersOrder: [
      { name: "beth male salakot/background" },
      { name: "beth male salakot/offhand" },
      { name: "beth male salakot/type" },
      { name: "beth male salakot/eye" },
      { name: "beth male salakot/hair" },
      { name: "beth male salakot/face" },
      { name: "beth male salakot/mouth" },
      { name: "beth male salakot/clothing" },
      { name: "beth male salakot/ear" },
      { name: "beth male salakot/headgear" },
    ],
  },
  {
    growEditionSizeTo: 3393,
    layersOrder: [
      { name: "beth male tanod/background" },
      { name: "beth male tanod/offhand" },
      { name: "beth male tanod/type" },
      { name: "beth male tanod/eye" },
      { name: "beth male tanod/headgear" },
      { name: "beth male tanod/hair" },
      { name: "beth male tanod/face" },
      { name: "beth male tanod/mouth" },
      { name: "beth male tanod/clothing" },
      { name: "beth male tanod/ear" },
    ],
  },
  {
    growEditionSizeTo: 3543,
    layersOrder: [
      { name: "special beth female/background" },
      { name: "special beth female/offhand" },
      { name: "special beth female/type" },
      { name: "special beth female/eye" },
      { name: "special beth female/face" },
      { name: "special beth female/mouth" },
      { name: "special beth female/clothing" },
      { name: "special beth female/ear" },
      { name: "special beth female/hair" },
      { name: "special beth female/special" },
    ],
  },
  {
    growEditionSizeTo: 3693,
    layersOrder: [
      { name: "special beth female hoodie/background" },
      { name: "special beth female hoodie/offhand" },
      { name: "special beth female hoodie/type" },
      { name: "special beth female hoodie/face" },
      { name: "special beth female hoodie/eye" },
      { name: "special beth female hoodie/clothing" },
      { name: "special beth female hoodie/mouth" },
      { name: "special beth female hoodie/hair" },
      { name: "special beth female hoodie/special" },
    ],
  },
  {
    growEditionSizeTo: 3843,
    layersOrder: [
      { name: "special beth male/background" },
      { name: "special beth male/offhand" },
      { name: "special beth male/type" },
      { name: "special beth male/eye" },
      { name: "special beth male/hair" },
      { name: "special beth male/mouth" },
      { name: "special beth male/face" },
      { name: "special beth male/clothing" },
      { name: "special beth male/ear" },
      { name: "special beth male/special" },
    ],
  },
  {
    growEditionSizeTo: 4000,
    layersOrder: [
      { name: "special beth male hoodie/background" },
      { name: "special beth male hoodie/offhand" },
      { name: "special beth male hoodie/type" },
      { name: "special beth male hoodie/face" },
      { name: "special beth male hoodie/eye" },
      { name: "special beth male hoodie/clothing" },
      { name: "special beth male hoodie/mouth" },
      { name: "special beth male hoodie/hair" },
      { name: "special beth male hoodie/special" },
    ],
  },
];

const shuffleLayerConfigurations = true;

const debugLogs = false;

const format = {
  width: 2000,
  height: 2000,
  smoothing: false,
};

const extraMetadata = {
  external_url: "https://www.batangethereum.com/", // Replace with your website or remove this line if you do not have one.
};

// NFTPort Info

// ** REQUIRED **
const AUTH = process.env.NFTPORT_API_KEY; // Set this in the .env file to prevent exposing your API key when pushing to Github
const LIMIT = 2; // Your API key rate limit
const CHAIN = 'rinkeby'; // only rinkeby or polygon

// REQUIRED CONTRACT DETAILS THAT CANNOT BE UPDATED LATER!
const CONTRACT_NAME = 'BATANG ETHEREUM';
const CONTRACT_SYMBOL = 'BETH';
const METADATA_UPDATABLE = true; // set to false if you don't want to allow metadata updates after minting
const OWNER_ADDRESS = '0xb4a9391C658bc1d5a4fd7928c5306d16046141f8';
const TREASURY_ADDRESS = '0xb4a9391C658bc1d5a4fd7928c5306d16046141f8';
const MAX_SUPPLY = 1500; // The maximum number of NFTs that can be minted. CANNOT BE UPDATED!
const MINT_PRICE = 0.001; // Minting price per NFT. Rinkeby = ETH, Polygon = MATIC. CANNOT BE UPDATED!
const TOKENS_PER_MINT = 5; // maximum number of NFTs a user can mint in a single transaction. CANNOT BE UPDATED!

// REQUIRED CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PUBLIC_MINT_START_DATE = "2022-06-27T00:00:00+08:00"; // This is required. Eg: 2022-02-08T11:30:48+00:00

// OPTIONAL CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PRESALE_MINT_START_DATE = ""; // Optional. Eg: 2022-02-08T11:30:48+00:00
const ROYALTY_SHARE = 7500; // Percentage of the token price that goes to the royalty address. 100 bps = 1%
const ROYALTY_ADDRESS = "0xb4a9391C658bc1d5a4fd7928c5306d16046141f8"; // Address that will receive the royalty
const BASE_URI = null; // only update if you want to manually set the base uri
const PREREVEAL_TOKEN_URI = null; // only update if you want to manually set the prereveal token uri
const PRESALE_WHITELISTED_ADDRESSES = ['0xb4a9391C658bc1d5a4fd7928c5306d16046141f8','0x17Ca3D67b7AD32a3c83bAd88b509AE3D8C8371c4']; // only update if you want to manually set the whitelisted addresses

// ** OPTIONAL **
let CONTRACT_ADDRESS = "0x53B0A1501D3383081E1f1D0073C118E8888cE4E9"; // If you want to manually include it

// Generic Metadata is optional if you want to reveal your NFTs
const GENERIC = true; // Set to true if you want to upload generic metas and reveal the real NFTs in the future
const GENERIC_TITLE = 'BATANG ETHEREUM'; // Replace with what you want the generic titles to say if you want it to be different from the contract name.
const GENERIC_DESCRIPTION = "Which BATANG ETHEREUM will you get?"; // Replace with what you want the generic descriptions to say.
const GENERIC_IMAGE = "https://ipfs.io/ipfs/QmRZ6dSyQ2qUHHzPNTGLZH4TPXK4j7PmQyDZ3ps37T1Sj9"; // Replace with your generic image that will display for all NFTs pre-reveal.

// Automatically set contract address if deployed using the deployContract.js script
try {

  const rawContractData = fs.readFileSync(
    `${basePath}/build/contract/_contract.json`
  );
  const contractData = JSON.parse(rawContractData);
  if (contractData.response === "OK" && contractData.error === null) {
    CONTRACT_ADDRESS = contractData.contract_address;
  }
} catch (error) {
  // Do nothing, falling back to manual contract address
}
// END NFTPort Info

const solanaMetadata = {
  /*symbol: "YC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.youtube.com/c/hashlipsnft",
  creators: [
    {
      address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
      share: 100,
    },
  ],*/
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
  AUTH,
  LIMIT,
  CONTRACT_ADDRESS,
  OWNER_ADDRESS,
  TREASURY_ADDRESS,
  CHAIN,
  GENERIC,
  GENERIC_TITLE,
  GENERIC_DESCRIPTION,
  GENERIC_IMAGE,
  CONTRACT_NAME,
  CONTRACT_SYMBOL,
  METADATA_UPDATABLE,
  ROYALTY_SHARE,
  ROYALTY_ADDRESS,
  MAX_SUPPLY,
  MINT_PRICE,
  TOKENS_PER_MINT,
  PRESALE_MINT_START_DATE,
  PUBLIC_MINT_START_DATE,
  BASE_URI,
  PREREVEAL_TOKEN_URI,
  PRESALE_WHITELISTED_ADDRESSES
};
