const { cmd, commands } = require('../command');
const axios = require("axios");
const yts = require("yt-search");

cmd({
  pattern: "hu",
  alias: ["mp3", "yta"],
  desc: "Search or download YouTube audio using Dinu API",
  category: "downloader",
  use: "<YouTube URL or search query>",
  filename: __filename,
  async execute(m, client, text) {
    try {
      if (!text) return m.reply("🔎 *YouTube link එකක් හෝ ගීතයෙ නමක් දෙන්න!*");

      let videoUrl = text;

      // If not a URL, do a YouTube search
      if (!text.includes("youtube.com") && !text.includes("youtu.be")) {
        const search = await yts(text);
        if (!search.videos || search.videos.length === 0) {
          return m.reply("❌ ගීතය හමු නොවුණා.");
        }

        const video = search.videos[0];
        videoUrl = video.url;
        await m.reply(`✅ *උපරිම ගැලපෙන ගීතය:* ${video.title}`);
      }

      // Use your custom API
      const api = `https://ytmp3dinu-080c7db2acf1.herokuapp.com/download/ytmp3?url=${videoUrl}`;
      const res = await axios.get(api);

      if (!res.data || !res.data.url) {
        return m.reply("❌ Download එකට බැරි වුණා. Link එක check කරන්න.");
      }

      const title = res.data.title || "ytmp3_dinu";
      const audioUrl = res.data.url;

      await client.sendMessage(m.chat, {
        audio: { url: audioUrl },
        mimetype: "audio/mpeg",
        fileName: `${title}.mp3`,
        ptt: false,
      }, { quoted: m });

    } catch (err) {
      console.error(err);
      m.reply("⚠️ ගීතය Download කරනකොට Error එකක් ආවා.");
    }
  }
});
