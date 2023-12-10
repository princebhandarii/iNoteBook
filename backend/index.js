const connectTOMongo = require('./db');
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

connectTOMongo();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Create an HTTP server
const server = http.createServer(app);

// Attach Socket.io to the HTTP server
const io = socketIo(server, {
  cors: {
    origin: 'https://inotebook-6pk4.onrender.com', // Replace with your actual frontend app URL
    credentials: true,
  },
});

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });

  // Additional WebSocket logic goes here

  // Example: Broadcasting a message to all connected clients
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

// Listen on the specified port
server.listen(port, () => {
  console.log(`iNoteBook Backend listening on port http://localhost:${port}`);
});
