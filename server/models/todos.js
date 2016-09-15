var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
	text: { type: 'String', required: true },
	completed: { type: 'Boolean', required: true },
	dateCreated: { type: 'Date', default: Date.now, required: true }
});

export default mongoose.model('todo', todoSchema);