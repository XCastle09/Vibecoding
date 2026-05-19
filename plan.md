# Technical Plan – Four‑Player Tic‑Tac‑Toe (4×4) with Rooms & Ranking

## Architecture
- **Backend**: Node.js + Express (web server) + Socket.IO (real‑time events).  
- **Frontend**: Single HTML page (vanilla JS, no frameworks).  
- **Storage**: In‑memory `Map` of rooms (`roomId` → room object).  
- **No database** – ranking is volatile (resets on server restart).

## Data Structures

### Room object
```js
{
  id: string,               // 6-character room code
  players: Map,             // socketId -> { name, symbol, wins }
  board: 4x4 array,         // 2D array of strings ('', 'X', 'O', '▿', '⚫')
  currentTurn: number,      // 0..3 index in symbolsOrder
  gameActive: boolean,      // true when game is in progress
  winner: string | null,    // winner symbol or null
  draw: boolean             // true if draw
}

### Symbols order
['X', 'O', '▿', '⚫']

## Key Algorithms
### Win detection (4 in a row)
Check after each move:

Horizontal: any row with 4 identical non‑empty symbols.

Vertical: any column with 4 identical symbols.

Diagonal \: top‑left to bottom‑right, positions (r,c) with r=c offsets.

Diagonal /: top‑right to bottom‑left, positions (r, c) where r + c = constant.

### Turn switching
js
currentTurn = (currentTurn + 1) % 4;
### Room lifecycle
Create room – generate random 6‑char code, create empty room, first player gets 'X'.

Join room – assign next symbol in order ['X','O','▿','⚫'].

Start game – when players.size === 4, set gameActive = true, currentTurn = 0.

Make move – validate turn, update board, check win/draw, switch turn.

End game – if win, increment winner's wins, set gameActive = false.

Reset game – clear board, reset turn, keep players and wins.

Reset ranking – set all wins to 0.

## Socket Events (client ↔ server)
Event	Direction	Payload	Description
createRoom	client → server	{ playerName }	Returns { roomId, symbol }
joinRoom	client → server	{ roomId, playerName }	Returns { roomId, symbol } or error
makeMove	client → server	{ roomId, row, col }	Validates and processes move
resetGame	client → server	{ roomId }	Clears board, keeps ranking
resetRanking	client → server	{ roomId }	Zeroes wins for all players
roomUpdate	server → client	{ players, playerCount, gameActive, warning? }	Updates lobby status
gameStarted	server → client	{ board, currentTurn, players, turnSymbol }	Starts the game for all 4
moveMade	server → client	{ board, currentTurn, turnSymbol, nextPlayerName }	Updates board and turn
gameOver	server → client	{ winnerSymbol, winnerName, board, players }	Announces winner
gameDraw	server → client	{ board, players }	Announces draw
gameReset	server → client	{ board, currentTurn, turnSymbol, players }	Resets board after manual reset
rankingReset	server → client	{ players }	Updates ranking table after reset
## Frontend Logic
Lobby screen – input name, create/join room.

Game screen – 4×4 board, turn indicator, ranking table, action buttons.

Socket listeners – handle all server events and update UI.

User identification – highlight current player in ranking, show badge in corner.

Move handling – only when gameActiveLocal && myTurn && cell empty.

## Deployment
Use process.env.PORT (default 3000).

Serve static files from public/ directory.

For cloud hosting (Render, Railway, Glitch), set start command: node server.js.

## Testing Plan
Manual testing with 4 browser tabs/incognito windows.

Win patterns – test all 4‑in‑row variants (horizontal, vertical, diagonal).

Edge cases – full room, disconnect during game, invalid moves, draw condition.

Ranking – verify wins increment only once per game, reset works.

Concurrency – create multiple rooms simultaneously.

Known Limitations
Ranking is in‑memory – resets after server restart (by design).

No persistent storage – a database (SQLite/PostgreSQL) would be required for permanent rankings.

Players must have exactly 4 – game does not start with fewer.