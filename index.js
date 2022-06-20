const express = require('express');

const app = express();


//routes
app.get('/', (req, res) => {
    return res.send('Bienvenidos a mi aplicacion de tareas');
});
app.listen(3000, () => {console.log("server is running")});
