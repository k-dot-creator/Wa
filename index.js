const { create, Client } = require('@open-wa/wa-automate');
const axios = require('axios'); // For API commands (weather/wiki)

// Configuration
const CONFIG = {
  SESSION_ID: "ROBBIEJR_SESSION",
  ADMINS: ["254115258178@c.us"], 
};

const WEATHER_API_KEY = "a92660fe0fde4339b68102016250904";

// Weather Command (Fixed Template Literals)
if (message.body.startsWith('!weather')) {
  const location = message.body.slice(8).trim();
  if (!location) {
    return client.sendText(message.from, "❌ Please specify a location. Example: `!weather Bungoma Kenya`");
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(location)}&aqi=no`;
  
  try {
    const response = await axios.get(url);
    const { location: loc, current } = response.data;
    
    await client.sendText(message.from, `
🌦️ *Weather for ${loc.name}, ${loc.country}* (${loc.localtime})
🌡️ *Temperature*: ${current.temp_c}°C (Feels like ${current.feelslike_c}°C)
💧 *Humidity*: ${current.humidity}%
🌬️ *Wind*: ${current.wind_kph} km/h (${current.wind_dir})
    `);
  } catch (error) {
    await client.sendText(message.from, "❌ Failed to fetch weather. Check the location or try later.");
  }
}

// Pairing Code Setup (Keep This As-Is)
create({
  sessionId: CONFIG.SESSION_ID,
  authTimeout: 120,
  qrTimeout: 0,
  usePairingCode: true,
  pairingOptions: {
    phoneNumber: "254115258178", // Kenyan number example
    pushName: "ROBBIEJR-BOT"
  }
}).then((client) => {
  console.log("Pairing code generated! Check terminal.");
  start(client);
}).catch((err) => console.error("Bot failed to start:", err));

// Bot Logic
function start(client) {
  client.onMessage(async (message) => {
    const sender = message.sender.pushname || message.sender.formattedName;
    const isAdmin = CONFIG.ADMINS.includes(message.sender.id);

    // 1. Core Commands
    if (message.body.toLowerCase() === '!menu') {
      await client.sendText(message.from, `
 *『★ ROBBIEJR V1 ★』
⚡ WEB OF UNLIMITED ⚡* 

🔹 _Core_
!menu - Show this menu
!bughost - Bug host info
!file - Send HTTP Custom config

🔹 _Fun_
!joke - Random joke
!meme [text] - Meme generator

🔹 _Tools_
!calc [math] - Calculator
!qr [text] - QR code
!weather [city] - Weather
!wiki [query] - Wikipedia

🔹 _Admin_ ${isAdmin ? "(You are admin)" : ""}
!broadcast [msg] - Broadcast to all
!kick @user - Kick from group

🔹 _Utility_
!uptime - Bot uptime
!transcribe - Voice to text
      `);
    }

    if (message.body.toLowerCase() === '!bughost') {
      await client.sendText(message.from, '🐞 *BUG HOSTS*\n- www.robbiejr.net\n- sni.roblox.com');
    }

    if (message.body.toLowerCase() === '!file') {
      await client.sendFile(message.from, './files/sample.hc', 'config.hc', '📁 HTTP Custom Config:');
    }

    // 2. New Commands

    if (message.body === '!joke') {
      const jokes = ["Why don’t skeletons fight? They don’t have the guts!", "What’s orange and sounds like a parrot? A carrot!"];
      await client.sendText(message.from, `😂 Joke: ${jokes[Math.floor(Math.random() * jokes.length)]}`);
    }

    if (isAdmin && message.body.startsWith('!broadcast')) {
      const msg = message.body.replace('!broadcast ', '');
      await client.sendText(message.from, `📢 *Broadcast sent*: "${msg}"`);
    }

    // Add other commands here following the same pattern...
  });

  // Log bot events
  client.onAnyMessage((msg) => console.log(`New message from ${msg.sender.pushname}: ${msg.body}`));
  console.log("Bot is running! Use pairing code to link WhatsApp.");
}