const express = require("express");
const router = express.Router();
const axios = require("axios").default;

const {
  IGDB_CLIENT_ID,
  PLATFORMS_ENDPOINT
} = require("../utils/utils");

router.get("/", (req, res) => {
  console.log(req.tokenInfo);
  return res.status(200).send("Gamepedia API - Platforms Router");
});

router.get("/all",(req,res)=>{
    const accessToken = req.tokenInfo.accessToken;

    getAllPlatforms()
    .then((data) => {
      return res.send(data);
    })
    .catch((error) => {
      return res.status(400).json({
        message: `[Platforms] [All] Critical Error`,
        error: { ...error },
      });
    });

  async function getAllPlatforms() {
    try {
      let data;
      let headers = {
        Accept: "application/json",
        "Client-ID": IGDB_CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "text/plain",
      };

      let bodyText = ` fields 
                        name,
                        platform_logo.image_id;
                        limit 20;
                        
                        where
                            id = (3,6,8,9,11,12,14,34,39,48,49,82,130,167,169,170);`; 

      const options = {
        method: "POST",
        url: PLATFORMS_ENDPOINT,
        data: bodyText,
        headers: headers,
        validateStatus: false,
      };

      let response = await axios(options);

      if ((response.status = 200)) {
        data = [...response.data];
        return data;
      } else {
        return res.status(response.status).json({
          message: `[Platforms] [All] Bad Request`,
          error: { ...response.data },
        });
      }

    } catch (error) {
      return res.status(502).json({
        message: `[Platforms] [All] Server Error`,
        error: { ...error },
      });
    }
  }
});


module.exports = router;