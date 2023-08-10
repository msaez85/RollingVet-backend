const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('mongoDB online')
    } catch (error) {
        throw new Error("Error a la hora de iniciar la DB")
    }
}

module.exports = {dbConnection};