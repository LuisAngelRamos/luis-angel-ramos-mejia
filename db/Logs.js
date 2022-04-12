const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Logs = new Schema({
	application_id: { type: Schema.Types.ObjectId, ref: 'aplications' },
	type: { type: String, enum : ['error','info', 'warning'] },
	priority: { type: String, enum : ['lowest','low', 'medium', 'high', 'highest'] },
	path: { type: String },
	message: { type: String },
	request: { type: Schema.Types.Mixed },
	response: { type: Schema.Types.Mixed }
},{
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('logs', Logs);