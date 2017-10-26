//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var Obj = new ObjectID();
console.log(Obj);
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
	if(err) {
		return console.log('Sorry unable to connect');
	}
	console.log('Connection to MongoDB server success!');
	
	// db.collection('Todos').insertOne({
	// 	text: 'Something to do',
	// 	completed: false
	// }, (err, result) => {
	// 	if(err)
	// 		return console.log('Unable to insert todo ', err);

	// 	console.log(JSON.stringify(result.ops, undefined, 2));
	// });

	// db.collection('Users').insertOne({
	// 	name: 'Akash',
	// 	age: 23,
	// 	location: 'India'
	// }, (err, result) => {
	// 	if(err)
	// 		return console.log('Unable to insert Users ',err)

	// 	console.log(result.ops[0]._id.getTimestamp());
	// });



	db.close();
});
