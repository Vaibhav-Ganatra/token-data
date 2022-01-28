const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv');
const controllers = require('./controllers');
dotenv.config();

// Initializing Server
const app = express();
app.use(logger('dev'));

// Adding routes
app.get('/nfts/:ethaddress',controllers.fetchNFTS);
app.get('/tokens/:ethaddress',controllers.fetchTokens);

//Configurint Moralis
controllers.moralisConfig();

// Server listening on PORT:3000
app.listen(process.env.PORT||3000,(error) => {
    if(error) console.log("Error in starting server:"+error);
    else console.log("Server running on port:"+process.env.PORT||3000);
})

