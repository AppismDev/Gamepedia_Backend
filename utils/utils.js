require('dotenv').config()

exports.IGDB_CLIENT_ID = process.env.IGDB_CLIENT_ID;
exports.IGDB_CLIENT_SCRET = process.env.IGDB_CLIENT_SCRET;


exports.GAMES_ENDPOINT = "https://api.igdb.com/v4/games";
exports.COVERS_ENDPOINT = "https://api.igdb.com/v4/covers";




exports.MAX_PAGE_LIMIT = 20;

