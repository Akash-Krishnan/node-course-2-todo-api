const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
	id: 10
};

var token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token,'123abc');
console.log(decoded);
// var msg = 'I am user number 3';
// var hash = SHA256(msg).toString();

// console.log('Msg', msg);
// console.log('Hash', hash);

// var data = {
// 	id: 4
// };

// var token = {
// 	data,
// 	hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// var resulthash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// if(resulthash === token.hash) {
// 	console.log('Data not modified');
// } else {
// 	console.log('Data modified!!!');
// }
/*
concept:::> 
create token,
hash & salt it,
send it to user,
get back it from user,
hash & salt to returned token to check authenticity|
*/