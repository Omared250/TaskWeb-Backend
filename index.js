require('newrelic')
const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

// create express server
const app = express();

// DataBase
dbConnection();

// CORS
app.use(cors());

// public directory
app.use( express.static('public') );

// Read and Parse fo the body
app.use( express.json() );

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/tasks', require('./routes/tasks'));

// listen petitions
app.listen( process.env.PORT, () => {
    console.log(`Server running at port ${ process.env.PORT }`);
})

// This a test to generate a deployment marker in New Relic