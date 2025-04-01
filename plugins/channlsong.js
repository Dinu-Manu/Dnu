/*
ʏᴏᴜᴛᴜʙᴇ ᴍᴘ3 ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ᴘʟᴜɢɪɴ  
ᴄʀᴇᴀᴛᴇᴅ ʙʏ : ᴅᴇɴᴇᴛʜᴅᴇᴠ®  
ᴘʟᴇᴀꜱᴇ ᴅᴏɴᴛ ʀᴇᴍᴏᴠᴇ ᴏᴡɴᴇʀ ᴄʀᴇᴅɪᴛꜱ 😁  
*/

const { cmd } = require('../command');
const yts = require('yt-search');
const ddownr = require('denethdev-ytmp3'); // Importing the denethdev-ytmp3 package for downloading

cmd({
  pattern: "cv",
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

    let songDetailsMessage = `╭━━━〘 🎵 *𝚆𝙴𝙻𝙲𝙾𝙼𝙴* 🎵 〙━━━╮\n`;
    songDetailsMessage += `┃\n`;
    songDetailsMessage += `┣➤ 🎼 *${songData.title}*\n`;
    songDetailsMessage += `┃   ├─  *⏰ 𝚃𝙸𝙼𝙴...*  ${songData.timestamp}\n`;
    songDetailsMessage += `┃   ├─  *📆 Uploaded 𝚋𝚢...*  ${songData.ago}\n`;
    songDetailsMessage += `┃\n`;
    songDetailsMessage += `┃ 🎶 *𝐃🅸𝙽υᴡ 𝚂𝚘𝚗𝚐 𝙷𝚞𝚋* ᥫ᭡ | 🫣✊\n`;
    songDetailsMessage += `╰━━━━━━━━━━━━━━━━━━━━━━╯\n\n`;
    songDetailsMessage += `> *🎧 𝙷𝙴𝙰𝙳𝙿𝙷𝙾𝙽𝙴 𝙾𝙽! 𝙵𝙴𝙴𝙻 𝚃𝙷𝙴 𝚅𝙸𝙱𝙴 🎶*\n\n`;
    songDetailsMessage += `<𝙾𝚄𝚁 𝙾𝚃𝙷𝙴𝚁 𝙲𝙷𝙰𝙽𝙽𝙴𝙻>\n\n`;
    songDetailsMessage += `> ╭━━⟡ᴛᴇᴄʜ  ᴄʜᴀɴɴᴇʟ⟡━━╮:- https://whatsapp.com/channel/0029Vat7xHl7NoZsrUVjN844\n`;
    songDetailsMessage += `මේ පැත්තටත් එන්න ළමයෝ🫢💗" 👇👇\n`;
    songDetailsMessage += `> ╭━━⟡ꜱᴛᴀᴛᴜꜱ ᴄʜɴɴᴀʟ⟡━━╮:- https://whatsapp.com/channel/0029VaxVCPi96H4VOKai4S3s`;

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
