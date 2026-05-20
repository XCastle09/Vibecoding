# Tasks – Four‑Player Tic‑Tac‑Toe (4×4) with Rooms & Ranking

## Phase 0: Create Specifications (Vibe Coding – documentation first)
- [x] Write `AGENTS.md` – instructions for the AI agent (coding rules, workflow).  
- [x] Write `spec.md` – functional and non‑functional requirements, acceptance criteria.  
- [x] Write `plan.md` – technical architecture, algorithms, data structures, socket events.  
- [x] Write `tasks.md` – this task list (breakdown of work for the agent).  

## Phase 1: Backend & Core Game Logic (AI agent follows the specs)
- [x] Set up Express server with Socket.IO.  
- [x] Implement room creation (random 6‑char code).  
- [x] Implement joining room (max 4 players).  
- [x] Implement 4×4 board state.  
- [x] Implement win detection (4 in row / column / diagonal).  
- [x] Implement draw detection.  
- [x] Implement turn switching (X → O → ▿ → ⚫).  
- [x] Add ranking (wins per player in room, stored in memory).  
- [x] Add reset game event (clears board, keeps ranking).  
- [x] Add reset ranking event (zeroes all wins).

## Phase 2: Frontend UI (AI agent follows the specs)
- [x] Create `public/index.html` with responsive CSS.  
- [x] Build lobby screen (create room / join room).  
- [x] Build game screen (4×4 board, turn info, ranking table).  
- [x] Connect to Socket.IO and handle all server events.  
- [x] Highlight current player in ranking table.  
- [x] Display user badge (your name + symbol in corner).  
- [x] Handle errors (full room, invalid moves, out of turn).  

## Phase 3: Polish & Bug Fixes
- [x] Fix bug: 4th player couldn't move (playersList not updated on client).  
- [x] Ensure win increments only once per game.  
- [x] Test with 4 local tabs – all moves sync correctly.  
- [x] Improve visual feedback (win highlight, turn border).  
- [x] Add leave room handling (warning and game stop).  

## Phase 4: Delivery & Final Verification
- [x] Write `README.md` (project description, setup, deployment).  
- [x] Push all code and documentation to GitHub.  
- [ ] Add automated tests (future improvement – not required for submission).  

## Current Status
✅ **All core features complete.** The game is fully playable with 4 players.  
⚠️ Known limitation: ranking resets on server restart (by design – no database).  
📦 Ready for deployment on Render / Railway / Glitch.

## Next Steps (optional)
- Deploy to a free cloud platform.  
- Add persistent storage (SQLite / PostgreSQL) for permanent rankings.  
- Implement spectator mode.  
- Add audio/video chat integration.