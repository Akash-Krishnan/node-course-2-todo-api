require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
var port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
	var todo = new Todo({
		text : req.body.text,
		_creator: req.user._id
	});

	todo.save().then((doc) => {
		res.send(doc);
	}, (err) => {
		res.status(400).send(err);
	});
});

app.get('/todos', authenticate, (req, res) => {
	Todo.find({_creator: req.user._id}).then((todos) => {
		res.send({
			todos
		})
	}, (err) => {
		res.status(400).send(err);
	});
});

app.get('/todos/:id', authenticate, (req, res) => {
	var id = req.params.id;

	if(!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Todo.findOne({
		_id: id,
		_creator: req.user._id 
	}).then((todo) => {
		if(!todo){
			return res.status(404).send();
		}

		res.send({todo});
			 
	}).catch((err) =>{
		res.status(400).send();
	});


});

app.delete('/todos/:id', authenticate, async (req, res) => {
	var id = req.params.id;

	if(!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	//async await
	try {
		var todo = await Todo.findOneAndRemove({
			_id: id,
			_creator: req.user._id	
		});
		if(!todo) {
			return res.status(404).send();
		}
		res.send({todo});
	} catch(e) {
		res.status(400).send();
	}
	

	//Promise chain
	// Todo.findOneAndRemove({
	// 	_id: id,
	// 	_creator: req.user._id	
	// }).then((todo) => {
	// 	if(!todo) {
	// 		return res.status(404).send();
	// 	}

	// 	res.send({todo});

	// }).catch((err) => {
	// 	res.status(400).send();
	// });

});

app.patch('/todos/:id', authenticate, (req, res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);

	if(!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	if(_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findOneAndUpdate({
		_id: id,
		_creator: req.user._id
	}, {$set: body}, {new: true}).then((todo) => {
		if(!todo) {
			return res.status(404).send();
		}

		res.send({todo});

	}).catch((err) => {
		res.status(400).send();
	})
});

app.post('/users', async (req, res) => {
	const body = _.pick(req.body, ['email', 'password']);
	const user = new User(body);

	//Async await
	try{
		await user.save();
		var token = user.generateAuthToken();
		res.header('x-auth', token).send(user);
	} catch(e) {
		res.status(400).send(e);
	}
	

	//Promise chain
	// user.save().then(() => {
	// 	return user.generateAuthToken();
	// }).then((token) =>{
	// 	res.header('x-auth', token).send(user);
	// }).catch((err) => {
	// 	res.status(400).send(err);
	// })

});


app.get('/users/me', authenticate, (req, res) => {
	res.send(req.user);
});

app.post('/users/login', async (req, res) => {
	//Using async await
	try {
		var body = _.pick(req.body, ['email', 'password']);
		var user = await User.findByCredentials(body.email, body.password);
		var token = await user.generateAuthToken();
		res.header('x-auth', token).send(user);
	} catch(e) {
		res.status(400).send();
	}
	
	
	//Using promise chain
	// User.findByCredentials(body.email, body.password).then((user) => {
	// 	return user.generateAuthToken().then((token) => {
	// 		res.header('x-auth', token).send(user);
	// 	});
	// }).catch((e) => {
	// 	res.status(400).send();
	// });

});

app.delete('/users/me/token', authenticate, async (req, res) => {
	try{
		await req.user.removeToken(req.token);
		res.status(200).send();
	} catch(e) {
		res.status(400).send();
	}
});

app.listen(port, () => {
	console.log(`Started listening on port: ${port}`);
});

module.exports = {app}


