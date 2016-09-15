var express = require('express');
import Todos from '../models/todos';
var router = express.Router();

router.post('/create', (req, res) => {
	var text = req.body.text;
	if (text) {
		const newTodo = new Todos({
			text: text,
			completed: false
		});
		newTodo.save((err, todo) => {
			if (err) {
				res.status(500).send({error: err});
			}
			res.json({ success: true, result: todo})
		});
	} else{
		res.json({ success: false, message: 'text undefined' });
	}
});

router.put('/todo/:id', (req, res) => {
	var id = req.params.id;
	var text = req.body.text;
	if (text) {
		Todos.findOne({_id: id}).exec((err, todo) => {
			if (err) {
				res.status(500).send({error: err});
			}
			todo.text = text;
			todo.save();
			res.json({ success: true, message: 'update successfully' });
		});
	} else {
		res.json({ success: false, message: "text undefined" });
	}
});

router.put('/todo/complete/:id', (req, res) => {
	var id = req.params.id;
	Todos.findOne({_id: id}).exec((err, todo) => {
		if (err) {
			res.status(500).send({error: err});
		}
		todo.completed = !todo.completed;
		todo.save();
		res.json({ success: true, message: 'complete successfully' });
	});
});

router.put('/todos/complete', (req, res) => {
	Todos.update({ completed: false }, { $set: { completed: true } }).exec();
	res.json({ success: true, message: 'complete successfully' });
});

router.get('/todos', (req, res) => {
	Todos.find().sort({dateCreated: -1}).exec((err, todos) => {
		if (err) {
			res.status(500).send({error: err});
		}
		res.json({
			todos: todos.map((todo) => {
				todo = todo.toObject();
				return Object.assign({}, todo, { id: todo._id });
			})
		});
	});
});

router.delete('/todos/completed/clear', (req, res) => {
	Todos.remove({ completed: true}).exec();
	res.json({ success: true, message: "remove successfully" });
});

router.delete('/todo/:id', (req, res) => {
	Todos.findOne({ _id: req.params.id }).exec((err, todo) => {
		if (err) {
			res.status(500).send({error: err});
		}
		todo.remove();
		res.json({success: true, message: "remove successfully"});
	});
});

export default router;