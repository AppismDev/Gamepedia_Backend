const { rtdb } = require("../admin/admin");
const { IGDB_CLIENT_ID, IGDB_CLIENT_SCRET } = require("../utils/utils");
const axios = require("axios").default;

exports.refreshToken = async (req, res) => {
  refreshToken()
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Error [CRONJOBS - refreshIGDBAccessToken]",
        error: err,
      });
    });

  async function refreshToken() {
    const dbRef = rtdb.ref();
    let dataSnapshot = await dbRef.child("igdb").get();

    let tokenInfo = dataSnapshot.val();
    let last_update_timestamp =
      tokenInfo.last_update_timestamp + tokenInfo.expires_in;

    let lastUpdateTime = new Date(last_update_timestamp * 1000);
    const timeNow = new Date();
    var dif = lastUpdateTime.getTime() - timeNow.getTime();
    var isRefreshing = dif < 100000 ? true : false;

    var newTokenInfo = null;

    if (isRefreshing == true) {
      try {
        var response = await axios.post(
          `https://id.twitch.tv/oauth2/token?client_id=${IGDB_CLIENT_ID}&client_secret=${IGDB_CLIENT_SCRET}&grant_type=client_credentials`,
          null,
          { validateStatus: false }
        );

        if (response.status == 200) {
          newTokenInfo = response.data;

          await dbRef.child("igdb").update({
            access_token: newTokenInfo.access_token,
            expires_in: newTokenInfo.expires_in,
            last_update_timestamp: Math.floor(new Date().getTime() / 1000.0),
            token_type: newTokenInfo.token_type,
          });


        } else {
          console.log("error : => ");
          console.log(response);
          return res
            .status(502)
            .json({
              error: response.status,
              message: "[/rfreshtoken] Fetch Error",
            });
        }
      } catch (error) {
        console.log("error : => ");
        console.log(error);
        return res
          .status(502)
          .json({ error: error, message: "[/rfreshtoken] Server Error" });
      }
    }

    return {
      last_update_timestamp,
      lastUpdateTime,
      timeNow,
      dif,
      isRefreshing,
      newTokenInfo,
    };
  }
};
