const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

zokou({ nomCom: "deploy", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
Hello ${nomAuteurMessage},,
╔══════『 𝗗𝗘𝗣𝗟𝗢𝗬𝗠𝗘𝗡𝗧 𝗚𝗨𝗜𝗗𝗘 』══════╗

🌟 *Pre-Deployment Checklist*
• Make sure you have access to deployment platforms:
  ◦ Heroku (heroku.com)
  ◦ Render (render.com)
  ◦ Koyeb (koyeb.com)

📱 *Getting Your Session ID*
1. Visit: https://eliah-7b9540c853b5.herokuapp.com/pair
2. Click on "Pair Code" button
3. Enter your WhatsApp number (with country code)
   Example: 255617834510
4. Wait for code from EliTechWiz-V4 owner
5. Check WhatsApp notifications & enter the code
6. Your session ID will be sent to your WhatsApp inbox

🚀 *Deployment Process*
1. Fork the Repository
   • ⭐ Star the repository first (Required)
   • Fork EliTechWiz-V4 to your account

2. Heroku Deployment
   • Click the Heroku Deploy button
   • Get your Heroku API Key from dashboard
   • Choose a unique app name
   • Fill in required environment variables
   • Click "Deploy" and wait for build completion

⚠️ *Important Notes*
• Repository must be starred before deployment
• Keep your Session ID secure
• Build logs might not show immediately
• Be patient during deployment

📞 *Support & Credits*
• Developer: EliTechWiz
• Contact: https://wa.me/255617834510
• Please give credits when sharing

╚═════════════════════════════╝`;
let menuMsg = `
     𝐑𝐞𝐠𝐚𝐫𝐝𝐬 Eliah Hango`;
   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *EliTechWiz*, déveloper Eliahhango" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *EliTechWiz*, déveloper Eliahhango" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

}); 

