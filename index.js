const express = require('express');
require('dotenv').config();
const db = require('./config/database');

const app = express();
//middleware 
app.use(express.json());

const port = process.env.PORT || 4000;


//routes
app.use('/api', require('./routes/userRoutes'));
app.use('/api', require('./routes/authRoutes'));

app.get('/', (req, res) => {
    return res.send('Bienvenidos a mi aplicacion de tareas');
});

app.get('*', (req, res) => {
    return res.status(404).send('404 route not found');
});

db()
    .then(() => {
app.listen(port, () => {
    console.log("server is running: " + port
    )})})
    .catch((error) => {
        console.log('error conecting to mongodb', error);
    });