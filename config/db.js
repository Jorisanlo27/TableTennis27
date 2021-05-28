const config = require('./config')
const mongoose = require('mongoose')

// database connection
mongoose.set('useCreateIndex', true);
mongoose.connect(`${config.db.uri}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

module.exports = db;