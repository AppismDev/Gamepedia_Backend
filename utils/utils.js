require('dotenv').config()

exports.IGDB_CLIENT_ID = process.env.IGDB_CLIENT_ID;
exports.IGDB_CLIENT_SCRET = process.env.IGDB_CLIENT_SCRET;


exports.GAMES_ENDPOINT = "https://api.igdb.com/v4/games";
exports.COVERS_ENDPOINT = "https://api.igdb.com/v4/covers";
exports.SCREENSHOTS_ENDPOINT = "https://api.igdb.com/v4/screenshots";
exports.ARTWORKS_ENDPOINT = "https://api.igdb.com/v4/artworks";
exports.COMPANY_ENDPOINT = "https://api.igdb.com/v4/companies";
exports.GENRES_ENDPOINT = "https://api.igdb.com/v4/genres";
exports.PLATFORMS_ENDPOINT = "https://api.igdb.com/v4/platforms";
exports.THEMES_ENDPOINT = "https://api.igdb.com/v4/themes";
exports.GAMEMODES_ENDPOINT = "https://api.igdb.com/v4/game_modes";
exports.COMPANIES_ENDPOINT = "https://api.igdb.com/v4/companies";





exports.MAX_PAGE_LIMIT = 10;

