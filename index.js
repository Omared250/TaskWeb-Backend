const express = require('express');
require('dotenv').config();

// create express server
const app = express();

// public directory
app.use( express.static('public') );

// Read and Parse fo the body
app.use( express.json() );

// Routes
app.use('/api/auth', require('./routes/auth'));

// listen petitions
app.listen( process.env.PORT, () => {
    console.log(`Server running at port ${ 4000 }`);
})