require('dotenv').config();
const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 4000;

connectToMongo();

app.use(express.json());
app.use(cors());

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/users'));

app.listen(port, () => {
    console.log(`TaskTrack backend listening on http://localhost:${port}`);
});
