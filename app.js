// modulos
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

// configs
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}));

// Rutas
app.use(require('./routes/rutas'));
const db = require('./config/db');

//check connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('Connected to Database!'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/menu.html')
})

app.get('/prueba', (req, res) => {
    res.render('pages/prueba')
})

app.listen(port, () => console.log('Server running!'));
