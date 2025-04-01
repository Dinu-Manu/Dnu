/*
DINUWH MD - YouTube MP3 Downloader Plugin  
Created by: DINUWH-MD®  
*/

const { cmd } = require('../command');
const axios = require('axios');

cmd({
  pattern: "mmp3",
  desc: "Download YouTube songs.",
  category: "download",
  react: '💗',
  filename: __filename
}, async (m, { conn, q }) => {
  try {
    if (!q) return m.reply("*Please provide a song name or YouTube link!*");

    const apiKey = 'Manul-Official-Key-3467'; // API Key
    const searchApiUrl = `https://mr-manul-ofc-apis.vercel.app/yts?query=${encodeURIComponent(q)}&apikey=${apiKey}`;
    const convertApiUrl = `https://movie-api-site-cf197b343b3c.herokuapp.com/convert?mp3=`;

    // Send initial reply
    m.reply("_🔍 Searching for your song..._");

    // Search for the song using Manul's API
    const searchResponse = await axios.get(searchApiUrl);
    if (!searchResponse.data || !searchResponse.data.result || searchResponse.data.result.length === 0) {
      return m.reply("*No song found matching your query!*");
    }

    const song = searchResponse.data.result[0]; // Get first search result
    const songUrl = song.url;
    const convertUrl = `${convertApiUrl}${encodeURIComponent(songUrl)}&apikey=${apiKey}`;

    // Send confirmation message with song details
    let msg = `🎵 *Now Playing: ${song.title}*\n`;
    msg += `⏳ Duration: ${song.timestamp}\n`;
    msg += `📅 Uploaded: ${song.ago}\n\n`;
    msg += `🔄 *Converting to MP3...*`;

    await conn.sendMessage(m.chat, {
      image: { url: song.thumbnail },
      caption: msg
    }, { quoted: m });

    // Convert YouTube link to MP3
    const convertResponse = await axios.get(convertUrl);
    if (!convertResponse.data || !convertResponse.data.url) {
      return m.reply("*Failed to retrieve MP3 link!*");
    }

    // Send final confirmation before sending the MP3
    await m.reply("_🎧 Downloading MP3..._");

    // Send the song as PTT (Push-To-Talk)
    await conn.sendMessage(m.chat, {
      audio: { url: convertResponse.data.url },
      mimetype: "audio/mpeg",
      ptt: true
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    m.reply("*An error occurred while downloading the song!*");
  }
});
