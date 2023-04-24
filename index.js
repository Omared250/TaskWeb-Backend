const express = require('express');

// create express server
const app = express();

// Routes
app.get('/', (req, res) => {
    res.json({
        ok: true
    })
});

// listen petitions
app.listen(4000, () => {
    console.log(`Server running at port ${ 4000 }`);
})