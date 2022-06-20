const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 4000;

// connection to mongodb
mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    console.log("connection stablished");
})
.catch((error)=> {
    console.log('Error connecting to MongoDB', error);   
});



//routes
app.get('/', (req, res) => {
    return res.send('Bienvenidos a mi aplicacion de tareas');
});
app.listen(port, () => {console.log("server is running: " + port)});
