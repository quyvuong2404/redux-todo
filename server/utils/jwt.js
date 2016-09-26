import jwt from 'jsonwebtoken';

const tokenSecret = 'redux-todo-secret';

export function encodeJWT(data, callback){
	jwt.sign(data, tokenSecret, { expiresIn: 3600 }, (err, token) => {
		if (err) {
			callback(err);
		} else {
			callback(null, token);
		}
	});
}

export function decodeJWT(token, callback){
	jwt.verify(token, tokenSecret, (err, decoded) => {
		if (err) {
			callback(err, decoded);
		} else {
			callback(null, decoded);
		}
	});
}