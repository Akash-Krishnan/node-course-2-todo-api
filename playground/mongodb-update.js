const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
	if(err) {
		return console.log('Sorry unable to connect');
	}
	console.log('Connection to MongoDB server success!');
	
	// db.collection('Todos').findOneAndUpdate({
	// 	_id: new ObjectID('59f1c78606857ade32b05625')
	// }, {
	// 	$set: {
	// 		completed: true
	// 	}
	// }, {
	// 	returnOriginal: false
	// }).then((result) => {
	// 	console.log(result);
	// });

	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID('59f0e94e0820c52514eaf486')
	}, {
		$set: {
			name: 'Akash'
		},
		$inc: {
			age: 1
		}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	})
	
	//db.close();
});

