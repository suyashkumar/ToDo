/*
server.js 
Server for the basic todo application. 
*/

// Init ======================
//Init express.js
var express=require('express');
var app = express(); 

var mongoose=require('mongoose'); //mongoose for mongodb

var morgan=require('morgan'); //Log requests to the console

var bodyParser = require('body-parser'); //Parse info from POST

var methodOverride=require('method-override'); //simulate DELETE and PUT

mongoose.connect('mongodb://test:test1@ds027751.mongolab.com:27751/todo-test'); //connect to local mongodb database
app.use(express.static(__dirname + '/public')); // This sets local relative links for front end
app.use(morgan('dev')); //Log all requests to console
app.use(bodyParser.urlencoded({"extended":'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

// Create Model
var toDo=mongoose.model('Todo',{text: String, list: String});

//Routes ======================

//Get all ToDos 
app.get('/api/todos/:selList',function(req,res){

	//Get all TODOs using mongoose
	toDo.find({list: req.params.selList},function(err,todos){
		if (err)
			res.send(err);

		res.json(todos); //return all todos in JSON format
	});

});

app.post('/api/todos/:selList',function(req,res){
	// Create a TODO
	toDo.create({
		text : req.body.text,
		list : req.params.selList
	}, function (err,todo){
		if (err)
			res.send(err);
		//Get and return all TODOs after creating a new one
		toDo.find({list: req.params.selList},function(err,todos){
			if(err)
				res.send(err)


			res.json(todos);
		});
	});
});

// Delete a todo
app.delete('/api/todos/:selList/:todo_id',function(req,res){
	console.log('delete called!');
	toDo.remove({_id : req.params.todo_id}, function(err,todo){ //figure out how remove works 
		if (err)
			res.send(err);
		// if not an error in removing then reload list
		toDo.find({list:req.params.selList},function(err,todos){
			if (err)
				res.send(err);

			res.json(todos); //send todos as json 
		});
	});
});

//Send main application page
app.get('*',function(req,res){
	res.sendfile('./public/index.html'); //Angular will handle dynamic content
});

//Listen and start app
var port=process.env.PORT || 9000;
app.listen(port,function(){
	console.log("Listening on port "+port);
});




