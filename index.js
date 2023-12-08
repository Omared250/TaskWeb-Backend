require('newrelic');
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

// listen petitions
app.listen( process.env.PORT, () => {
<<<<<<< HEAD
    console.log(`Server running at port ${ 4000 }`);
})
=======
    console.log(`Server running at port ${ process.env.PORT }`);
})
>>>>>>> 0c2326de4e17500b168e35669f6b47b8097991da
