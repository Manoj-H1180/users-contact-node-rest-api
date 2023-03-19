const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.mongoUrl)
        console.log("DataBase Connected", connect.connection.host, connect.connection.name);
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

module.exports = connectDb