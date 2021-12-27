const express = require("express");
const router = express.Router();
const axios = require("axios").default;

const {
  IGDB_CLIENT_ID,
  MAX_PAGE_LIMIT,
  COVERS_ENDPOINT,
  GAMES_ENDPOINT,
} = require("../utils/utils");

router.get("/", (req, res) => {
  console.log(req.tokenInfo);
  return res.status(200).send("Gamepedia API - Games Router");
});



router.get("/detail/:id", (req, res) => {
  const accessToken = req.tokenInfo.accessToken;

  const gameId = req.params.id;

  if(gameId === undefined) return res.status(404).json({message: 'Game ID Not Found !'});

  getGameDetails()
    .then((data) => {
      return res.send(data);
    })
    .catch((error) => {
      return res.status(400).json({
        message: "[Games] [getGameDetails] Critical Error",
        error: { ...error },
      });
    });

  async function getGameDetails() {
    try {

      let data;
      let headers = {
        Accept: "application/json",
        "Client-ID": IGDB_CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "text/plain",
      };


      let bodyText = `fields 
                        id,
                        aggregated_rating,
                        aggregated_rating_count,
                        artworks.image_id,
                        category,
                        collection.name,
                        collection.games,
                        cover.image_id,
                        created_at,
                        dlcs.name,
                        expanded_games.name,
                        expansions.name,
                        first_release_date,
                        follows,
                        game_engines.name,
                        game_engines.logo,
                        game_engines.logo.image_id,
                        game_modes.name,
                        genres.name,
                        involved_companies.company.name,
                        platforms.name,
                        platforms.abbreviation,
                        platforms.platform_logo.image_id,
                        player_perspectives.name,
                        rating,
                        rating_count,
                        release_dates.date,
                        screenshots.image_id,
                        similar_games.name,
                        similar_games.cover.image_id,
                        similar_games.total_rating,
                        status,
                        storyline,
                        summary,
                        themes.name,
                        total_rating,
                        total_rating_count,
                        version_title,
                        videos.video_id,
                        websites.url,
                        name,
                        slug,
                        checksum;
            where  
                id = ${gameId} &
                cover.image_id != null &
                name != null &
      `;

      const options = {
        method: "POST",
        url: GAMES_ENDPOINT,
        data: bodyText,
        headers: headers,
        validateStatus: false,
      };

      let response = await axios(options);

      if ((response.status = 200)) {
        data = response.data[0];
        return data;
      } else {
        return res.status(response.status).json({
          message: "[Games] [getGameDetails] Bad Request",
          error: { ...response.data },
        });
      }
    } catch (error) {
      return res.status(502).json({
        message: "[Games] [getGameDetails] Server Error",
        error: { ...error },
      });
    }
  }
});

router.get("/bestOfAllTime", (req, res) => {
  const accessToken = req.tokenInfo.accessToken;

  let page = req.query.page;
  if (page === undefined) page = 1;
  if (page <= 0) page = 1;

  getBestOfAllTime()
    .then((data) => {
      return res.send(data);
    })
    .catch((error) => {
      return res.status(400).json({
        message: "[Games] [bestOfAllTime] Critical Error",
        error: { ...error },
      });
    });

  async function getBestOfAllTime() {
    try {
      let data;
      let headers = {
        Accept: "application/json",
        "Client-ID": IGDB_CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "text/plain",
      };

      let offset = (page - 1) * 10;

      let bodyText = ` fields 
                        id,
                        aggregated_rating,
                        aggregated_rating_count,
                        artworks.image_id,
                        category,
                        collection.name,
                        collection.games,
                        cover.image_id,
                        created_at,
                        dlcs.name,
                        expanded_games.name,
                        expansions.name,
                        first_release_date,
                        follows,
                        game_engines.name,
                        game_engines.logo,
                        game_engines.logo.image_id,
                        game_modes.name,
                        genres.name,
                        involved_companies.company.name,
                        platforms.name,
                        platforms.abbreviation,
                        platforms.platform_logo.image_id,
                        player_perspectives.name,
                        rating,
                        rating_count,
                        release_dates.date,
                        screenshots.image_id,
                        similar_games.name,
                        similar_games.cover.image_id,
                        similar_games.total_rating,
                        status,
                        storyline,
                        summary,
                        themes.name,
                        total_rating,
                        total_rating_count,
                        version_title,
                        videos.video_id,
                        websites.url,
                        name,
                        slug,
                        checksum;
            sort total_rating desc;
            sort total_rating_count desc;
            limit ${offset + MAX_PAGE_LIMIT};
            offset ${offset};
            where 
                total_rating > 80 & 
                name != null &
                first_release_date != null &
                total_rating_count != null &
                cover.image_id != null &
                id != null &
                rating != null & 
                total_rating != null;

    `;

      const options = {
        method: "POST",
        url: GAMES_ENDPOINT,
        data: bodyText,
        headers: headers,
        validateStatus: false,
      };

      let response = await axios(options);

      if ((response.status = 200)) {
        data = response.data;
        return data;
      } else {
        return res.status(response.status).json({
          message: "[Games] [bestOfAllTime] Bad Request",
          error: { ...response.data },
        });
      }
    } catch (error) {
      return res.status(502).json({
        message: "[Games] [bestOfAllTime] Server Error",
        error: { ...error },
      });
    }
  }
});

router.get("/bestOfLastMonths", (req, res) => {
  const accessToken = req.tokenInfo.accessToken;

  let page = req.query.page;
  if (page === undefined) page = 1;
  if (page <= 0) page = 1;

  getBestOfLastMonths()
    .then((data) => {
      return res.send(data);
    })
    .catch((error) => {
      return res.status(400).json({
        message: "[Games] [bestOfLastMonths] Critical Error",
        error: { ...error },
      });
    });

  async function getBestOfLastMonths() {
    try {
      let data;
      let headers = {
        Accept: "application/json",
        "Client-ID": IGDB_CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "text/plain",
      };

      let offset = (page - 1) * 10;
      let today = new Date();

      let lastMonthDate = new Date(
        today.getFullYear(),
        today.getMonth() - 3,
        today.getDay()
      );

      let lastMonthTimeStamp = toTimestamp(lastMonthDate);

      function toTimestamp(strDate) {
        var datum = Date.parse(strDate);
        return datum / 1000;
      }

      console.log(lastMonthTimeStamp);

      let bodyText = `fields 
                        id,
                        aggregated_rating,
                        aggregated_rating_count,
                        artworks.image_id,
                        category,
                        collection.name,
                        collection.games,
                        cover.image_id,
                        created_at,
                        dlcs.name,
                        expanded_games.name,
                        expansions.name,
                        first_release_date,
                        follows,
                        game_engines.name,
                        game_engines.logo,
                        game_engines.logo.image_id,
                        game_modes.name,
                        genres.name,
                        involved_companies.company.name,
                        platforms.name,
                        platforms.abbreviation,
                        platforms.platform_logo.image_id,
                        player_perspectives.name,
                        rating,
                        rating_count,
                        release_dates.date,
                        screenshots.image_id,
                        similar_games.name,
                        similar_games.cover.image_id,
                        similar_games.total_rating,
                        status,
                        storyline,
                        summary,
                        themes.name,
                        total_rating,
                        total_rating_count,
                        version_title,
                        videos.video_id,
                        websites.url,
                        name,
                        slug,
                        checksum;
            sort total_rating desc;
            sort total_rating_count desc;
            limit ${offset + 20};
            offset ${offset};
            where  
                name != null &
                first_release_date != null &
                first_release_date > ${lastMonthTimeStamp} &
                cover != null &
                total_rating != null &
                cover.image_id != null &
                rating != null &
                id != null;
      `;

      const options = {
        method: "POST",
        url: GAMES_ENDPOINT,
        data: bodyText,
        headers: headers,
        validateStatus: false,
      };

      let response = await axios(options);

      if ((response.status = 200)) {
        data = response.data;
        return data;
      } else {
        return res.status(response.status).json({
          message: "[Games] [bestOfLastMonths] Bad Request",
          error: { ...response.data },
        });
      }
    } catch (error) {
      return res.status(502).json({
        message: "[Games] [bestOfLastMonths] Server Error",
        error: { ...error },
      });
    }
  }
});

router.get("/bestOfLastYear", (req, res) => {
  const accessToken = req.tokenInfo.accessToken;

  let page = req.query.page;
  if (page === undefined) page = 1;
  if (page <= 0) page = 1;

  getBestOfLastYear()
    .then((data) => {
      return res.send(data);
    })
    .catch((error) => {
      return res.status(400).json({
        message: "[Games] [bestOfLastYear] Critical Error",
        error: { ...error },
      });
    });

  async function getBestOfLastYear() {
    try {
      let data;
      let headers = {
        Accept: "application/json",
        "Client-ID": IGDB_CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "text/plain",
      };

      let offset = (page - 1) * 10;
      let today = new Date();

      let lastYearDate = new Date(
        today.getFullYear() - 1,
        today.getMonth(),
        today.getDay()
      );

      let lastYearTimeStamp = toTimestamp(lastYearDate);

      function toTimestamp(strDate) {
        var datum = Date.parse(strDate);
        return datum / 1000;
      }

      console.log(lastYearTimeStamp);

      let bodyText = `fields 
                        id,
                        aggregated_rating,
                        aggregated_rating_count,
                        artworks.image_id,
                        category,
                        collection.name,
                        collection.games,
                        cover.image_id,
                        created_at,
                        dlcs.name,
                        expanded_games.name,
                        expansions.name,
                        first_release_date,
                        follows,
                        game_engines.name,
                        game_engines.logo,
                        game_engines.logo.image_id,
                        game_modes.name,
                        genres.name,
                        involved_companies.company.name,
                        platforms.name,
                        platforms.abbreviation,
                        platforms.platform_logo.image_id,
                        player_perspectives.name,
                        rating,
                        rating_count,
                        release_dates.date,
                        screenshots.image_id,
                        similar_games.name,
                        similar_games.cover.image_id,
                        similar_games.total_rating,
                        status,
                        storyline,
                        summary,
                        themes.name,
                        total_rating,
                        total_rating_count,
                        version_title,
                        videos.video_id,
                        websites.url,
                        name,
                        slug,
                        checksum;
            sort total_rating desc;
            sort total_rating_count desc;
            limit ${offset + 20};
            offset ${offset};
            where  
                name != null &
                first_release_date != null &
                first_release_date > ${lastYearTimeStamp} &
                cover != null &
                total_rating != null &
                cover.image_id != null &
                rating != null &
                id != null;
      `;

      const options = {
        method: "POST",
        url: GAMES_ENDPOINT,
        data: bodyText,
        headers: headers,
        validateStatus: false,
      };

      let response = await axios(options);

      if ((response.status = 200)) {
        data = response.data;
        return data;
      } else {
        return res.status(response.status).json({
          message: "[Games] [bestOfLastYear] Bad Request",
          error: { ...response.data },
        });
      }
    } catch (error) {
      return res.status(502).json({
        message: "[Games] [bestOfLastYear] Server Error",
        error: { ...error },
      });
    }
  }
});

router.get("/search", (req, res) => {
  const accessToken = req.tokenInfo.accessToken;

  const gameName = req.query.game
  getSearchedGame()
  .then((data) => {
    return res.send(data);
  })
  .catch((error) => {
    return res.status(400).json({
      message: "[Games] [Search Game] Critical Error",
      error: { ...error },
    });
  });



  async function getSearchedGame() {
    try {

      let data;
      let headers = {
        Accept: "application/json",
        "Client-ID": IGDB_CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "text/plain",
      };


      let bodyText = `fields 
                        id,
                        aggregated_rating,
                        aggregated_rating_count,
                        artworks.image_id,
                        category,
                        collection.name,
                        collection.games,
                        cover.image_id,
                        created_at,
                        dlcs.name,
                        expanded_games.name,
                        expansions.name,
                        first_release_date,
                        follows,
                        game_engines.name,
                        game_engines.logo,
                        game_engines.logo.image_id,
                        game_modes.name,
                        genres.name,
                        involved_companies.company.name,
                        platforms.name,
                        platforms.abbreviation,
                        platforms.platform_logo.image_id,
                        player_perspectives.name,
                        rating,
                        rating_count,
                        release_dates.date,
                        screenshots.image_id,
                        similar_games.name,
                        similar_games.cover.image_id,
                        similar_games.total_rating,
                        status,
                        storyline,
                        summary,
                        themes.name,
                        total_rating,
                        total_rating_count,
                        version_title,
                        videos.video_id,
                        websites.url,
                        name,
                        slug,
                        checksum;
                  sort total_rating desc;
                  sort total_rating_count desc;      
                  where  
                    name != null &
                    name ~ *"${gameName}"* &
                    total_rating != null &
                    rating != null &
                    cover.image_id != null; 
                    `;

      const options = {
        method: "POST",
        url: GAMES_ENDPOINT,
        data: bodyText,
        headers: headers,
        validateStatus: false,
      };

      let response = await axios(options);

      if ((response.status = 200)) {
        data = response.data;
        return data;
      } else {
        return res.status(response.status).json({
          message: "[Games] [Search Game] Bad Request",
          error: { ...response.data },
        });
      }
    } catch (error) {
      return res.status(502).json({
        message: "[Games] [Search Game] Server Error",
        error: { ...error },
      });
    }
  }

})

module.exports = router;
