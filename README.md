# 🎮 Four‑Player Tic‑Tac‑Toe (4x4) with Rooms & Ranking

> A multiplayer Tic‑Tac‑Toe game on a 4×4 board for four players.  
> Create rooms, invite friends, and compete in the ranking.

![Gameplay Preview](https://via.placeholder.com/800x400?text=4+Player+Tic-Tac-Toe)

---

## ✨ Features

- **4×4 board** – win by getting **4 symbols in a row** (horizontal, vertical, or diagonal).
- **Exactly 4 players** – each player gets a unique symbol: `X`, `O`, `▿`, `⚫`.
- **Rooms** – create a room with a unique code and share it with friends.
- **In‑room ranking** – wins are counted, leaderboard updates in real time.
- **WebSocket synchronization** (Socket.IO) – all moves and events are instantly visible.
- **Responsive design** – play comfortably on desktop or mobile.
- **Player highlighting** – your name and symbol are shown in the corner and highlighted in the ranking table.

---

## 🕹️ How to Play

1. One player **creates a room** → gets a code (e.g., `A1B2C3`).
2. The other three **join the same room** using the code.
3. Once 4 players are in, the **game starts automatically**.
4. Turns rotate: `X` → `O` → `▿` → `⚫`.
5. To make a move – **click on an empty cell**.
6. The winner gets **+1 point in the ranking**.
7. You can start a new game with the “New Game” button (ranking persists) or reset the ranking with the dedicated button.

---

## 🛠️ Tech Stack

- **Backend**: Node.js + Express + Socket.IO
- **Frontend**: vanilla HTML, CSS, JavaScript (no frameworks)
- **Storage**: in‑memory ranking per room (no persistence after server restart; localStorage used only for demo player name)

---

## 📦 Local Setup & Run

### Requirements
- Node.js (v14 or higher)
- npm (comes with Node)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/four-player-ttt.git
   cd four-player-ttt
Install dependencies

bash
npm install express socket.io
Start the server

bash
node server.js
Open the game in your browser

Go to http://localhost:3000

Invite friends on the same network using your local IP (e.g., http://192.168.1.10:3000)

🌍 Deployment (online)
You can deploy the game to free hosting services that support WebSockets, such as:

Render (render.com) – easy Node.js deployment

Railway (railway.app)

Glitch (with some limitations)

Make sure your server listens on process.env.PORT (already set up in server.js).

🐛 Known Limitations
The game only works when exactly 4 players are in the room. If someone leaves, the game stops.

The ranking is not saved after server restart – it lives only in memory. For permanent storage, a database would be needed.

No built‑in voice chat – use Discord / Telegram for communication.