const connectTOMongo = require('./db');
const express = require('express');
const cors = require('cors');
const http = require('http');
const socket = require('socket.io');
const path = require('path');

connectTOMongo();
const app = express();

// Use process.env.PORT as the port or fallback to 5000
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
const io = socket(server, {
  cors: {
    origin: 'https://inotebook-6pk4.onrender.com', // Update this with your frontend app's URL
    credentials: true,
  },
});

global.onlineUsers = new Map();

// WebSocket connection handling
io.on('connection', (socket) => {
  global.chatSocket = socket;

  // Login user ID stored
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  // Receive message
  socket.on('send-msg', (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-receive', data.message);
    }
  });
});

// Listen on the specified port
server.listen(port, () => {
  console.log(`iNoteBook Backend listening on port http://localhost:${port}`);
});
