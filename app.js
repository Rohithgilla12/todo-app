var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();

//setting up template engine
app.set('view engine','ejs');

//static files
app.use(express.static(__dirname + '/public'));

//fireControllers
todoController(app);

//port
app.listen(3000);