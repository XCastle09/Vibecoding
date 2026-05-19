# AGENTS.md – Guidelines for AI Agents

This repository contains a **Four‑Player Tic‑Tac‑Toe (4×4)** web game with rooms and ranking.  
When contributing or analyzing the code, please follow these rules:

## Project Structure
- `server.js` – Node.js + Express + Socket.IO backend  
- `public/index.html` – frontend (vanilla HTML/CSS/JS)  
- `docs/` – specifications (this file + `spec.md`, `plan.md`, `tasks.md`)  
- `.gitignore` – excludes `node_modules/` and `package-lock.json`

## Development Principles
- Use **functional programming** style where possible (pure functions, immutability).  
- Always create a **solution plan** before implementing changes.  
- Keep `server.js` minimal; separate concerns (game logic, room management, networking).  
- Write **self‑documenting code**; add comments only for complex logic.  
- If you find technical debt, document it in a separate file `docs/technical-debt.md`.  
- After any change, **launch the app locally** and verify with 4 players.

## Agent Workflow
1. Read `spec.md` to understand requirements.  
2. Read `plan.md` to see technical decisions.  
3. Check `tasks.md` for open tasks.  
4. Implement changes step by step.  
5. Update `tasks.md` with status (`[x]` for completed).  
6. Test thoroughly before committing.

## Code Style
- Backend: CommonJS, async/await, consistent error handling.  
- Frontend: ES6, event listeners, no external frameworks.  
- Use 2 spaces indentation, meaningful variable names.

## Running the Project
```bash
npm install express socket.io
node server.js
# then open http://localhost:3000