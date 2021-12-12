const functions = require("firebase-functions");
const { refreshToken } = require("./schedules/RefreshToken");

const express = require("express");
const bodyParser = require('body-parser');
require("dotenv").config();

const app = express();

app.use(bodyParser.json());





//Auth
const {auth} = require("./functions/Auth");


//Import Routers
const gamesRouter = require("./routers/Games");
const coverRouter = require("./routers/Cover");


// Routers
app.use('/games',auth,gamesRouter);
app.use('/cover',auth,coverRouter);






// Gets
app.get('/token',(req,res)=>{
    const { getAccessToken }  = require("./functions/GetAccessToken");

    getAccessToken().then(token=>{
        return res.status(200).json(token);
    }).catch(err=>{
        return res.status(200).json(err);
    })


});



exports.refreshToken = functions.https.onRequest(refreshToken);
exports.api = functions.https.onRequest(app);


