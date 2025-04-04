const { cmd, commands } = require('../command');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions');
const yts = require("yt-search");
const domain = `https://movie-api-site-cf197b343b3c.herokuapp.com`

cmd({
    pattern: "song",
    desc: 'Download Song / Video',
    use: '.play Title',
    react: "📥",  // Initial reaction when command is triggered
    category: 'download',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
 
    try {
        if (!q) return reply('Please provide a title.');

        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;
        const dataa = await fetchJson(`${domain}/convert?mp3=${encodeURIComponent(url)}&apikey=Manul-Official`);
        const dl_link = dataa.data.url;
        
        let desc = `*💚🎵 𝐘𝐓 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑 🎵💚*
        
> *\`➤ Title\` :* ${data.title}

> *\`➤ Views\` :* ${data.views}

> *\`➤ DESCRIPTION\`:* ${data.description}

> *\`➤ TIME\`:* ${data.timestamp}

> *\`➤ AGO\`:* ${data.ago}

*◄❪ Reply This Message With Nambars ❫►*
╭────────────────────◉◉➤
*➢ 1 Audio*
*➢ 2 Document*
*➢ 3 Voice Type*
╰────────────────────◉◉➤
> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : ©𝐌𝐑 𝐌𝐀𝐍𝐔𝐋 𝐎𝐅𝐂 💚*`;

        const vv = await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });
        
        // Reaction indicating the bot is processing the request
        await conn.sendMessage(from, { react: { text: '📤', key: vv.key } });

        // After processing is done and sending the message
        await conn.sendMessage(from, { react: { text: '✅', key: vv.key } });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        // Send Audio
                        await conn.sendMessage(from, { 
                            audio: { url: dl_link }, 
                            mimetype: "audio/mpeg", 
                            caption: "" 
                        }, { quoted: mek });
                        break;
                    case '2':               
                        // Send Document File
                        await conn.sendMessage(from, { 
                            document: { url: dl_link },
                            mimetype: "audio/mpeg", 
                            fileName: `${data.title}.mp3`, 
                            caption: "> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : ©𝐌𝐑 𝐌𝐀𝐍𝐔𝐋 𝐎𝐅𝐂 💚*" 
                        }, { quoted: mek });
                        break;
                    case '3':
                        await conn.sendMessage(from, { audio: { url: dl_link }, mimetype: 'audio/mp4', ptt: true }, { quoted: mek });
                        break;
                    default:
                        reply("Invalid option. Please select a valid option 💗");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('An error occurred while processing your request.');
    }
});
