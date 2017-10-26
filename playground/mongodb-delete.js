const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
	if(err) {
		return console.log('Sorry unable to connect');
	}
	console.log('Connection to MongoDB server success!');
	
	//deleteMany	
	// db.collection('Users').deleteMany({name: 'Akash'}).then((result) => {
	// 	console.log(result);
	// });

	//deletOne
	// db.collection('Todos').deleteOne({text: 'Have lunch'}).then((result) => {
	// 	console.log(result);
	// });

	//findOneAndDelete
	db.collection('Users').findOneAndDelete({_id: new ObjectID('59f1851437dc7c232881db54')}).then((result) => {
		console.log(result);
	});
	//db.close();
});

