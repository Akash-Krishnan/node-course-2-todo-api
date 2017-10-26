const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
	if(err) {
		return console.log('Sorry unable to connect');
	}
	console.log('Connection to MongoDB server success!');
		
	// TO get elements from DB
	// db.collection('Todos').find({
	// 	_id : new ObjectID('59f18c58d5c59353d7704a91')
	// }).toArray().then((docs) => {
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// }, (err) => {
	// 	console.log('Error cant get data from to do.', err);
	// })

	//Count elements in DB
	// db.collection('Todos').find().count().then((count) => {
	// 	console.log('Todos count: ', count);
	// }, (err) => {
	// 	console.log('Error cant get data from to do.', err);
	// }) 

	//challenge
	db.collection('Users').find({name: 'Akash'}).toArray().then((docs) => {
		console.log('Users');
		console.log(JSON.stringify(docs, undefined, 2));
	}, (err) => {
		console.log('Sorry cant find documents!!', err);
	});

	//db.close();
});

