const mongoose = require('mongoose');
const dns = require('dns');
const dotenv = require('dotenv');

dotenv.config();
dns.setServers(
    [
      '1.1.1.1',
      '8.8.8.1'
    ]
);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        console.log('Mongoose DB Connected successfully !!');

    } catch (error) {
        console.log('Mongoose connection failed', error);
        process.exit(1);
    }
}

module.exports = connectDB;