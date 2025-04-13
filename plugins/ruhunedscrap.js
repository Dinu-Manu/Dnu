const { cmd, commands } = require('../command');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions');
const { ytmp3 } = require('ruhend-scraper');
const yts = require('yt-search');

cmd({
    pattern: "ruhu",
    desc: 'Download Song as MP3',
    use: '.song [song name]',
    react: "📥",
    category: 'download',
    filename: __filename
},
async (conn, mek, m, {
  q,
  reply
}) => {
    try {
        if (!q) return reply('ඇයි පකයා, ගීතේ නමක්වත් දාන්නකෝ!');

        reply('ගීතය සෙවීමෙයි...');

        const search = await yts(q);
        const video = search.videos[0];

        if (!video) return reply('ගීතයක් හමු නොවුණා.');

        const data = await ytmp3(video.url);

        await conn.sendMessage(m.chat, {
            image: { url: data.thumbnail },
            caption: `*Title:* ${data.title}\n*Author:* ${data.author}\n*Duration:* ${data.duration}\n\n_ඔබගේ MP3 ගීතය මෙන්න!_`,
        }, { quoted: mek });

        await conn.sendMessage(m.chat, {
            audio: { url: data.audio },
            mimetype: 'audio/mpeg',
            fileName: `${data.title}.mp3`
        }, { quoted: mek });

    } catch (err) {
        console.error(err);
        reply('උබටම වැටෙයි පකයා, error එකක් ආව! නැවත උත්සහ කරන්න.');
    }
});
