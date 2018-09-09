var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://test:test1234@ds251112.mlab.com:51112/todo-gills');

// Create Schema : It is like a blueprint

var todoSchema = new mongoose.Schema({
    item : String
});

var Todo = mongoose.model('Todo',todoSchema);

// var data=[
//     {
//         item:'Learn Node Js'
//     },
//     {
//         item:'Learn Vue Js'
//     },
//     {
//         item:'Learn MEAN'
//     }
// ];
var urlencodedParser = bodyParser.urlencoded({ extended: false });
module.exports=function(app){

    app.get('/todo',function(req,res){
        // get data from mongo db and pass in the view
        Todo.find({},function(err,data){
            if (err) throw err;
            res.render('todo',{todos:data});
        });
    });

    app.post('/todo',urlencodedParser,function(req,res){
        var newTodo = Todo(req.body).save(function(data,err){            
            res.json(data);
        });
    });

    app.delete('/todo/:item',function(req,res){
        Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
            if (err) throw err;
            res.json(data);
        });
    });
};