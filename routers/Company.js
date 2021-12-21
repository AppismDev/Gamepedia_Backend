const express = require("express");
const router = express.Router();
const axios = require("axios").default;

const {
  IGDB_CLIENT_ID,
  COMPANY_ENDPOINT
} = require("../utils/utils");

router.get("/", (req, res) => {
  console.log(req.tokenInfo);
  return res.status(200).send("Gamepedia API - Company Router");
});

router.get("/:id", (req, res) => {
  const accessToken = req.tokenInfo.accessToken;
  const companyId = req.params.id;
  console.log(companyId);

  getGameCover()
    .then((data) => {
      return res.send(data);
    })
    .catch((error) => {
      return res.status(400).json({
        message: `[Company] [${companyId}] Critical Error`,
        error: { ...error },
      });
    });

  async function getGameCover() {
    try {
      let data = [];
      let headers = {
        Accept: "application/json",
        "Client-ID": IGDB_CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "text/plain",
      };

      let bodyText = ` fields *;
                         where 
                            id = (${companyId});`;

      const options = {
        method: "POST",
        url: COMPANY_ENDPOINT,
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
          message: `[Company] [${companyId}] Bad Request`,
          error: { ...response.data },
        });
      }

    } catch (error) {
      return res.status(502).json({
        message: `[Company] [${companyId}] Server Error`,
        error: { ...error },
      });
    }
  }
});

module.exports = router;
