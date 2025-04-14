const { cmd } = require('../command');
const fetch = require("node-fetch");
const ytsearch = require("yt-search");

cmd({ 
    pattern: "devid", 
    alias: ["audio", "song"], 
    react: "🎵", 
    desc: "Download YouTube audio", 
    category: "download", 
    use: '.mp3 <YouTube URL or Song Name>', 
    filename: __filename 
}, async (conn, mek, m, { from, prefix, quoted, q, reply }) => { 
    try { 
        if (!q) return await reply("⚠️ නමක් හරි ලින්ක් එකක් හරි දෙන්න ඕනෙ!");

        const yt = await ytsearch(q);
        if (yt.videos.length < 1) return reply("❌ Video එකක් හමුනේ නැ!");

        let data = yt.videos[0];  
        let apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(data.url)}`;

        let response = await fetch(apiUrl);
        let res = await response.json();

        if (!res || res.status !== 200 || !res.result || !res.result.download_url) {
            return reply("⚠️ Download එක අසාර්ථකයි. පසුව උත්සාහ කරන්න!");
        }

        let msg = `〲🎶𝙽𝙴𝚆 𝚂𝙾𝙽𝙶 𝙽𝙾𝚆 𝚄𝙿𝙻𝙾𝙰𝙳𝙸𝙽𝙶...㋞||🕊️
        ♡ 𝚃𝙸𝚃𝙻𝙴     : *${data.title}*

...♢ 🆄я𝙻       : ${data.url}      
..♧ .🆄ρ𝙻𝙾𝙳𝙴𝙳 : ${data.ago}
.♤ ..🆃IмE    : ${data.timestamp}
⛀ ...🆅𝙸𝚆𝙴𝚂 : ${data.views.toLocaleString()}
> #DιηᵤW 🅱🅱🅷 ɱυʂιƈ ѕтуℓє ｯ☜
     ▁▂▃▄▅▆▇█▇▆▅▄▃▂▁
*||ආසම සින්දු අහන්න සෙට් වෙන ගමන් රියැක්ට් කරමු ළමයෝ.🕊️🌼*
> *𝙷𝙴𝙰𝙳𝙿𝙷𝙾𝙽𝙴 O𝚗 𝙵𝙴𝙴𝙻 𝚃𝙷𝙴 𝚅𝙸𝙱𝙴!*

*🖇️ALL MUSIC PLAY LIST 👇*
_https://whatsapp.com/channel/0029Vb3mqn5H5JLuJO3s3Z1J/2311_`;

        await conn.sendMessage(from, {
            image: { url: data.thumbnail },
            caption: msg
        }, { quoted: mek });

        await conn.sendMessage(from, {
            audio: { url: res.result.download_url },
            mimetype: "audio/mpeg",
            ptt: true // PTT ONLY!
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply("❌ දෝෂයක් ඇතිවෙලා. Retry එකක් දාන්න!");
    }
});
