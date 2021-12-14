const express = require("express");
const router = express.Router();
const axios = require("axios").default;


const {
    IGDB_CLIENT_ID,
    SCREENSHOTS_ENDPOINT,
  } = require("../utils/utils");

router.get("/", (req, res) => {
  console.log(req.tokenInfo);
  return res.status(200).send("Gamepedia API - ScreenShots Router");
});



router.get("/:ids", (req, res) => {
  const accessToken = req.tokenInfo.accessToken;
  const screenshotIDs = req.params.ids;
  console.log(screenshotIDs);

  getScreenshots()
    .then((data) => {
      return res.send(data);
    })
    .catch((error) => {
      return res.status(400).json({
        message: `[ScreenShots] [${screenshotIDs}] Critical Error`,
        error: { ...error },
      });
    });

  async function getScreenshots() {
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
                              id = (${screenshotIDs});`;

      const options = {
        method: "POST",
        url: SCREENSHOTS_ENDPOINT,
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
          message: `[ScreenShots] [${screenshotIDs}] Bad Request`,
          error: { ...response.data },
        });
      }
    } catch (error) {
      return res.status(502).json({
        message: `[ScreenShots] [${screenshotIDs}] Server Error`,
        error: { ...error },
      });
    }
  }
});

module.exports = router;
