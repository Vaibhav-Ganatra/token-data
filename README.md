# token-data

In order to set the project up locally, 

1. Clone this project on to your system. Open a terminal at the location of the project.
2. Install the dependencies by running `npm install`
3. Before running the server, environment variables need to be configured in a .env file. The .env file should have the following variables:
    1. SERVER_URL : server url of a [Moralis](https://moralis.io/) server 
    2. APP_ID : application id of the same Moralis server
    3. PORT: the port on which you want the server to listen. The default value is 3000. 
4. Now, the server can be started by running `npm start`

Routes available: 
1. /nfts/:ethaddress: API to get NFTs that are on a particular address
2. /tokens/:ethaddress: API to get Tokens that are on a particular address

In each of these routes, an optional query parameter `chain` has been included to fetch the tokens that are present on different blockchains. The chains supported currently (as per the Moralis support) are:
1. Ethereum (eth)
2. Polygon (matic)
3. Binance Smart Chain (bsc)
