const connectTOMongo = require('./db');
const express = require('express')
var cors=require('cors')
var path = require('path')
require('dotenv').config();
const socket = require('socket.io');
const morgan = require('morgan');

connectTOMongo();
const app = express()
//const port = 5000
const port = process.env.REACT_APP_PORT || 5000;
app.use(express.json())


app.use(cors())
app.use(express.json())
server.use(morgan('dev'));

//availabel Routes
server.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

server.set("view engine", "ejs");

/// static file start
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
async function main(){
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Database connected');
}

// Create an http.Server instance using the Express server
const httpServer = http.createServer(server);

// Attach socket.io to the http.Server instance
const io = socket(httpServer, {
    cors: {
        origin: 'https://metaverse-zpva.onrender.com',
        credentials: true
    }
});

global.onlineUsers = new Map();

// connection
io.on('connection', (socket) => {
    global.chatSocket = socket;
    //login user id stored
    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    // recieve msg
    socket.on('send-msg', (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit('msg-recieve', data.message);
        }
    });
});


httpServer.listen(process.env.PORT, () => {
    console.log('Server started');
});
