const { zokou } = require("../framework/zokou");
const { getAllSudoNumbers, isSudoTableNotEmpty } = require("../bdd/sudo");
const conf = require("../set");

zokou({ nomCom: "owner", categorie: "General", reaction: "👑" }, async (dest, zk, commandeOptions) => {
    const { ms, mybotpic } = commandeOptions;
    
    const thsudo = await isSudoTableNotEmpty();

    if (thsudo) {
        let msg = `*╭─────❰ 👑 OWNER INFO 👑 ❱─────╮*
│
│ *👤 MAIN OWNER*
│ • @${conf.NUMERO_OWNER}
│
│ *💫 SUPER USERS*
`;
        
        let sudos = await getAllSudoNumbers();

        for (const sudo of sudos) {
            if (sudo) {
                sudonumero = sudo.replace(/[^0-9]/g, '');
                msg += `│ • @${sudonumero}\n`;
            }
        }
        
        msg += `│
╰────────────────────────╯`;

        const ownerjid = conf.NUMERO_OWNER.replace(/[^0-9]/g) + "@s.whatsapp.net";
        const mentionedJid = sudos.concat([ownerjid]);

        zk.sendMessage(
            dest,
            {
                image: { url: mybotpic() },
                caption: msg,
                mentions: mentionedJid
            }
        );
    } else {
        const vcard =
            'BEGIN:VCARD\n' +
            'VERSION:3.0\n' +
            'FN:' + conf.OWNER_NAME + '\n' +
            'ORG:EliTechWiz-V4;\n' +
            'TEL;type=CELL;type=VOICE;waid=' + conf.NUMERO_OWNER + ':+' + conf.NUMERO_OWNER + '\n' +
            'END:VCARD';
        zk.sendMessage(dest, {
            contacts: {
                displayName: conf.OWNER_NAME,
                contacts: [{ vcard }],
            },
        }, { quoted: ms });
    }
});

zokou({ nomCom: "dev", categorie: "General", reaction: "👨‍💻" }, async (dest, zk, commandeOptions) => {
    const { ms, mybotpic } = commandeOptions;

    const devs = [
        { nom: "Eliah", numero: "255617834510" },
        { nom: "Eliah", numero: "255755566045" }
    ];

    let message = `*╭─────❰ 👨‍💻 DEVELOPERS 👨‍💻 ❱─────╮*
│
│ *Welcome to EliTechWiz-V4*
│ *Development Support Center!*
│
│ *Available Developers:*\n`;

    for (const dev of devs) {
        message += `│ • ${dev.nom}
│   wa.me/${dev.numero}
│
`;
    }
    
    message += `╰────────────────────────╯`;

    var lien = mybotpic();
    if (lien.match(/\.(mp4|gif)$/i)) {
        try {
            zk.sendMessage(dest, { video: { url: lien }, caption: message }, { quoted: ms });
        } catch (e) {
            console.log("🔴 Error in menu: " + e);
            repondre("🔴 Error occurred: " + e);
        }
    } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
        try {
            zk.sendMessage(dest, { image: { url: lien }, caption: message }, { quoted: ms });
        } catch (e) {
            console.log("🔴 Error in menu: " + e);
            repondre("🔴 Error occurred: " + e);
        }
    } else {
        repondre("❌ Invalid media link");
    }
});

zokou({ nomCom: "support", categorie: "General", reaction: "💫" }, async (dest, zk, commandeOptions) => {
    const { ms, repondre, auteurMessage } = commandeOptions;

    const supportMessage = `*╭─────❰ 🌟 SUPPORT LINKS 🌟 ❱─────╮*
│
│ *📢 Official Channel*
│ • https://whatsapp.com/channel/0029VaeEYF0BvvsZpaTPfL2s
│
│ *👥 Community Group*
│ • https://chat.whatsapp.com/Lh5EQEYJn5VIa4atNRPBm5
│
│ *🎥 YouTube Channel*
│ • https://youtube.com/@eliahhango
│
│ *Powered by EliTechWiz-V4* ✨
╰────────────────────────╯`;

    repondre(supportMessage);
    await zk.sendMessage(auteurMessage, {
        text: `*Thank you for choosing EliTechWiz-V4!* 🌟\nMake sure to check out all our support links for the best experience!`,
        quoted: ms
    });
});
