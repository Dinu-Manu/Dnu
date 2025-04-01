/*  
Plugin Author: @DarkYasiya  
Follow Us: https://whatsapp.com/channel/0029VaaPfFK7Noa8nI8zGg27  
*/

const { cmd } = require('../command');
const DY_SCRAP = require('@dark-yasiya/scrap');
const dy_scrap = new DY_SCRAP();

function replaceYouTubeID(url) {
    const regex = /(?:youtube\.com\/(?:.*v=|.*\/)|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

cmd({
    pattern: "voice",
    alias: ["ytmp3", "dinu"],
    react: "🎵",
    desc: "Download Ytmp3",
    category: "download",
    use: ".song <Text or YT URL>",
    filename: __filename
}, async (conn, m, mek, { from, q, reply }) => {
    try {
        if (!q) return await reply("❌ කරුණාකර YouTube URL එකක් හෝ සෙවුම් පදයක් දෙන්න!");

        let id = q.startsWith("https://") ? replaceYouTubeID(q) : null;

        if (!id) {
            const searchResults = await dy_scrap.ytsearch(q);
            if (!searchResults?.results?.length) return await reply("❌ ප්‍රතිඵල නොමැත!");
            id = searchResults.results[0].videoId;
        }

        const data = await dy_scrap.ytsearch(`https://youtube.com/watch?v=${id}`);
        if (!data?.results?.length) return await reply("❌ වීඩියෝව ලබාගැනීමට අසමත් විය!");

        const { url, title, image, timestamp, ago, views, author } = data.results[0];

        let songDetails = `╭━━━〘 🎵 𝚆𝙴𝙻𝙲𝙾𝙼𝙴 🎵 〙━━━╮\n` +
            `┃\n` +
            `┣➤ 🎼 *${title}*\n` +
            `┃   ├─  *𝚃𝙸𝙼𝙴...*  ${timestamp || "Unknown"}\n` +
            `┃   ├─  *Uploaded 𝚋𝚢...*  ${ago || "Unknown"}\n` +
            `┃\n` +
            `┃ 🎶 *𝐃🅸𝙽υᴡ 𝚂𝚘𝚗𝚐 𝙷𝚞𝚋* ᥫ᭡ | 🫣✊\n` +
            `╰━━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
            `> *𝙷𝙴𝙰𝙳𝙿𝙷𝙾𝙽𝙴 𝙾𝙽! 𝙵𝙴𝙴𝙻 𝚃𝙷𝙴 𝚅𝙸𝙱𝙴*\n` +
            `\n\n` +
            `<𝙾𝚄𝚁 𝙾𝚃𝙷𝙴𝚁 𝙲𝙷𝙰𝙽𝙽𝙴𝙻>\n\n` +
            `> ╭━━⟡ᴛᴇᴄʜ  ᴄʜᴀɴɴᴇʟ⟡━━╮:- https://whatsapp.com/channel/0029Vat7xHl7NoZsrUVjN844\n` +
            `මේ පැත්තටත් එන්න ළමයෝ🫢💗" 👇👇\n` +
            `> ╭━━⟡ꜱᴛᴀᴛᴜꜱ ᴄʜɴɴᴀʟ⟡━━╮:- https://whatsapp.com/channel/0029VaxVCPi96H4VOKai4S3s\n`;

        await conn.sendMessage(from, { image: { url: image }, caption: songDetails }, { quoted: mek });

                const response = await dy_scrap.ytmp3(`https://youtube.com/watch?v=${id}`);
        let downloadUrl = response?.result?.download?.url;
        if (!downloadUrl) return await reply("❌ බාගැනීමේ ලිංක් එකක් හමු නොවීය!");

        // Send as Audio
        await conn.sendMessage(from, { 
    audio: { url: downloadUrl }, 
    mimetype: "audio/mpeg", 
    ptt: true 
}, { quoted: mek });
        
    } catch (error) {
        console.error(error);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        await reply(`❌ *දෝෂයක් සිදුවිය:* ${error.message || "Error!"}`);
    }
});
