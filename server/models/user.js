var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: { type: 'String', required: true, unique: true },
	name: { type: 'String' },
	date_created: { type: 'Date', default: Date.now, required: true },
	type: { type: 'String', required: true }
});

export default mongoose.model('user', userSchema);