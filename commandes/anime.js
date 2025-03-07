const axios = require("axios");
const {zokou} = require("../framework/zokou");
const traduire = require("../framework/traduction");
const {Sticker ,StickerTypes}= require('wa-sticker-formatter');

zokou({
  nomCom: "ranime",
  categorie: "Fun",
  reaction: "📺"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const jsonURL = "https://api.jikan.moe/v4/random/anime"; // Remplacez par votre URL JSON

  try {
    const response = await axios.get(jsonURL);
    const data = response.data.data;

    const title = data.title;
    const synopsis = data.synopsis;
    const imageUrl = data.images.jpg.image_url; // Utilisez l'URL de l'image JPG
    const episodes = data.episodes;
    const status = data.status;

    //const texttraduit = await traduire(synopsis,{ to: 'fr' })

    const message = `📺 Titre: ${title}\n🎬 Épisodes: ${episodes}\n📡 Statut: ${status}\n📝 Synopsis: ${synopsis}\n🔗 URL: ${data.url}`;
    
    // Envoyer l'image et les informations
    zk.sendMessage(origineMessage, { image: { url: imageUrl }, caption: message }, { quoted: ms });
  } catch (error) {
    console.error('Error retrieving data from JSON :', error);
    repondre('Error retrieving data from JSON.');
  }
});

zokou({
  nomCom: "google",
  categorie: "Search",
  reaction: "🔍"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre } = commandeOptions;
  
  if (!arg || arg.length === 0) {
    repondre("Please provide a search query.\n*Example: .google What is a bot*");
    return;
  }

  try {
    const googleIt = require('google-it');
    const searchQuery = arg.join(" ");
    
    const results = await googleIt({
      query: searchQuery,
      limit: 8,  // Limit to 8 results for better readability
      disableConsole: true // Prevent console logs
    });

    if (!results || results.length === 0) {
      repondre("No results found for your search query.");
      return;
    }

    let msg = `🔍 *Google Search Results*\n\n`;
    msg += `*Query:* ${searchQuery}\n\n`;

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      msg += `*${i + 1}. ${result.title}*\n`;
      msg += `${result.snippet}\n`;
      msg += `🔗 ${result.link}\n\n`;
    }
    
    repondre(msg);
  } catch (error) {
    console.error('Google search error:', error);
    repondre("❌ An error occurred during the Google search. Please make sure the query is valid and try again.");
  }
});
zokou({
  nomCom: "imdb",
  categorie: "Search"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre , ms } = commandeOptions;

  if (!arg[0] || arg === "") {
    repondre("give the name of a series or film.");
    return;
  }

  try {
    
    const response = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${arg}&plot=full`);
    const imdbData = response.data;

    let imdbInfo = "⚍⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚍\n";
    imdbInfo += " ``` 𝕀𝕄𝔻𝔹 𝕊𝔼𝔸ℝℂℍ```\n";
    imdbInfo += "⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎\n";
    imdbInfo += "🎬Title    : " + imdbData.Title + "\n";
    imdbInfo += "📅year      : " + imdbData.Year + "\n";
    imdbInfo += "⭐Assessment : " + imdbData.Rated + "\n";
    imdbInfo += "📆Release    : " + imdbData.Released + "\n";
    imdbInfo += "⏳Runtime     : " + imdbData.Runtime + "\n";
    imdbInfo += "🌀Genre      : " + imdbData.Genre + "\n";
    imdbInfo += "👨🏻‍💻Director : " + imdbData.Director + "\n";
    imdbInfo += "✍writers : " + imdbData.Writer + "\n";
    imdbInfo += "👨actors  : " + imdbData.Actors + "\n";
    imdbInfo += "📃Synopsis  : " + imdbData.Plot + "\n";
    imdbInfo += "🌐Language  : " + imdbData.Language + "\n";
    imdbInfo += "🌍Contry      : " + imdbData.Country + "\n";
    imdbInfo += "🎖️Awards : " + imdbData.Awards + "\n";
    imdbInfo += "📦BoxOffice : " + imdbData.BoxOffice + "\n";
    imdbInfo += "🏙️Production : " + imdbData.Production + "\n";
    imdbInfo += "🌟score : " + imdbData.imdbRating + "\n";
    imdbInfo += "❎imdbVotes : " + imdbData.imdbVotes + "";

    zk.sendMessage(dest, {
      image: {
        url: imdbData.Poster,
      },
      caption: imdbInfo,
    }, {
      quoted: ms,
    });
  } catch (error) {
    repondre("An error occurred while searching IMDb.");
  }
});

zokou({
  nomCom: "movie",
  categorie: "Search"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre , ms } = commandeOptions;

  if (!arg[0] || arg === "") {
    repondre("give the name of a series or film.");
    return;
  }

  try {
    
    const response = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${arg}&plot=full`);
    const imdbData = response.data;

    let imdbInfo = "Tap on the link to join movie channel on telegram and download movies there : https://t.me/ibrahimtechai\n";
    imdbInfo += " ``` EliTechWiz-V4 FILMS```\n";
    imdbInfo += "*Made by Eliah Hango*\n";
    imdbInfo += "🎬Title    : " + imdbData.Title + "\n";
    imdbInfo += "📅year      : " + imdbData.Year + "\n";
    imdbInfo += "⭐Assessment : " + imdbData.Rated + "\n";
    imdbInfo += "📆Release    : " + imdbData.Released + "\n";
    imdbInfo += "⏳Runtime     : " + imdbData.Runtime + "\n";
    imdbInfo += "🌀Genre      : " + imdbData.Genre + "\n";
    imdbInfo += "👨🏻‍💻Director : " + imdbData.Director + "\n";
    imdbInfo += "✍writers : " + imdbData.Writer + "\n";
    imdbInfo += "👨actors  : " + imdbData.Actors + "\n";
    imdbInfo += "📃Synopsis  : " + imdbData.Plot + "\n";
    imdbInfo += "🌐Language  : " + imdbData.Language + "\n";
    imdbInfo += "🌍Contry      : " + imdbData.Country + "\n";
    imdbInfo += "🎖️Awards : " + imdbData.Awards + "\n";
    imdbInfo += "📦BoxOffice : " + imdbData.BoxOffice + "\n";
    imdbInfo += "🏙️Production : " + imdbData.Production + "\n";
    imdbInfo += "🌟score : " + imdbData.imdbRating + "\n";
    imdbInfo += "❎imdbVotes : " + imdbData.imdbVotes + "";

    zk.sendMessage(dest, {
      image: {
        url: imdbData.Poster,
      },
      caption: imdbInfo,
    }, {
      quoted: ms,
    });
  } catch (error) {
    repondre("An error occurred while searching IMDb.");
  }
});

zokou({
  nomCom: "emomix",
  categorie: "Conversion"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre,ms , nomAuteurMessage } = commandeOptions;

  if (!arg[0] || arg.length !== 1) {
    repondre("Incorrect use. Example: .emojimix 😀;🥰");
    return;
  }

  // Divisez la chaîne en deux emojis en utilisant le point-virgule comme séparateur
  const emojis = arg.join(' ').split(';');

  if (emojis.length !== 2) {
    repondre("Please specify two emojis using a ';' as a separator.");
    return;
  }

  const emoji1 = emojis[0].trim();
  const emoji2 = emojis[1].trim();

  try {
    const axios = require('axios');
    const response = await axios.get(`https://levanter.onrender.com/emix?q=${emoji1}${emoji2}`);

    if (response.data.status === true) {
      // Si la requête a réussi, envoyez l'image résultante
      
      let stickerMess = new Sticker(response.data.result, {
        pack: nomAuteurMessage,
        type: StickerTypes.CROPPED,
        categories: ["🤩", "🎉"],
        id: "12345",
        quality: 70,
        background: "transparent",
      });
      const stickerBuffer2 = await stickerMess.toBuffer();
      zk.sendMessage(dest, { sticker: stickerBuffer2 }, { quoted: ms });

    } else {
      repondre("Unable to create emoji mix.");
    }
  } catch (error) {
    repondre("An error occurred while creating the emoji mix." + error );
  }
});

zokou({
  nomCom: "elitechwiz",
  categorie: "Ai",
  reaction: "🤖"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, ms } = commandeOptions;
  
  if (!arg || arg.length === 0) {
    repondre("Please provide a question or prompt for ChatGPT.\n*Example: .gpt What is artificial intelligence?*");
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY; // Make sure to set this in your environment variables
  
  if (!apiKey) {
    repondre("OpenAI API key is not configured. Please set the OPENAI_API_KEY environment variable.");
    return;
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [{
          role: "user",
          content: arg.join(" ")
        }],
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const answer = response.data.choices[0].message.content.trim();
    
    let message = `🤖 *ChatGPT Response*\n\n`;
    message += `*Question:* ${arg.join(" ")}\n\n`;
    message += `*Answer:* ${answer}`;
    
    repondre(message);
  } catch (error) {
    console.error('ChatGPT API error:', error);
    repondre("❌ An error occurred while getting a response from ChatGPT. Please try again later.");
  }
});

// Map to store messages for anti-delete feature
const messageStore = new Map();
let antiDeleteEnabled = new Map(); // Changed to Map to store per-chat settings

zokou({
  nomCom: "antidelete",
  categorie: "Group",
  reaction: "🔄"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, msgId } = commandeOptions;

  if (!arg[0]) {
    repondre("Please specify 'on' or 'off' to enable/disable anti-delete feature.");
    return;
  }

  const action = arg[0].toLowerCase();
  const chatId = dest; // This works for both group and private chats

  if (action === 'on') {
    antiDeleteEnabled.set(chatId, true);
    repondre("✅ Anti-delete feature has been enabled in this chat. Deleted messages will be reposted.");
  } else if (action === 'off') {
    antiDeleteEnabled.delete(chatId);
    // Clear stored messages for this chat
    for (const [key, value] of messageStore.entries()) {
      if (value.from === chatId) {
        messageStore.delete(key);
      }
    }
    repondre("❌ Anti-delete feature has been disabled in this chat.");
  } else {
    repondre("Invalid option. Please use 'on' or 'off'.");
  }
});

// Message handler for storing messages
zk.ev.on('messages.upsert', async ({ messages }) => {
  for (const message of messages) {
    const chatId = message.key.remoteJid;
    
    // Only store if anti-delete is enabled for this chat
    if (antiDeleteEnabled.has(chatId) && message.message) {
      // Store message with key as the message ID
      messageStore.set(message.key.id, {
        message: message.message,
        from: chatId,
        participant: message.key.participant || message.key.remoteJid,
        type: chatId.endsWith('@g.us') ? 'group' : 'private'
      });
      
      // Remove message after 1 hour to prevent memory overload
      setTimeout(() => {
        messageStore.delete(message.key.id);
      }, 60 * 60 * 1000);
    }
  }
});

// Message delete handler
zk.ev.on('messages.delete', async (message) => {
  // Check if it's a single message delete or multiple
  const messageIds = Array.isArray(message.keys) ? message.keys : [message];

  for (const msgKey of messageIds) {
    const deletedMessage = messageStore.get(msgKey.id);
    
    if (deletedMessage && antiDeleteEnabled.has(deletedMessage.from)) {
      const isGroup = deletedMessage.type === 'group';
      const sender = deletedMessage.participant;
      
      let caption = `⚠️ *Anti-Delete Detection*\n\n`;
      
      if (isGroup) {
        caption += `• From: @${sender.split('@')[0]}\n`;
        caption += `• Chat: Group\n`;
      } else {
        caption += `• Chat: Private\n`;
      }
      caption += `• Action: Message Deleted\n\n`;
      caption += `*Original Message:*`;

      try {
        // Resend the deleted message
        await zk.sendMessage(deletedMessage.from, {
          forward: deletedMessage.message,
          caption: caption,
          mentions: isGroup ? [sender] : []
        });
      } catch (error) {
        console.error('Error resending deleted message:', error);
      }

      // Remove from storage
      messageStore.delete(msgKey.id);
    }
  }
});

