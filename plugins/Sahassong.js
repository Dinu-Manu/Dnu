/*
ʏᴏᴜᴛᴜʙᴇ ᴍᴘ3 ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ᴘʟᴜɢɪɴ  
ᴄʀᴇᴀᴛᴇᴅ ʙʏ : ᴅᴇɴᴇᴛʜᴅᴇᴠ®  
ᴘʟᴇᴀꜱᴇ ᴅᴏɴᴛ ʀᴇᴍᴏᴠᴇ ᴏᴡɴᴇʀ ᴄʀᴇᴅɪᴛꜱ 😁  
*/

const { cmd } = require('../command');
const yts = require('yt-search');
const ddownr = require('denethdev-ytmp3'); // Importing the denethdev-ytmp3 package for downloading

cmd({
  pattern: "sahas",
  desc: "Download songs.",
  category: "download",
  react: '🎧',
  filename: __filename
}, async (messageHandler, context, quotedMessage, { from, reply, q }) => {
  try {
    if (!q) return reply("*Please Provide A Song Name or Url 🙄*");
    
    // Search for the song using yt-search
    const searchResults = await yts(q);
    if (!searchResults || searchResults.videos.length === 0) {
      return reply("*No Song Found Matching Your Query 🧐*");
    }

    const songData = searchResults.videos[0];
    const songUrl = songData.url;

    // Using denethdev-ytmp3 to fetch the download link
    const result = await ddownr.download(songUrl, 'mp3'); // Download in mp3 format
    const downloadLink = result.downloadUrl; // Get the download URL

    let songDetailsMessage = `╭━━━〔 *𝙒𝙀𝙇𝘾𝙊𝙈𝙀* 〕━━━┈⊷
┃▸╭───────────
┃▸┃๏ *Use headphones for best experience🎧🎶💆‍♂️*
┃▸└───────────···๏
╰────────────────┈⊷
╭━━❐━⪼
┇๏ *Title* -  ${songData.title}
┇๏ *Duration* - ${songData.timestamp}
┇๏ *Uploader* -  ${songData.author.name}
┇๏ *Release Date* -  ${songData.ago}
┇๏ *Views* -  ${songData.views}
┇๏ *Url* -  ${songData.url}
╰━━❑━⪼

*🌟 𝗙𝗼𝗹𝗹𝗼𝘄 𝗨𝘀 -* https://whatsapp.com/channel/0029Vb8WOgSBPzjfG09WEn10

> *©ꜱᴀʜᴀꜱ ᴍᴜꜱɪᴄ ꜱᴛʏʟᴇ*`;

    // Send the video thumbnail with song details
    await messageHandler.sendMessage(from, {
      image: { url: songData.thumbnail },
      caption: songDetailsMessage,
    }, { quoted: quotedMessage });

    // Send the song as a PTT (Push-To-Talk)
    await messageHandler.sendMessage(from, {
      audio: { url: downloadLink },
      mimetype: "audio/mpeg",
      ptt: true, // PTT enabled
    }, { quoted: quotedMessage });

  } catch (error) {
    console.error(error);
    reply("*An Error Occurred While Processing Your Request 😔*");
  }
});
