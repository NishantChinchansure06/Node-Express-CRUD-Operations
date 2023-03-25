const mongoose = require('mongoose');

const connectToDatabse = async() => {
    try{
        const connect = await mongoose.connect(process?.env?.MONGODB_CONNECTION_STRING);
        console.log('Database Connected ', connect.connection.host);
    } catch (err) {
        console.log("ERROR: ",err );
        process.exit(1);
    }
}

module.exports = connectToDatabse;