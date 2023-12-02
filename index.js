const connectTOMongo = require('./db');
const express = require('express')
var cors=require('cors')
const path = require('path')

connectTOMongo();
const app = express()
const port = 8080
app.use(express.json())


app.use(cors())
app.use(express.json())



//availabel Routes

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

/// static file start
app.use(express.static(path.join(__dirname, '../cilent/build')));
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, '../cilent/build/index.html'));
});


///static file end


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  // console.log(`iNoteBook Backend listening on port http://localhost:5000:${port}`)
   console.log(`iNoteBook Backend listening on port https://inotebook-6pk4.onrender.com:${port}`)
})