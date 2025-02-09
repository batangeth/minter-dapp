import { useMoralis } from "react-moralis";
import {
  Button,
  Image,
  Card,
  Badge,
  Spin,
  Alert,
  Divider,
  Select,
  Input,
} from "antd";
import { useState } from "react";

import { Modal} from "react-bootstrap";
import React, { Component } from "react";
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

const { Meta } = Card;
const { Option } = Select;
const { Search } = Input;

const styles = {
  NFTs: {
    display: "flex",
    flexWrap: "wrap",
    WebkitBoxPack: "start",
    justifyContent: "flex-start",
    margin: "0px auto 20px",
    maxWidth: "1200px",
    width: "100%",
    gap: "10px",
  },
};

function HomePage() {
  const fallbackImg =
    "data:image/png;base64,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";

  const [token, setToken] = useState();
  const [visibility, setVisibility] = useState(false);
  const [NFTBalances, setNFTBalances] = useState();
  const [collection, setCollection] = useState();
  const [nft, setNft] = useState();
  const { Moralis } = useMoralis();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleChangeCollection = async (col) => {
    const dbNFTs = Moralis.Object.extend(col);
    const query = new Moralis.Query(dbNFTs);
    query.ascending("rank");
    const topNFTs = query.limit(100);
    const results = await topNFTs.find();
    setNFTBalances(results);
  };

  const handleSelectToken = async (num, col) => {
    if (num && col) {
      const dbNFTs = Moralis.Object.extend(col);
      const query = new Moralis.Query(dbNFTs);
      console.log(num);
      query.equalTo("tokenId", num);
      let selectedNFT = await query.first();
      selectedNFT = selectedNFT.attributes;
      console.log(selectedNFT);
      setNft(selectedNFT);
      setVisibility(true);
      handleShow(true);
    }
  };

  const collectionChanged = async (col) => {
    setCollection(col);
    handleSelectToken(token, col);
    handleChangeCollection(col);
  };

  const addToNFTs = async (col) => {
    const dbNFTs = Moralis.Object.extend(col);
    const query = new Moralis.Query(dbNFTs);
    query.ascending("rank");
    query.limit(6);
    const topNFTs = query.skip(NFTBalances.length);
    const results = await topNFTs.find();
    setNFTBalances(NFTBalances.concat(results));
  }
  console.log(NFTBalances)
  return (
    
    <>
      <div>
        <div class="container">
          <div class="row">
            <div class="col">
              <section class="py-5 text-center container">
                <div class="row">
                  <div class="col">
                    <form class="form-inline">
                      <div class="form-group mb-2">
                        <Select
                                showSearch
                                style={{ width: "250px" }}
                                placeholder="Select Collection"
                                onChange={(e) => collectionChanged(e)}
                              >
                          <Option value="BatangEthereum" >Batang Ethereum</Option>
                          <Option value="BATANG_ETH_MINI_NFT" >Batang Mini</Option>
                      </Select>
                      </div>
                      <div class="form-group mb-2">
                        <Search
                                style={{ width: "250px" }}
                                placeholder="Search For Token"
                                onChange={(e) => setToken(e.target.value)}
                                onSearch={() => handleSelectToken(token, collection)}
                                enterButton
                              />
                      </div>
                    </form>
                    <div
                      style={{
                        fontSize: " 18px",
                        fontWeight: "bold",
                        color: "#69c0ff",
                      }}
                    >
                      Collection Ranked By Rarity
                    </div>
                    <div
                      style={{
                        fontSize: " 16px",
                        color: "#bfbfbf",
                      }}
                    >
                      {collection}
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div class="col-12">
              <section class="container">
                {visibility && (
                <>
                  <Modal show={show} onHide={handleClose} size="xl">
                    <Modal.Header closeButton>
                      <Modal.Title>Rank #{nft.rank}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div class="container">
                          <div class="row">
                            <div class="col">
                              <Card
                                  title={`${collection} #${nft.tokenId}`}
                                  bordered={false}
                                >
                                <Image
                                    preview={false}
                                    src={nft.image}
                                    loading="lazy"
                                    placeholder={
                                      <div
                                        style={{
                                          backgroundColor: "rgba(0, 0, 0, 0.2)",
                                          borderRadius: "18px",
                                        }}
                                      >
                                        <Spin
                                          size="small"
                                          style={{
                                            margin: "auto",
                                            padding: "125px 0",
                                            width: "500px",
                                            height: "500px",
                                          }}
                                        />
                                      </div>
                                    }
                                    fallback={fallbackImg}
                                    alt=""
                                  />
                              </Card>
                            </div>
                            <div class="col">
                            <Card
                                title={false}
                                bordered={false}
                              >
                                <div
                                  style={{
                                    backgroundColor: "#91d5ff",
                                    height: "100px",
                                    marginBottom: "10px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: "24px",
                                  }}
                                >
                                  Rarity Score
                                  <div
                                    style={{
                                      backgroundColor: "white",
                                      width: "98%",
                                      margin: "auto",
                                      textAlign: "center",
                                      fontWeight: "bold",
                                      fontSize: "20px",
                                      color: "green",
                                      marginTop: "2px",
                                    }}
                                  >
                                    {nft.rarity.toFixed(1)}
                                  </div>
                                </div>
                                {nft.attributes.map((e) => {
                                  return (
                                    <>
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        <span style={{ color: "gray" }}>{e.trait_type}</span>
                                        <span
                                          style={{ color: "green", paddingRight: "4%" }}
                                        >{`+${e.rarityScore.toFixed(1)}`}</span>
                                      </div>
                                      <Alert
                                        style={{
                                          padding: "2px 2px 2px 12px",
                                          width: "98%",
                                          margin: "0px auto 5px",
                                          fontSize: "14px",
                                        }}
                                        message={e.value ? e.value : "<null>"}
                                        type="info"
                                        action={
                                          <Button
                                            size="small"
                                            style={{
                                              display: "flex",
                                              justifyContent: "end",
                                              width: "60px",
                                            }}
                                          >
                                            {e.trait_type === "TraitCount" ? 
                                            ((8* (10000 / e.rarityScore)).toFixed(0)) :  //Only use this if rarity generator adjusted to 8x traitcount
                                            ((10000 / e.rarityScore).toFixed(0))         //Also must be adjusted for collections with +- 10000 NFTs
                                            }  
                                          </Button>
                                        }
                                      />
                                    </>
                                  );
                                })}
                              </Card>
                            </div>
                          </div>
                        
                        
                      </div>

                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              )}
              <div style={styles.NFTs}>
                {NFTBalances &&
                  NFTBalances.map((nft, index) => {
                    return (
                      <Card
                        onClick={() =>
                          handleSelectToken(nft.attributes.tokenId, collection)
                        }
                        hoverable
                        style={{ width: 190, border: "2px solid #e7eaf3" }}
                        cover={
                          <Image
                            preview={false}
                            src={nft.attributes.image}
                            fallback="data:image/png;base64,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"
                            alt=""
                            style={{ height: "190px" }}
                          />
                        }
                        key={index}
                      >
                        <Meta
                          title={`Rank #${nft.attributes.rank}`}
                          description={`#${nft.attributes.tokenId}`}
                        />
                      </Card>
                    );
                  })}
              </div>
              {NFTBalances && <Button onClick={() => addToNFTs(collection)} type="primary">Load More</Button>}
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
