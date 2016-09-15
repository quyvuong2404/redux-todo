import express from 'express';
var jwt = require('jsonwebtoken');

import User from '../models/user';

const tokenSecret = 'redux-todo-secret';

var router = express.Router();

router.post('/user', (req, res) => {
	var email = req.body.email;
	User.findOne({email: email}).lean().exec((err, user) => {
		if (err) {
			res.status(500).send({error: err});
		}
		if (user) {
			user['id'] = user['_id'];
			delete user['_id'];
            delete user['__v'];
            var token = jwt.sign(user, tokenSecret);
			res.json({ token: token, profile: user });
		} else {
			var newUser = new User({
				email: email,
				type: req.body.type,
				name: req.body.name
			});
			newUser.save((err, result) => {
				if (err) {
					res.status(500).send({error: err});
				}
				var user = result.toObject();
				user.id = user._id;
				delete user._id;
                var token = jwt.sign(user, tokenSecret);
				res.json({
					profile: user,
					token: token
				});
			});
		}
	});
});

router.get('/user/profile', (req, res) => {
	var token = req.query.token;
    jwt.verify(token, tokenSecret, (jwt_err, decoded) => {
        User.findOne({ _id: decoded.id }).exec((err, user) => {
            if (err) {
                res.status(500).send({ error: err });
            }
            if (jwt_err.name == "TokenExpiredError") {
                let newToken = jwt.sign(decoded, tokenSecret);
                res.json({ profile: user, newToken: newToken });
            } else {
                res.json({ profile: user });
            }
        });
    });
});

router.get('/user/token/refresh', (req, res) => {
    var token = req.query.token;
    jwt.verify(token, tokenSecret, (err, decoded) => {
        let newToken = jwt.sign(decoded, tokenSecret);
        res.json({ newToken: newToken });
    });
})

export default router;