var {ObjectID} = require('mongodb');
var jwt = require('jsonwebtoken');

var {Todo} = require('./../../models/todo');
var {User} = require('./../../models/user');

var objectOneId = new ObjectID();
var objectTwoId = new ObjectID();

const users = [{
	_id: objectOneId,
	email: 'akash@example.com',
	password:'objectOnePass',
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id: objectOneId, access: 'auth'}, 'abc123').toString()
	}]
}, {
	_id: objectTwoId,
	email: 'aks12@example.com',
	password: 'objectTwoPass' 

}];

const todos = [{
	_id: new ObjectID(),
	text: "First test case"
}, {
	_id: new ObjectID(),
	text: "Second test case",
	completed: true,
	completedAt: 456
}];

const populateUsers = (done) => {
	User.remove({}).then(() => {
		var userOne = new User(users[0]).save();
		var userTwo = new User(users[1]).save();
		return Promise.all([userOne, userTwo]);
	}).then(() => done());
};

const populateTodos = (done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => done()); 
};

module.exports = {todos, populateTodos, users, populateUsers};