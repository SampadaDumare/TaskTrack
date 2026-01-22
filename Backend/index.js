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

// Serve frontend build folder
// Make sure your frontend is built using `npm run build` inside frontend folder
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Catch-all route to handle React Router refreshes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(port, ()=>{
    console.log(`TaskTrack backend is listning on port http://localhost:${port}`);
})