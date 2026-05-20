# AGENTS.md – Task for AI Agent: Build a Four‑Player Tic‑Tac‑Toe (4x4) with Rooms & Ranking

You are an AI coding agent. Your goal is to implement a **real‑time multiplayer web game** according to the specifications in `spec.md`, the technical plan in `plan.md`, and the task list in `tasks.md`.

## Mandatory rules

1. **Read `spec.md`, `plan.md`, and `tasks.md` before writing any code.**
2. Follow the **solution plan** strictly – do not add features that are not requested.
3. Use **functional programming** style where possible (pure functions, immutability).
4. Keep `server.js` minimal; separate concerns (game logic, room management, networking).
5. Write self‑documenting code; add comments only for complex logic.
6. If you encounter technical debt, create a separate file `docs/technical-debt.md` and describe it.
7. After finishing **each task** from `tasks.md`, update the task status (`[x]`) and **launch the app** to verify with 4 players.
8. Do **not** commit `node_modules/` or `package-lock.json`.

## Output structure
- `server.js` – Node.js + Express + Socket.IO backend.
- `public/index.html` – frontend (all HTML, CSS, JS in one file).
- `.gitignore` – exclude `node_modules/`, `package-lock.json`.
- All specification files (`AGENTS.md`, `spec.md`, `plan.md`, `tasks.md`) remain in the root.

## Success criteria
- Four players can join a room using a 6‑character code.
- The game starts automatically when the fourth player joins.
- Turns rotate in order: X → O → ▿ → ⚫.
- Win detection works for any line of 4 symbols (horizontal, vertical, diagonal).
- Winner gets +1 point; ranking table updates for all.
- “New Game” resets board, keeps ranking. “Reset Ranking” zeroes all wins.
- Frontend clearly shows whose turn it is and highlights the current player.
- The game is responsive and works on desktop and mobile.

## Notes for the agent
- If anything is unclear, look at `plan.md` for algorithms and data structures.
- Use **Socket.IO** for real‑time communication.
- Ranking is **in‑memory** (no database required).
- The game must work with exactly 4 players – no bots, no fewer players.