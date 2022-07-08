const mongoose = require('mongoose');

const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes.js");
const config = require('./config/config')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes)

// This if is used to connect to the database only if we are not running within test cases in Mocha
if (!module.parent) {

    mongoose.connect(config.mongo.uri, {
        useNewUrlParser: true
    })
    .then(() => console.log('connection successful'))
    .catch((err) => {console.error(err); process.exit(1)});
    const db = mongoose.connection;

    //db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("Connected to DB");
    });

    var server = app.listen(config.port, function () {
        console.log(`app running on port: ${server.address().port}`);
    });
}
