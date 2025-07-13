# ★ ROBBIEJR V2 ★ - WhatsApp Bot

![Banner](https://i.imgur.com/your-banner.png) *(Optional: Add a cool banner image link)*

A feature-rich WhatsApp bot built with `@open-wa/wa-automate` for Termux or Node.js.

## 🌟 Features

### Core Commands
- `!menu` - Show all commands  
- `!bughost` - Bug host info  
- `!file` - Send HTTP Custom config  

### New Additions
- **Fun**  
  `!joke` - Random jokes | `!meme [text]` - Meme generator  
- **Tools**  
  `!calc [expression]` - Calculator | `!qr [text]` - QR code generator  
- **APIs**  
  `!weather [city]` - Weather lookup | `!wiki [query]` - Wikipedia search  
- **Admin**  
  `!broadcast [msg]` - (Admins only) | `!kick @user` - Kick from group  
- **Utility**  
  `!uptime` - Bot uptime | `!transcribe` - Voice-to-text  

## 🛠️ Setup

### 1. Install Dependencies
```bash
pkg update -y && pkg upgrade -y
pkg install nodejs git python clang make -y
npm install -g npm@latest