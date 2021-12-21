const express = require("express");
const router = express.Router();
const axios = require("axios").default;


const {
    IGDB_CLIENT_ID,
    GENRES_ENDPOINT
  } = require("../utils/utils");

router.get("/", (req, res) => {
    console.log(req.tokenInfo);
    return res.status(200).send("Gamepedia API - Genres Router");
  });
  
  router.get("/allGenres", (req, res) => {
    const accessToken = req.tokenInfo.accessToken;

     getAllGenres().then((data) => {
        return res.send(data);
      })
      .catch((error) => {
        return res.status(400).json({
          message: "[Genres] [allGenres] Critical Error",
          error: { ...error },
        });
      });

     async function getAllGenres(){
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
            url: GENRES_ENDPOINT,
            data: bodyText,
            headers: headers,
            validateStatus: false,
          };
    
    
        var response = await axios(options);
  
          if(response.status == 200){
              return response.data
          }else{
            return res.status(response.status).json({
                message: "[Genres] [getAllGenres] Bad Request",
                error: { ...response.data },
              });
          }
  
        }catch(err){
            return res.status(502).json({
                message: "[Genres] [getAllGenres] Server Error",
                error: { ...error },
              });
        }
    }
  });

  



module.exports = router;