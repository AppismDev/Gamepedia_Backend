const express = require("express");
const router = express.Router();
const axios = require("axios").default;


const {
    IGDB_CLIENT_ID,
    GAMEMODES_ENDPOINT
  } = require("../utils/utils");

router.get("/", (req, res) => {
    console.log(req.tokenInfo);
    return res.status(200).send("Gamepedia API - GameModes Router");
  });
  
  router.get("/all", (req, res) => {
    const accessToken = req.tokenInfo.accessToken;

     getAllGameModes().then((data) => {
        return res.send(data);
      })
      .catch((error) => {
        return res.status(400).json({
          message: "[GameModes] [All] Critical Error",
          error: { ...error },
        });
      });

     async function getAllGameModes(){
        try{
          var  bodyText = "fields id, name; limit 50;"
          let headers = {
            Accept: "application/json",
            "Client-ID": IGDB_CLIENT_ID,
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "text/plain",
          };
    
    
          const options = {
            method: "POST",
            url: GAMEMODES_ENDPOINT,
            data: bodyText,
            headers: headers,
            validateStatus: false,
          };
    
    
        var response = await axios(options);
  
          if(response.status == 200){
              return response.data
          }else{
            return res.status(response.status).json({
                message: "[GameModes] [All] Bad Request",
                error: { ...response.data },
              });
          }
  
        }catch(err){
            return res.status(502).json({
                message: "[GameModes] [All] Server Error",
                error: { ...error },
              });
        }
    }
  });

  



module.exports = router;