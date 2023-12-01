const connectTOMongo = require('./db');
const express = require('express')
var cors=require('cors')

connectTOMongo();
const app = express()
const port = 5000
app.use(express.json())


app.use(cors())
app.use(express.json())
//availabel Routes

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`iNoteBook Backend listening on port https://inotebook-6pk4.onrender.com:${port}`)
  
})
