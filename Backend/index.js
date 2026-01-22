require('dotenv').config();
const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();
const app = express();
const port = process.env.PORT || 4000;

// for reading req body
app.use(express.json());
app.use(cors());

// available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/users'));

app.listen(port, ()=>{
    console.log(`TaskTrack backend is listning on port http://localhost:${port}`);
})