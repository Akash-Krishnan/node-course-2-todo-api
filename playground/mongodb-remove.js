var {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');
var {User} = require('./../server/models/user');

var {ObjectID} = require('mongodb');

// Todo.remove({}).then((result) => {
// 	console.log(result);
// });

Todo.findByIdAndRemove('59fdaafe234b654460c1747b').then((todo) => {
	console.log(todo);
});