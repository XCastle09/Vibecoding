const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

// Хранилище комнат
const rooms = new Map(); // roomId -> { players: Map(socketId, { name, symbol, wins }), gameState, currentTurn, winner, draw, board }

function generateRoomId() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Победа на поле 4x4 (4 в ряд)
function checkWin(board, symbol) {
    const size = 4;
    // горизонтали
    for (let r = 0; r < size; r++) {
        for (let c = 0; c <= size - 4; c++) {
            if (board[r][c] === symbol &&
                board[r][c+1] === symbol &&
                board[r][c+2] === symbol &&
                board[r][c+3] === symbol) return true;
        }
    }
    // вертикали
    for (let c = 0; c < size; c++) {
        for (let r = 0; r <= size - 4; r++) {
            if (board[r][c] === symbol &&
                board[r+1][c] === symbol &&
                board[r+2][c] === symbol &&
                board[r+3][c] === symbol) return true;
        }
    }
    // диагональ \
    for (let r = 0; r <= size - 4; r++) {
        for (let c = 0; c <= size - 4; c++) {
            if (board[r][c] === symbol &&
                board[r+1][c+1] === symbol &&
                board[r+2][c+2] === symbol &&
                board[r+3][c+3] === symbol) return true;
        }
    }
    // диагональ /
    for (let r = 0; r <= size - 4; r++) {
        for (let c = 3; c < size; c++) {
            if (board[r][c] === symbol &&
                board[r+1][c-1] === symbol &&
                board[r+2][c-2] === symbol &&
                board[r+3][c-3] === symbol) return true;
        }
    }
    return false;
}

function isDraw(board) {
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c] === '') return false;
        }
    }
    return true;
}

// Сброс игрового состояния (сохраняет ранги)
function resetGameState(room) {
    room.board = [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', '']
    ];
    room.currentTurn = 0; // индекс игрока в порядке symbols
    room.winner = null;
    room.draw = false;
    room.gameActive = true;
}

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('createRoom', ({ playerName }, callback) => {
        const roomId = generateRoomId();
        const newRoom = {
            id: roomId,
            players: new Map(), // socketId -> { name, symbol, wins }
            board: [
                ['', '', '', ''],
                ['', '', '', ''],
                ['', '', '', ''],
                ['', '', '', '']
            ],
            currentTurn: 0,
            winner: null,
            draw: false,
            gameActive: false, // активна, когда 4 игрока
            symbolsOrder: ['X', 'O', '▿', '⚫']
        };
        rooms.set(roomId, newRoom);
        socket.join(roomId);
        const playerSymbol = newRoom.symbolsOrder[0]; // первому X
        newRoom.players.set(socket.id, { name: playerName, symbol: playerSymbol, wins: 0 });
        callback({ roomId, symbol: playerSymbol, isCreator: true });
        io.to(roomId).emit('roomUpdate', {
            players: Array.from(newRoom.players.values()),
            playerCount: newRoom.players.size,
            gameActive: newRoom.gameActive
        });
    });

    socket.on('joinRoom', ({ roomId, playerName }, callback) => {
        const room = rooms.get(roomId);
        if (!room) {
            callback({ error: 'Комната не найдена' });
            return;
        }
        if (room.players.size >= 4) {
            callback({ error: 'Комната заполнена (4/4)' });
            return;
        }
        const nextIndex = room.players.size;
        const symbol = room.symbolsOrder[nextIndex];
        room.players.set(socket.id, { name: playerName, symbol: symbol, wins: 0 });
        socket.join(roomId);
        callback({ roomId, symbol, isCreator: false });

        // если набралось 4 игрока — запускаем игру
        if (room.players.size === 4) {
            room.gameActive = true;
            room.currentTurn = 0;
            room.winner = null;
            room.draw = false;
            io.to(roomId).emit('gameStarted', {
                board: room.board,
                currentTurn: room.currentTurn,
                players: Array.from(room.players.values()),
                turnSymbol: room.symbolsOrder[room.currentTurn]
            });
        } else {
            io.to(roomId).emit('roomUpdate', {
                players: Array.from(room.players.values()),
                playerCount: room.players.size,
                gameActive: room.gameActive
            });
        }
    });

    socket.on('makeMove', ({ roomId, row, col }, callback) => {
        const room = rooms.get(roomId);
        if (!room) return;
        if (!room.gameActive || room.winner || room.draw) {
            callback({ error: 'Игра уже завершена' });
            return;
        }
        const player = room.players.get(socket.id);
        if (!player) return;
        const currentPlayerIndex = room.currentTurn;
        const currentSymbol = room.symbolsOrder[currentPlayerIndex];
        if (player.symbol !== currentSymbol) {
            callback({ error: 'Сейчас не ваш ход' });
            return;
        }
        if (room.board[row][col] !== '') {
            callback({ error: 'Клетка занята' });
            return;
        }
        // делаем ход
        room.board[row][col] = currentSymbol;

        // проверка победы
        const winnerExists = checkWin(room.board, currentSymbol);
        if (winnerExists) {
            room.gameActive = false;
            room.winner = currentSymbol;
            // начисляем победу игроку
            const winnerPlayer = Array.from(room.players.values()).find(p => p.symbol === currentSymbol);
            if (winnerPlayer) {
                // обновляем win в Map
                for (let [id, p] of room.players.entries()) {
                    if (p.symbol === currentSymbol) {
                        p.wins += 1;
                        room.players.set(id, p);
                        break;
                    }
                }
            }
            io.to(roomId).emit('gameOver', {
                winnerSymbol: currentSymbol,
                winnerName: winnerPlayer?.name,
                board: room.board,
                players: Array.from(room.players.values())
            });
            callback({ success: true, gameEnd: true, winner: currentSymbol });
            return;
        }
        // ничья?
        if (isDraw(room.board)) {
            room.gameActive = false;
            room.draw = true;
            io.to(roomId).emit('gameDraw', { board: room.board, players: Array.from(room.players.values()) });
            callback({ success: true, gameEnd: true, draw: true });
            return;
        }
        // смена хода
        room.currentTurn = (room.currentTurn + 1) % 4;
        io.to(roomId).emit('moveMade', {
            board: room.board,
            currentTurn: room.currentTurn,
            turnSymbol: room.symbolsOrder[room.currentTurn],
            nextPlayerName: Array.from(room.players.values())[room.currentTurn]?.name
        });
        callback({ success: true });
    });

    socket.on('resetGame', ({ roomId }) => {
        const room = rooms.get(roomId);
        if (room && room.players.size === 4) {
            resetGameState(room);
            io.to(roomId).emit('gameReset', {
                board: room.board,
                currentTurn: room.currentTurn,
                turnSymbol: room.symbolsOrder[room.currentTurn],
                players: Array.from(room.players.values())
            });
        }
    });

    socket.on('resetRanking', ({ roomId }) => {
        const room = rooms.get(roomId);
        if (room) {
            for (let [id, p] of room.players.entries()) {
                p.wins = 0;
                room.players.set(id, p);
            }
            io.to(roomId).emit('rankingReset', { players: Array.from(room.players.values()) });
        }
    });

    socket.on('disconnect', () => {
        for (let [roomId, room] of rooms.entries()) {
            if (room.players.has(socket.id)) {
                room.players.delete(socket.id);
                if (room.players.size === 0) {
                    rooms.delete(roomId);
                } else {
                    io.to(roomId).emit('roomUpdate', {
                        players: Array.from(room.players.values()),
                        playerCount: room.players.size,
                        gameActive: false,
                        warning: 'Игрок покинул комнату. Игра остановлена.'
                    });
                    room.gameActive = false;
                }
                break;
            }
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🔥 Сервер запущен на http://localhost:${PORT}`));