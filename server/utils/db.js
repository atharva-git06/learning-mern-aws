const mongoose = require('mongoose');
const { options } = require('../router/auth-router');

// const URI = 'mongodb://127.0.0.1:27017/atharva_mern';
const URI = process.env.MONGODB_URI;


const connectDb = async () => 
    {

        try {
            mongoose.connect(URI);
            console.log('connection successful');
        } catch (error) {
            console.log('error connecting to database');
            process.exit(0);
        }
    };

    module.exports = connectDb;