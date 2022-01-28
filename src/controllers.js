const moralis = require("moralis/node");

// Chains supported by the Moralis API
const SUPPORTED_CHAINS = ["eth", "bsc", "matic"];

module.exports.moralisConfig = () => {
  const server_url = process.env.SERVER_URL;
  const app_id = process.env.APP_ID;
  moralis.start({
    serverUrl: server_url,
    appId: app_id,
  });
};

// Controller for /nfts/:ethaddress route
module.exports.fetchNFTS = async (req, res) => {
  try {
    const address = req.params.ethaddress;
    let chain = "eth";
    if (req.query.chain) {
      chain = req.query.chain;
    }
    if (!SUPPORTED_CHAINS.includes(chain)) {
      res.status(400).json({
        success: false,
        message: "Chain not supported, please use a supported chain",
      });
    } else {
      const options = { address: address, chain: chain };
      let nftdata = await moralis.Web3API.account.getNFTs(options);
      nftdata = nftdata["result"];
      const nfts = nftdata.map((item) => {
        let metadata = item["metadata"] || "{}";
        if (metadata === "{}")
          metadata = {
            image: "",
            description: "",
          };
        else {
          metadata = JSON.parse(metadata);
          metadata = {
            image: metadata["image"],
            description: metadata["description"] || "",
          };
        }
        const nft = Object.assign(
          {},
          {
            tokenId: item["token_id"],
            contractAddress: item["token_address"],
            name: item["name"],
            ...metadata,
          }
        );
        return nft;
      });
      res.status(200).json({
        success: true,
        chain:chain,
        count: nfts.length,
        nfts: nfts,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Controller for /tokens/:ethaddress route
module.exports.fetchTokens = async (req, res) => {
  try {
    const address = req.params.ethaddress;
    let chain = "eth";
    if (req.query.chain) {
      chain = req.query.chain;
    }
    if (!SUPPORTED_CHAINS.includes(chain))
      res.status(400).json({
        success: false,
        message: "Chain not supported, please use a supported chain",
      });
    else {
      const options = { address: address, chain: chain };
      let tokendata = await moralis.Web3API.account.getTokenBalances(options);
      const tokens = tokendata.map((item) => {
        return Object.assign(
          {},
          {
            contractAddress: item["token_address"],
            name: item["name"] || "",
            logo: item["logo"] || "",
            balance: item["balance"],
            symbol: item["symbol"],
          }
        );
      });

      res.status(200).json({
        success: true,
        chain:chain,
        count: tokens.length,
        tokens: tokens,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
