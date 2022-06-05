require('dotenv').config();
const basePath = process.cwd();
const fs = require("fs");
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "";
const description = "Batang ETH";
const baseUri = "ipfs://NewUriToReplace"; // This will be replaced automatically

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    growEditionSizeTo: 1,
    layersOrder: [
      { name: "beth male/background" },
      { name: "beth male/type" },
      { name: "beth male/eye" },
      { name: "beth male/mouth" },
    ],
  },
  {
    growEditionSizeTo: 2,
    layersOrder: [
      { name: "Alab/background" },
      { name: "Alab/offhand" },
      { name: "Alab/type" },
      { name: "Alab/eye" },
      { name: "Alab/hair" },
      { name: "Alab/clothing" },
      { name: "Alab/mouth" },
      { name: "Alab/special" },
    ],
  },
  {
    growEditionSizeTo: 3,
    layersOrder: [
      { name: "Amihan/background" },
      { name: "Amihan/offhand" },
      { name: "Amihan/type" },
      { name: "Amihan/eye" },
      { name: "Amihan/hair" },
      { name: "Amihan/clothing" },
      { name: "Amihan/mouth" },
      { name: "Amihan/special" },
    ],
  },
  {
    growEditionSizeTo: 4,
    layersOrder: [
      { name: "Bulkan/background" },
      { name: "Bulkan/offhand" },
      { name: "Bulkan/type" },
      { name: "Bulkan/eye" },
      { name: "Bulkan/hair" },
      { name: "Bulkan/clothing" },
      { name: "Bulkan/mouth" },
      { name: "Bulkan/special" },
    ],
  },
  {
    growEditionSizeTo: 5,
    layersOrder: [
      { name: "Delta/background" },
      { name: "Delta/offhand" },
      { name: "Delta/type" },
      { name: "Delta/eye" },
      { name: "Delta/hair" },
      { name: "Delta/clothing" },
      { name: "Delta/mouth" },
      { name: "Delta/special" },
    ],
  },
  {
    growEditionSizeTo: 6,
    layersOrder: [
      { name: "Dilim/background" },
      { name: "Dilim/aura" },
      { name: "Dilim/offhand" },
      { name: "Dilim/type" },
      { name: "Dilim/eye" },
      { name: "Dilim/hair" },
      { name: "Dilim/clothing" },
      { name: "Dilim/mouth" },
      { name: "Dilim/headgear" },
    ],
  },
  {
    growEditionSizeTo: 7,
    layersOrder: [
      { name: "Liwanag/background" },
      { name: "Liwanag/offhand" },
      { name: "Liwanag/type" },
      { name: "Liwanag/eye" },
      { name: "Liwanag/hair" },
      { name: "Liwanag/clothing" },
      { name: "Liwanag/mouth" },
      { name: "Liwanag/headgear" },
      { name: "Liwanag/special" },
    ],
  },
  {
    growEditionSizeTo: 8,
    layersOrder: [
      { name: "Binibini/background" },
      { name: "Binibini/type" },
      { name: "Binibini/clothing" },
      { name: "Binibini/hair" },
      { name: "Binibini/ear" },
      { name: "Binibini/headgear" },
      { name: "Binibini/mouth" },
      { name: "Binibini/eye" },
      { name: "Binibini/offhand" },
    ],
  },
  {
    growEditionSizeTo: 625,
    layersOrder: [
      { name: "beth male 1/background" },
      { name: "beth male 1/offhand" },
      { name: "beth male 1/type" },
      { name: "beth male 1/eye" },
      { name: "beth male 1/hair" },
      { name: "beth male 1/face" },
      { name: "beth male 1/mouth" },
      { name: "beth male 1/clothing" },
      { name: "beth male 1/ear" },
    ],
  },
  {
    growEditionSizeTo: 1250,
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
    growEditionSizeTo: 1875,
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
    growEditionSizeTo: 2500,
    layersOrder: [
      { name: "beth female 1/background" },
      { name: "beth female 1/type" },
      { name: "beth female 1/eye" },
      { name: "beth female 1/mouth" },
      { name: "beth female 1/clothing" },
      { name: "beth female 1/ear" },
      { name: "beth female 1/hair" },
    ],
  },
  {
    growEditionSizeTo: 3125,
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
    growEditionSizeTo: 3750,
    layersOrder: [
      { name: "beth female 3/background" },
      { name: "beth female 3/offhand" },
      { name: "beth female 3/type" },
      { name: "beth female 3/eye" },
      { name: "beth female 3/hair" },
      { name: "beth female 3/face" },
      { name: "beth female 3/mouth" },
      { name: "beth female 3/clothing" },
      { name: "beth female 3/ear" },
    ],
  },
  {
    growEditionSizeTo: 4375,
    layersOrder: [
      { name: "Beth male salakot/background" },
      { name: "Beth male salakot/offhand" },
      { name: "Beth male salakot/type" },
      { name: "Beth male salakot/eye" },
      { name: "Beth male salakot/hair" },
      { name: "Beth male salakot/mouth" },
      { name: "Beth male salakot/face" },
      { name: "Beth male salakot/clothing" },
      { name: "Beth male salakot/ear" },
      { name: "Beth male salakot/headgear" },
    ],
  },
  {
    growEditionSizeTo: 5000,
    layersOrder: [
      { name: "Beth male tanod/background" },
      { name: "Beth male tanod/offhand" },
      { name: "Beth male tanod/type" },
      { name: "Beth male tanod/eye" },
      { name: "Beth male tanod/headgear" },
      { name: "Beth male tanod/hair" },
      { name: "Beth male tanod/mouth" },
      { name: "Beth male tanod/face" },
      { name: "Beth male tanod/clothing" },
      { name: "Beth male tanod/ear" },
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
  external_url: "", // Replace with your website or remove this line if you do not have one.
};

// NFTPort Info

// ** REQUIRED **
const AUTH = process.env.NFTPORT_API_KEY; // Set this in the .env file to prevent exposing your API key when pushing to Github
const LIMIT = 2; // Your API key rate limit
const CHAIN = 'eth'; // only rinkeby or polygon

// REQUIRED CONTRACT DETAILS THAT CANNOT BE UPDATED LATER!
const CONTRACT_NAME = 'BATANG ETH';
const CONTRACT_SYMBOL = 'BETH';
const METADATA_UPDATABLE = true; // set to false if you don't want to allow metadata updates after minting
const OWNER_ADDRESS = '0xb4a9391C658bc1d5a4fd7928c5306d16046141f8';
const TREASURY_ADDRESS = '0xb4a9391C658bc1d5a4fd7928c5306d16046141f8';
const MAX_SUPPLY = 5000; // The maximum number of NFTs that can be minted. CANNOT BE UPDATED!
const MINT_PRICE = 0.001; // Minting price per NFT. Rinkeby = ETH, Polygon = MATIC. CANNOT BE UPDATED!
const TOKENS_PER_MINT = 10; // maximum number of NFTs a user can mint in a single transaction. CANNOT BE UPDATED!

// REQUIRED CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PUBLIC_MINT_START_DATE = "2022-01-31T00:00:00+08:00"; // This is required. Eg: 2022-02-08T11:30:48+00:00

// OPTIONAL CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PRESALE_MINT_START_DATE = null; // Optional. Eg: 2022-02-08T11:30:48+00:00
const ROYALTY_SHARE = 500; // Percentage of the token price that goes to the royalty address. 100 bps = 1%
const ROYALTY_ADDRESS = "0xb4a9391C658bc1d5a4fd7928c5306d16046141f8"; // Address that will receive the royalty
const BASE_URI = null; // only update if you want to manually set the base uri
const PREREVEAL_TOKEN_URI = null; // only update if you want to manually set the prereveal token uri
const PRESALE_WHITELISTED_ADDRESSES = ['0xb4a9391C658bc1d5a4fd7928c5306d16046141f8','0x17Ca3D67b7AD32a3c83bAd88b509AE3D8C8371c4']; // only update if you want to manually set the whitelisted addresses

// ** OPTIONAL **
let CONTRACT_ADDRESS = "YOUR CONTRACT ADDRESS"; // If you want to manually include it

// Generic Metadata is optional if you want to reveal your NFTs
const GENERIC = true; // Set to true if you want to upload generic metas and reveal the real NFTs in the future
const GENERIC_TITLE = 'BATANG ETH'; // Replace with what you want the generic titles to say if you want it to be different from the contract name.
const GENERIC_DESCRIPTION = "Which BATANG ETH NFT will you get?"; // Replace with what you want the generic descriptions to say.
const GENERIC_IMAGE = "https://ipfs.io/ipfs/bafkreibiv6eygqhi3ujhl3yfsglqafukclsnsygf6g7nqoaqgqm4ghfaaq"; // Replace with your generic image that will display for all NFTs pre-reveal.

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
