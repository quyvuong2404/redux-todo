import express from 'express';

import { encodeJWT, decodeJWT } from '../utils/jwt';
import User from '../models/user';

var router = express.Router();

router.post('/user', (req, res) => {
	var email = req.body.email;
	User.findOne({email: email}).lean().exec((err, user) => {
		if (err) {
			res.status(500).send({ error: err });
		}
		if (user) {
			user['id'] = user['_id'];
			delete user['_id'];
            delete user['__v'];
			encodeJWT(user, (err, token) => {
				if (err) {
					res.status(500).send({ error: err });
				}
				res.json({ token: token, profile: user });
			});
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
                encodeJWT(user, (err, token) => {
                	if (err) {
                		res.status(500).send({ error: err });
                	}
                	res.json({ token: token, profile: user });
                });
			});
		}
	});
});

router.get('/user/profile', (req, res) => {
	var token = req.query.token;
    decodeJWT(token, (err, decoded) => {
    	if (err) {
    		if (err.name == "TokenExpiredError") {
    		    encodeJWT(decoded, (err, token) => {
    		    	if (err) {
    		    	    res.status(500).send({ error: err });
    		    	}
    		    	res.json({ token: token, profile: user });
    		    });
    		}
    		res.status(500).send({ error: err })
    	} else {
    		User.findOne({ _id: decoded.id }).exec((err, user) => {
    		    if (err) {
    		        res.status(500).send({ error: err });
    		    }
    		    res.json({ profile: user });
    		});
    	}
    });
});

// router.get('/user/token/refresh', (req, res) => {
//     var token = req.query.token;
//     jwt.verify(token, tokenSecret, (err, decoded) => {
//         let newToken = jwt.sign(decoded, tokenSecret);
//         res.json({ newToken: newToken });
//     });
// });

export default router;