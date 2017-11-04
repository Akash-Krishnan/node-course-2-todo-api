var {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');
var {User} = require('./../server/models/user');

var {ObjectID} = require('mongodb');
// var id = '59fc5e3938581c10f816060c';

// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	console.log('Todos ', todos);
// });

// Todo.findOne({
// 	_id: id
// }).then((todo) => {
// 	console.log('Todo ', todo);
// });

// Todo.findById(id).then((todo) => {
// 	if(!todo) {
// 		return console.log('Id not found');
// 	}
// 	console.log('Todo by id ',todo);
// }).catch((err) => console.log(err));

var id = '59fbf825588e9c05fcb7c234aaa';

User.findById(id).then((user) => {
	if(!user) {
		return console.log('Id not found');
	} else if(!ObjectID.isValid(id)) {
		return console.log('Enter valid ID');
	} else {
		console.log('User: ', user);
	}
}).catch((e) => console.log('Enter valid id'));