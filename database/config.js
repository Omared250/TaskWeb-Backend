const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        mongoose.connect('mongodb://127.0.0.1:27017/test');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error during initializing DB')
    }

};

