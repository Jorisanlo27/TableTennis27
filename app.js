// modulos
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// configs
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}));

// database connection
// mongoose.set('useCreateIndex', true);
// mongoose.connect('mongodb+srv://admin:admin@cluster0.fly6v.mongodb.net/proyectoFinalJorgeDB?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

// const db = mongoose.connection
// db.on('error', (err) => console.log(err))
// db.once('open', () => console.log('Connected to Database'))

// Rutas
app.use(require('./routes/rutas'));
const db = require('./config/db');

//check connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('Connected to Database!'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/menu.html')
})

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
