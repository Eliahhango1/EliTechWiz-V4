const { zokou } = require("../framework/zokou");
const axios = require('axios');
const ytSearch = require('yt-search');
const conf = require(__dirname + '/../set');

// Define the command with aliases for play
zokou({
  nomCom: "play",
  aliases: ["song", "playdoc", "audio", "mp3"],
  categorie: "Search",
  reaction: "🎵"
}, async (dest, zk, commandOptions) => {
  const { arg, ms, repondre } = commandOptions;

  if (!arg[0]) {
    return repondre("*Please provide a song name!*\n\nExample: .play Unstoppable");
  }

  const query = arg.join(" ");
  
  try {
    // First send a processing message
    await repondre(`*🎵 Searching for:* ${query}`);

    // Search for the video
    const searchResults = await ytSearch(query);
    
    if (!searchResults?.videos?.length) {
      return repondre('❌ No songs found for your search.');
    }

    const video = searchResults.videos[0];
    const videoUrl = video.url;

    // Latest working APIs as of 2024
    const apis = [
      `https://api.cafirexos.com/api/ytmp3?url=${encodeURIComponent(videoUrl)}`,
      `https://api.cafirexos.com/api/v1/ytmp3?url=${encodeURIComponent(videoUrl)}`,
      `https://api.ibeng.tech/api/download/ytmp3?url=${encodeURIComponent(videoUrl)}&apikey=tamvan`,
      `https://api.ibeng.tech/api/download/ytmp4?url=${encodeURIComponent(videoUrl)}&apikey=tamvan`,
      `https://vihangayt.me/download/ytmp3?url=${encodeURIComponent(videoUrl)}`,
      `https://vihangayt.me/download/ytmp4?url=${encodeURIComponent(videoUrl)}`
    ];

    // Try each API with proper error handling
    let downloadData = null;
    let error = null;

    for (const api of apis) {
      try {
        const response = await axios.get(api, { 
          timeout: 8000,  // Increased timeout
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        });

        // Check various response formats
        const url = response.data?.url || 
                   response.data?.result?.url || 
                   response.data?.download || 
                   response.data?.result?.download_url || 
                   response.data?.result?.audio || 
                   response.data?.audio_url ||
                   response.data?.link ||
                   response.data?.result?.link;

        if (url) {
          downloadData = {
            success: true,
            result: {
              title: video.title,
              download_url: url,
              thumbnail: video.thumbnail,
              duration: video.duration
            }
          };
          break;
        }
      } catch (err) {
        error = err;
        continue; // Try next API if this one fails
      }
    }

    if (!downloadData?.success) {
      throw new Error('Unable to get download URL. Please try again or try another song.');
    }

    const downloadUrl = downloadData.result.download_url;
    const videoDetails = downloadData.result;

    // Send status message
    await repondre(`*📥 Downloading:* ${videoDetails.title}\n*⏱️ Duration:* ${videoDetails.duration.timestamp || 'N/A'}`);

    // Send as audio with metadata
    const messagePayload = {
      audio: { url: downloadUrl },
      mimetype: 'audio/mpeg',
      fileName: `${videoDetails.title}.mp3`,
      contextInfo: {
        externalAdReply: {
          title: videoDetails.title,
          body: 'EliTechWiz-V4 Music Player',
          mediaType: 1,
          sourceUrl: conf.GURL || videoUrl,
          thumbnailUrl: videoDetails.thumbnail,
          renderLargerThumbnail: true,
          showAdAttribution: true,
        },
      },
    };

    // Send the audio file
    await zk.sendMessage(dest, messagePayload, { quoted: ms });

  } catch (error) {
    console.error('Download error:', error);
    return repondre(`❌ Download failed: ${error.message}\n\nPlease try again or try with a different song.`);
  }
});

// Video download command
zokou({
  nomCom: "video",
  aliases: ["videodoc", "film", "mp4"],
  categorie: "Search",
  reaction: "🎥"
}, async (dest, zk, commandOptions) => {
  const { arg, ms, repondre } = commandOptions;

  if (!arg[0]) {
    return repondre("*Please provide a video name!*\n\nExample: .video Unstoppable");
  }

  const query = arg.join(" ");

  try {
    // First send a processing message
    await repondre(`*🎥 Searching for:* ${query}`);

    const searchResults = await ytSearch(query);
    
    if (!searchResults?.videos?.length) {
      return repondre('❌ No videos found for your search.');
    }

    const video = searchResults.videos[0];
    const videoUrl = video.url;

    // Latest working APIs for video as of 2024
    const apis = [
      `https://api.cafirexos.com/api/ytmp4?url=${encodeURIComponent(videoUrl)}`,
      `https://api.cafirexos.com/api/v1/ytmp4?url=${encodeURIComponent(videoUrl)}`,
      `https://api.ibeng.tech/api/download/ytmp4?url=${encodeURIComponent(videoUrl)}&apikey=tamvan`,
      `https://vihangayt.me/download/ytmp4?url=${encodeURIComponent(videoUrl)}`
    ];

    // Try each API with proper error handling
    let downloadData = null;
    let error = null;

    for (const api of apis) {
      try {
        const response = await axios.get(api, { 
          timeout: 8000,  // Increased timeout
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        });

        // Check various response formats
        const url = response.data?.url || 
                   response.data?.result?.url || 
                   response.data?.download || 
                   response.data?.result?.download_url ||
                   response.data?.link ||
                   response.data?.result?.link;

        if (url) {
          downloadData = {
            success: true,
            result: {
              title: video.title,
              download_url: url,
              thumbnail: video.thumbnail,
              duration: video.duration
            }
          };
          break;
        }
      } catch (err) {
        error = err;
        continue; // Try next API if this one fails
      }
    }

    if (!downloadData?.success) {
      throw new Error('Unable to get download URL. Please try again or try another video.');
    }

    const downloadUrl = downloadData.result.download_url;
    const videoDetails = downloadData.result;

    // Send status message with duration
    await repondre(`*📥 Downloading:* ${videoDetails.title}\n*⏱️ Duration:* ${videoDetails.duration.timestamp || 'N/A'}`);

    // Send as video with metadata
    const messagePayload = {
      video: { url: downloadUrl },
      mimetype: 'video/mp4',
      fileName: `${videoDetails.title}.mp4`,
      caption: `*🎥 ${videoDetails.title}*\n\nDownloaded by EliTechWiz-V4`,
      contextInfo: {
        externalAdReply: {
          title: videoDetails.title,
          body: 'EliTechWiz-V4 Video Player',
          mediaType: 1,
          sourceUrl: conf.GURL || videoUrl,
          thumbnailUrl: videoDetails.thumbnail,
          renderLargerThumbnail: true,
          showAdAttribution: true,
        },
      },
    };

    // Send the video
    await zk.sendMessage(dest, messagePayload, { quoted: ms });

  } catch (error) {
    console.error('Download error:', error);
    return repondre(`❌ Download failed: ${error.message}\n\nPlease try again or try with a different video.`);
  }
});
