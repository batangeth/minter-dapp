let accounts;

// METAMASK CONNECTION
window.addEventListener("DOMContentLoaded", async () => {
  const welcomeH1 = document.getElementById("welcomeH1");
  const welcomeH2 = document.getElementById("welcomeH2");
  const welcomeP = document.getElementById("welcomeP");

  welcomeH1.innerText = welcome_h1;
  welcomeH2.innerText = welcome_h2;
  welcomeP.innerHTML = welcome_p;

  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    checkChain();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  }

  if (window.web3) {
    // Check if User is already connected by retrieving the accounts
    await window.web3.eth.getAccounts().then(async (addr) => {
      accounts = addr;
    });
  }
  
  /*
  const splide = new Splide(".splide", {
    type: "loop",
    arrows: false,
    perMove: 3,
    pagination: false,
    autoplay: true,
    direction: 'ttb',
    height: "calc(100vh - 90px)",
    width: '30vw',
    autoHeight: true,
  });
  splide.mount();
  */
 
  updateConnectStatus();
  if (MetaMaskOnboarding.isMetaMaskInstalled()) {
    window.ethereum.on("accountsChanged", (newAccounts) => {
      accounts = newAccounts;
      updateConnectStatus();
    });
  }
});

const updateConnectStatus = async () => {
  const onboarding = new MetaMaskOnboarding();
  const onboardButton = document.getElementById("connectWallet");
  const notConnected = document.querySelector('.not-connected');
  const spinner = document.getElementById("spinner");
  if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
    onboardButton.innerText = "Install MetaMask!";
    onboardButton.onclick = () => {
      onboardButton.innerText = "Connecting...";
      onboardButton.disabled = true;
      onboarding.startOnboarding();
      // HIDE SPINNER
      spinner.classList.add('hidden');
      notConnected.classList.remove('hidden');
      notConnected.classList.add('show-not-connected');
    };
  } else if (accounts && accounts.length > 0) {
    onboardButton.innerText = `✔ ...${accounts[0].slice(-4)}`;
    window.address = accounts[0];
    onboardButton.disabled = true;
    onboarding.stopOnboarding();
    notConnected.classList.remove('show-not-connected');
    notConnected.classList.add('hidden');
    // SHOW SPINNER
    spinner.classList.remove('hidden');
    window.contract = new web3.eth.Contract(abi, contractAddress);
    loadInfo();
  } else {
    onboardButton.innerText = "Connect MetaMask!";
    // HIDE SPINNER
    spinner.classList.add('hidden');
    notConnected.classList.remove('hidden');
    notConnected.classList.add('show-not-connected');
    onboardButton.onclick = async () => {
      await window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then(function (accts) {
          onboardButton.innerText = `✔ ...${accts[0].slice(-4)}`;
          notConnected.classList.remove('show-not-connected');
          notConnected.classList.add('hidden');
          // SHOW SPINNER
          spinner.classList.remove('hidden');
          onboardButton.disabled = true;
          window.address = accts[0];
          accounts = accts;
          window.contract = new web3.eth.Contract(abi, contractAddress);
          loadInfo();
        });
    };
  }
};

async function checkChain() {
  let chainId = 0;
  if(chain === 'rinkeby') {
    chainId = 4;
  } else if(chain === 'polygon') {
    chainId = 137;
  } else if(chain === 'ethereum') {
    chainId = 1;
  }
  if (window.ethereum.networkVersion !== chainId) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex(chainId) }],
      });
      updateConnectStatus();
    } catch (err) {
        // This error code indicates that the chain has not been added to MetaMask.
      if (err.code === 4902) {
        try {
          if(chain === 'rinkeby') {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainName: 'Rinkeby Test Network',
                  chainId: web3.utils.toHex(chainId),
                  nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
                  rpcUrls: ['https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
                },
              ],
            });
          } else if(chain === 'polygon') {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainName: 'Polygon Mainnet',
                  chainId: web3.utils.toHex(chainId),
                  nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
                  rpcUrls: ['https://polygon-rpc.com/'],
                },
              ],
            });
          } else if(chain === 'ethereum') {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainName: 'Ethereum Mainnet',
                  chainId: web3.utils.toHex(chainId),
                  nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
                  rpcUrls: ['https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
                },
              ],
            });
          } 
          updateConnectStatus();
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
}

async function loadInfo() {
  // window.info = await window.contract.methods.getInfo().call();
  // const publicMintActive = await contract.methods.mintingActive().call();
  // const presaleMintActive = await contract.methods.presaleActive().call();
  const publicMintActive = await contract.methods.mintingOpen().call();
  const presaleMintActive = await contract.methods.onlyAllowlistMode().call();
  const xSupplyx = await contract.methods.totalSupply().call();
  const mainHeading = document.getElementById("mainHeading");
  const subHeading = document.getElementById("subHeading");
  const mainText = document.getElementById("mainText");
  const actionButton = document.getElementById("actionButton");
  const mintContainer = document.getElementById("mintContainer");
  const mintButton = document.getElementById("mintButton");
  const spinner = document.getElementById("spinner");
  const usingEarlyMintIncentive = await contract.methods.usingEarlyMintIncentive().call();

  const publicMintStart =  await contract.methods.publicDropTime().call();
  const presaleMintStart = await contract.methods.allowlistDropTime().call();

  window.maxBatchSize = await contract.methods.maxBatchSize().call();
  window.pricePerMintRAW = await contract.methods.PRICE().call()

  if (usingEarlyMintIncentive){
    window.pricePerMintRAW = await contract.methods.EARLY_MINT_PRICE().call()
  }

  let publicMintStatus = "";
  let presaleMintStatus = "";
  const timeNow = Math.floor(Date.now() / 1000);


  if (publicMintActive === true && presaleMintActive === false){
    publicMintStatus = true;
    presaleMintStatus = false;

  } else if (publicMintActive === true && presaleMintActive === true) {
    publicMintStatus = false;
    presaleMintStatus = true;
  } else if (publicMintActive === false && presaleMintActive === false){
    publicMintStatus = false;
    presaleMintStatus = false;
  }

  console.log(`publicMintActive: ${publicMintActive}`)
  console.log(`presaleMintActive: ${presaleMintActive}`)

  console.log(`publicMintStatus: ${publicMintStatus}`)
  console.log(`presaleMintStatus: ${presaleMintStatus}`)


  let startTime = "";
  if (presaleMintStatus) {
    startTime = publicMintStart;
    mainHeading.innerText = h1_presale_mint;
    subHeading.innerText = h2_presale_mint;
    
    const preSaleDropTimePassed = timeNow > presaleMintStart;

    if (preSaleDropTimePassed){
      try {
        // CHECK IF WHITELISTED
        const merkleData = await fetch(
          `/.netlify/functions/merkleTree/?wallet=${window.address}`
        );
        const merkleJson = await merkleData.json();
        const whitelistClaimed = await contract.methods.whitelistClaimed(window.address).call();
        const OGClaimed = await contract.methods.OGClaimed(window.address).call();
        const FMClaimed = await contract.methods.freeMintClaimed(window.address).call();
        if(!OGClaimed){
          const whitelisted = await contract.methods.isAllowlisted(window.address, merkleJson).call();
          if(!whitelisted) {
            mainText.innerText = p_presale_mint_not_whitelisted;
            actionButton.innerText = button_presale_mint_not_whitelisted;
          } else {
            mainText.innerText = p_presale_mint_whitelisted;
            actionButton.classList.add('hidden');
            mintButton.innerText = button_presale_mint_whitelisted;
            mintContainer.classList.remove('hidden');
          }
        } else {
          mainText.innerText = p_presale_mint_already_minted;
          actionButton.innerText = button_presale_already_minted;
        }
      } catch(e) {
        console.log(e);
        mainText.innerText = p_presale_mint_already_minted;
        actionButton.innerText = button_presale_already_minted;
      }
      setTotalPrice();
    } else {
      startTime = presaleMintStart;
      mainHeading.innerText = h1_presale_coming_soon;
      subHeading.innerText = h2_presale_coming_soon;
      mainText.innerText = p_presale_coming_soon;
      actionButton.innerText = button_presale_already_minted;
    }
  } else if (publicMintStatus) {
    const publicSaleDropTimePassed = timeNow > publicMintStart;

    if (publicSaleDropTimePassed){
      mainHeading.innerText = h1_public_mint;
      mainText.innerText = p_public_mint;
      actionButton.classList.add('hidden');
      mintButton.innerText = button_public_mint;
      mintContainer.classList.remove('hidden');
      setTotalPrice();
    } else {
      startTime = publicMintStart;
      mainHeading.innerText = h1_presale_coming_soon;
      subHeading.innerText = h2_public_coming_soon;
      mainText.innerText = p_presale_coming_soon;
      actionButton.innerText = button_presale_already_minted;
    }
  } else {
    startTime = presaleMintStart;
    mainHeading.innerText = h1_presale_coming_soon;
    subHeading.innerText = h2_presale_coming_soon;
    mainText.innerText = p_presale_coming_soon;
    actionButton.innerText = button_presale_coming_soon;
  }

  const clockdiv = document.getElementById("countdown");
  clockdiv.setAttribute("data-date", startTime);
  countdown();

  // HIDE SPINNER
  spinner.classList.add('hidden');

  // SHOW CARD
  setTimeout(() => {
    const countdownCard = document.querySelector('.countdown');
    countdownCard.classList.add('show-card');
  }, 1000);

  let priceType = '';
  if(chain === 'rinkeby') {
    priceType = 'ETH';
  } else if (chain === 'polygon') {
    priceType = 'MATIC';
  } else if (chain === 'ethereum') {
    priceType = 'ETH';
  }
  // const price = web3.utils.fromWei(info.deploymentConfig.mintPrice, 'ether');
  let price = web3.utils.fromWei(await contract.methods.PRICE().call(), 'ether');
  if (usingEarlyMintIncentive){
    price = web3.utils.fromWei(await contract.methods.EARLY_MINT_PRICE().call(), 'ether'); 
  }
  const pricePerMint = document.getElementById("pricePerMint");
  const maxPerMint = document.getElementById("maxPerMint");
  const totalSupply = document.getElementById("totalSupply");
  const mintInput = document.getElementById("mintInput");
  const xsupply = document.getElementById("xsupply");

  pricePerMint.innerText = `${price} ${priceType}`;
  // maxPerMint.innerText = `${info.deploymentConfig.tokensPerMint}`;
  maxPerMint.innerText = `${await contract.methods.maxBatchSize().call()}`;
  // totalSupply.innerText = `${info.deploymentConfig.maxSupply}`;
  totalSupply.innerText = `${await contract.methods.collectionSize().call()}`;
  xsupply.innerText = `${xSupplyx}`;
  mintInput.setAttribute("max", await contract.methods.maxBatchSize().call());

  // MINT INPUT
  const mintIncrement = document.getElementById("mintIncrement");
  const mintDecrement = document.getElementById("mintDecrement");
  const setQtyMax = document.getElementById("setQtyMax");
  const min = mintInput.attributes.min.value || false;
  const max = mintInput.attributes.max.value || false;
  mintDecrement.onclick = () => {
    let value = parseInt(mintInput.value) - 1 || 1;
    if(!min || value >= min) {
      mintInput.value = value;
      setTotalPrice()
    }
  };
  mintIncrement.onclick = () => {
    let value = parseInt(mintInput.value) + 1 || 1;
    if(!max || value <= max) {
      mintInput.value = value;
      setTotalPrice()
    }
  };
  setQtyMax.onclick = () => {
    mintInput.value = max;
    setTotalPrice()
  };
  mintInput.onchange = () => {
    setTotalPrice()
  };
  mintInput.onkeyup = async (e) => {
    if (e.keyCode === 13) {
      mint();
    }
  };
  mintButton.onclick = mint;
}

function setTotalPrice() {
  const mintInput = document.getElementById("mintInput");
  const mintInputValue = parseInt(mintInput.value);
  const maxPerMint = document.getElementById("maxPerMint");
  const maxPerMintValue = parseInt(maxPerMint.value);
  const totalPrice = document.getElementById("totalPrice");
  const mintButton = document.getElementById("mintButton");

  // if(mintInputValue < 1 || mintInputValue > info.deploymentConfig.tokensPerMint) {
  if(mintInputValue < 1 || mintInputValue > maxPerMintValue) {
    totalPrice.innerText = 'INVALID QUANTITY';
    mintButton.disabled = true;
    mintInput.disabled = true;
    return;
  }
  // const totalPriceWei = BigInt(info.deploymentConfig.mintPrice) * BigInt(mintInputValue);
  const totalPriceWei = BigInt(pricePerMintRAW) * BigInt(mintInputValue);
  
  let priceType = '';
  if(chain === 'rinkeby') {
    priceType = 'ETH';
  } else if (chain === 'polygon') {
    priceType = 'MATIC';
  } else if (chain === 'ethereum') {
    priceType = 'ETH';
  }
  const price = web3.utils.fromWei(totalPriceWei.toString(), 'ether');
  totalPrice.innerText = `${price} ${priceType}`;
  mintButton.disabled = false;
  mintInput.disabled = false;
}

async function mint() {
  const mintButton = document.getElementById("mintButton");
  mintButton.disabled = true;
  const spinner = '<div class="dot-elastic"></div><span>Waiting for transaction...</span>';
  mintButton.innerHTML = spinner;

  const amount = parseInt(document.getElementById("mintInput").value);
  // const value = BigInt(info.deploymentConfig.mintPrice) * BigInt(amount);
  
  let value = BigInt(await contract.methods.PRICE().call()) * BigInt(amount); 

  // const publicMintActive = await contract.methods.mintingActive().call();
  // const presaleMintActive = await contract.methods.presaleActive().call();

  const publicMintActive = await contract.methods.mintingOpen().call();
  const presaleMintActive = await contract.methods.onlyAllowlistMode().call();
  const usingEarlyMintIncentive = await contract.methods.usingEarlyMintIncentive().call();

  if (usingEarlyMintIncentive){
    value = BigInt(await contract.methods.EARLY_MINT_PRICE().call()) * BigInt(amount);
  }

  let publicMintStatus = "";
  let presaleMintStatus = "";

  if (publicMintActive === true && presaleMintActive === false){
    publicMintStatus = true;
    presaleMintStatus = false;

  } else if (publicMintActive === true && presaleMintActive === true) {
    publicMintStatus = false;
    presaleMintStatus = true;
  }

   if (presaleMintStatus) {
    // PRE-SALE MINTING
    try {
      const merkleData = await fetch(
        `/.netlify/functions/merkleTree/?wallet=${window.address}`
      );
      const merkleJson = await merkleData.json();

      const presaleMintTransaction = await contract.methods
        .mintToMultipleOG(window.address, amount, merkleJson)
        .send({ from: window.address, 
                value: value.toString()
              });

      if(presaleMintTransaction) {
        if(chain === 'polygon') {
          const url = `https://polygonscan.com/tx/${presaleMintTransaction.transactionHash}`;
          const mintedContainer = document.querySelector('.minted-container');
          const countdownContainer = document.querySelector('.countdown');
          const mintedTxnBtn = document.getElementById("mintedTxnBtn");
          mintedTxnBtn.href = url;
          countdownContainer.classList.add('hidden');
          mintedContainer.classList.remove('hidden');
        } else if (chain === 'rinkeby') {
          const url = `https://rinkeby.etherscan.io/tx/${presaleMintTransaction.transactionHash}`;
          const mintedContainer = document.querySelector('.minted-container');
          const countdownContainer = document.querySelector('.countdown');
          const mintedTxnBtn = document.getElementById("mintedTxnBtn");
          mintedTxnBtn.href = url;
          countdownContainer.classList.add('hidden');
          mintedContainer.classList.remove('hidden');
        } else if (chain === 'ethereum') {
          const url = `https://etherscan.io/tx/${presaleMintTransaction.transactionHash}`;
          const mintedContainer = document.querySelector('.minted-container');
          const countdownContainer = document.querySelector('.countdown');
          const mintedTxnBtn = document.getElementById("mintedTxnBtn");
          mintedTxnBtn.href = url;
          countdownContainer.classList.add('hidden');
          mintedContainer.classList.remove('hidden');
        }

        console.log("Minuted successfully!", `Transaction Hash: ${presaleMintTransaction.transactionHash}`);
      } else {
        const mainText = document.getElementById("mainText");
        mainText.innerText = mint_failed;
        mintButton.innerText = button_presale_mint_whitelisted;
        mintButton.disabled = false;

        console.log("Failed to mint!");
      }
    } catch(e) {
      const mainText = document.getElementById("mainText");
      mainText.innerText = mint_failed;
      mintButton.innerText = button_presale_mint_whitelisted;
      mintButton.disabled = false;

      // console.log(e);
    }
  } else if (publicMintStatus) {
    // PUBLIC MINT
    try {
      // const mintTransaction = await contract.methods
      //   .mint(amount)
      //   .send({ from: window.address, value: value.toString() });

      const mintTransaction = await contract.methods
        .mintToMultiple(window.address, amount)
        .send({ from: window.address, value: value.toString() });

      if(mintTransaction) {
        if(chain === 'polygon') {
          const url = `https://polygonscan.com/tx/${mintTransaction.transactionHash}`;
          const mintedContainer = document.querySelector('.minted-container');
          const countdownContainer = document.querySelector('.countdown');
          const mintedTxnBtn = document.getElementById("mintedTxnBtn");
          mintedTxnBtn.href = url;
          countdownContainer.classList.add('hidden');
          mintedContainer.classList.remove('hidden');
        } else if (chain === 'rinkeby') {
          const url = `https://rinkeby.etherscan.io/tx/${mintTransaction.transactionHash}`;
          const mintedContainer = document.querySelector('.minted-container');
          const countdownContainer = document.querySelector('.countdown');
          const mintedTxnBtn = document.getElementById("mintedTxnBtn");
          mintedTxnBtn.href = url;
          countdownContainer.classList.add('hidden');
          mintedContainer.classList.remove('hidden');
        } else if (chain === 'ethereum') {
          const url = `https://etherscan.io/tx/${mintTransaction.transactionHash}`;
          const mintedContainer = document.querySelector('.minted-container');
          const countdownContainer = document.querySelector('.countdown');
          const mintedTxnBtn = document.getElementById("mintedTxnBtn");
          mintedTxnBtn.href = url;
          countdownContainer.classList.add('hidden');
          mintedContainer.classList.remove('hidden');
        }
        console.log("Minuted successfully!", `Transaction Hash: ${mintTransaction.transactionHash}`);
      } else {
        const mainText = document.getElementById("mainText");
        mainText.innerText = mint_failed;
        mintButton.innerText = button_public_mint;
        mintButton.disabled = false;

        console.log("Failed to mint!");
      }
    } catch(e) {
      const mainText = document.getElementById("mainText");
      mainText.innerText = mint_failed;
      mintButton.innerText = button_public_mint;
      mintButton.disabled = false;

      console.log(e);
    }
  }
}
