const { cmd } = require("../command");
const axios = require("axios");
const yts = require("yt-search"); // YouTube Search Import

cmd(
  {
    pattern: "song",
    alias: ["ytmp3", "ytbass"],
    desc: "Download and send a YouTube song",
    category: "music",
    react: "🎵",
    filename: __filename,
  },
  async (conn, mek, m, { from, args, reply }) => {
    try {
      let query = args.join(" ");
      if (!query) return reply("⚠️ Please provide a YouTube song name or link! (Example: `.song Alan Walker Faded`)");

      // YouTube Search
      let searchResults = await yts(query);
      if (!searchResults.videos.length) return reply("❌ No results found!");

      let videoUrl = searchResults.videos[0].url; // First result URL
      let title = searchResults.videos[0].title; // Video Title

      // Download using API
      let apiUrl = `https://manul-ofc-ytdl-paid-30a8f429a0a6.herokuapp.com/yt-download?url=${encodeURIComponent(videoUrl)}`;
      let response = await axios.get(apiUrl);

      console.log("API Response:", response); // Debugging purpose to check the structure

      // Check if the downloadUrl exists in the API response
      let audioUrl = response.downloadUrl;

      if (!audioUrl) return reply("❌ Unable to download the requested song.");

      await conn.sendMessage(
        from,
        { audio: { url: audioUrl }, mimetype: "audio/mpeg", fileName: `${title}.mp3` },
        { quoted: m }
      );

    } catch (e) {
      console.error("Song Command Error:", e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);
