const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ01RVk9iZEM2R3J4Sm0vMys2L0JXMHROdWp0bnJWZU9nQkM5R05USk9rZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiN2Znbm9kaGxlTDIraEh3ZW9CWGpjbVNaUkIxL0FCSWJiWGFFSnJ6ejNDND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJQmRJaDZabzZGc2NXR2l6ektQWW5YR2NrdHh4c2VpQ0Q5ZkhtdGhham5JPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNb0VZSzBqRnZGUDNWakxqZ0dtNk40Ky82MThSTXQrRzJIQ1ZyWk8vUmpnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhLQmlMQmV5ck9IRGVvYVB1TlFOWmtWTGN2ZWMvY0xuZmVYOUYxUGhwa2s9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5TWHY3Qlo4eTB1VzljR3BxOGNmTTlvSTgzZ25UVTdWWllBWmVqQjRkRjA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0txZ2h0UUVIZlVpRkl6bDNQRlRCOG1FVVZkdWxITXRnalpJdmtQSktHUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0djUUl3MmcrRUVnTCtJbW1MYWpsVzlaUnhBb1VQM3dsWjNpdzlRZlp3TT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlKc1A2ZTlQeGhkb0E1VzZhRkRSM1RKMHo4SnRuTkdobXRscndvN2dyOGJEZW90aTVIOUhvV2RUQStNN01lSCs1UnJEZmdyVlU5RFhWVnpUaUxYS2pBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTkxLCJhZHZTZWNyZXRLZXkiOiJlR2kwbVQ5NmdMNklJaDc0VmxvMWkwTG1qQUVwR1A1aWlMbGZFWkFqSTFnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgxMDkyNDM2MThAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQUM2MDlBNjJDRTA0MTMzODUzMjAyQkIzMzZFQzAxQjYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTczMDM3MTY2N31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiUG42UU5zWmZRLXlhSDBuRnRJV09jZyIsInBob25lSWQiOiJhZGZmMTE1YS0xNzM3LTQ4N2UtYjRkZC02ZjMyZjljZmEzNDEiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNGViaVJaa01MVFZVTkkxam9sTVAvbXUwT0JvPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImR0ZnZwQUxmS2diaU5qZWt3YWQ4a1hvMzg4MD0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJZUFpUNDVCUyIsIm1lIjp7ImlkIjoiMjM0ODEwOTI0MzYxODozMEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTTJ5MTg4RUVNSEFqYmtHR0FRZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiV0wyUjU5RXFCMTlIU3hYUXp6dlJFbTVrck1UUW9VSGdhMk9qQ1BOWHFqZz0iLCJhY2NvdW50U2lnbmF0dXJlIjoid0ZZRElMVzFPSzhYNTEzVXJUNmpEeTI0enZYYkQzLzFscjFnT0pGbzBVM3VnZ1BsVVBpcW9jaXpKQ3l2S1hrMFFLOW9LczdUZGZ2dktORWhGc1RtQWc9PSIsImRldmljZVNpZ25hdHVyZSI6InFhSERmQ0x3MGhqVlVGYlV5YWRMRDkzOVlEaFk0aE1uY05iTDJYSVBsazB2ZFZmMC94aGw0VGtIWlBSbThJbkwyUDBCSFNJVE9GT3o0ZVdRWHdhMWpRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODEwOTI0MzYxODozMEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWaTlrZWZSS2dkZlIwc1YwTTg3MFJKdVpLekUwS0ZCNEd0am93anpWNm80In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMwMzcxNjYzLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUJ4RSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "348109243618",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
