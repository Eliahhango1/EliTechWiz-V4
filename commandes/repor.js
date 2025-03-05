"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");

zokou({ nomCom: "repo2", catégorie: "General", reaction: "✨", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
  const githubRepo = 'https://api.github.com/repos/Eliahhango/EliTechWiz-V4';
  const img = 'https://files.catbox.moe/vxxv26.jpeg';
  const audioUrl = 'https://files.catbox.moe/m5s8py.mp3';

  try {
    const response = await fetch(githubRepo);
    const data = await response.json();

    if (data) {
      const repoInfo = {
        stars: data.stargazers_count,
        forks: data.forks_count,
        lastUpdate: data.updated_at,
        owner: data.owner.login,
      };

      const releaseDate = new Date(data.created_at).toLocaleDateString('en-GB');
      const lastUpdateDate = new Date(data.updated_at).toLocaleDateString('en-GB');

      const gitdata = `
╭━━━━『 *EliTechWiz-V4* 』━━━━╮
│
├⊷ 👋 *Welcome, Friend!*
│
├⊷ 🤖 *Bot Name:* EliTechWiz-V4
├⊷ 🌐 *Community:*
│   https://chat.whatsapp.com/CK55DhCbb2q6UihlzPBTkP
│
├━━━『 *Repository Info* 』━━━
│
├⊷ 📂 *Repo URL:* 
│   ${data.html_url}
├⊷ ⭐ *Stars:* ${repoInfo.stars}
├⊷ 🔄 *Forks:* ${repoInfo.forks}
├⊷ 📅 *Released:* ${releaseDate}
├⊷ 🔄 *Updated:* ${repoInfo.lastUpdate}
│
├━━━『 *Creator Info* 』━━━
│
├⊷ 👑 *Developer:* Mr Eliah
├⊷ 🎨 *Project:* EliTechWiz-V4
├⊷ 💫 *Signature:* Elite Technology
│
╰━━━『 *Power & Innovation* 』━━━╯

     _Crafted with 💖 by EliTechWiz_`;

      // Send image with repository details
      await zk.sendMessage(dest, { image: { url: img }, caption: gitdata });

      // Wait before sending the audio to avoid message conflicts
      setTimeout(async () => {
        await zk.sendMessage(dest, { audio: { url: audioUrl }, mimetype: 'audio/mp3', ptt: true });
      }, 2000); // Delay of 2 seconds before sending audio
    } else {
      console.log("Could not fetch data");
    }
  } catch (error) {
    console.log("Error fetching data:", error);
  }
});
