const Express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const App = Express();

// parse application/x-www-form-urlencoded
App.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
App.use(bodyParser.json())

Express.static('static');

App.use('/', (req, res) => {
    res.sendFile('/static/index.html',{root:__dirname});
});

const port = 5000;

App.listen(port);

console.log(`Server started on ${port}`);