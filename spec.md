# Specification – Four‑Player Tic‑Tac‑Toe (4x4) with Rooms & Ranking

## 1. Project Goal
Build a **real‑time multiplayer web game** where four players can play Tic‑Tac‑Toe on a **4×4 board**.  
The game must support **rooms** (each room is a separate game instance) and **player ranking** inside the room.

## 2. User Persona
- Casual gamers who want to play with exactly three friends online.  
- No registration – just a nickname and a room code.

## 3. Required Scenarios
- **Create room** – one player becomes the host, gets a unique 6‑character room code.  
- **Join room** – three other players enter the code and their names.  
- **Game start** – automatically when 4 players are present.  
- **Turn‑based play** – fixed order: X → O → ▿ → ⚫.  
- **Win detection** – any line of 4 identical symbols horizontally, vertically, or diagonally.  
- **Ranking** – winner gets +1 point; table sorted by wins.  
- **Reset game** – clear board, keep ranking.  
- **Reset ranking** – set all wins to 0.  
- **Leave room** – player can leave, game stops for remaining players (warning shown).

## 4. In Scope
- 4×4 board with win condition (4 in a row).  
- Rooms with unique 6‑character codes.  
- Real‑time WebSocket synchronization.  
- Player names editable in the ranking table.  
- Visual indication of current turn and player identity.  
- Responsive design (mobile/desktop).

## 5. Errors & Edge Cases
- Trying to join a full room → error message.  
- Trying to make a move out of turn → blocked.  
- Player disconnects during game → game stops, warning displayed.  
- Win / draw detection works immediately.

## 6. Out of Scope
- Persistent leaderboard across server restarts.  
- Bots or AI players.  
- Authentication or user accounts.  
- Voice chat or external communication.  
- Spectator mode.

## 7. Non‑functional Requirements
- **Performance** – board updates within 200 ms.  
- **Concurrency** – supports multiple rooms simultaneously.  
- **Reliability** – handles disconnections gracefully.  
- **Usability** – clear turn indicator, error messages.

## 8. Acceptance Criteria
- [ ] Four people can join the same room using a code.  
- [ ] Game starts automatically when fourth player joins.  
- [ ] Players can only move on their turn.  
- [ ] Winning line is highlighted.  
- [ ] Winner’s win count increments.  
- [ ] Ranking table updates instantly for all.  
- [ ] “New Game” button resets board (ranking unchanged).  
- [ ] “Reset Ranking” button zeroes all wins in the room.  
- [ ] Player name editing is reflected everywhere.  
- [ ] Leaving room shows warning to remaining players.