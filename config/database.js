const mongoose = require('mongoose');

// connection to mongodb
const db = () => mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    console.log("connection stablished");
})
.catch((error)=> {
    console.log('Error connecting to MongoDB', error);   
});

module.exports = db;