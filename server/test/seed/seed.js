var {ObjectID} = require('mongodb');
var jwt = require('jsonwebtoken');

var {Todo} = require('./../../models/todo');
var {User} = require('./../../models/user');

var userOneId = new ObjectID();
var userTwoId = new ObjectID();

const users = [{
	_id: userOneId,
	email: 'akash@example.com',
	password:'userOnePass',
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
	}]
}, {
	_id: userTwoId,
	email: 'aks12@example.com',
	password: 'userTwoPass',
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
	}] 

}];

const todos = [{
	_id: new ObjectID(),
	text: "First test case",
	_creator: userOneId
}, {
	_id: new ObjectID(),
	text: "Second test case",
	completed: true,
	completedAt: 456,
	_creator: userTwoId
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