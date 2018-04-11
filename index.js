const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static('static'))

app.use('/', (req, res) => {
    res.sendFile('/static/index.html',{root:__dirname});
});

const port = 5000;

app.listen(port);

console.log(`Server started on ${port}`);