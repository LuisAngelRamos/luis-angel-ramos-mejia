const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Authorizations = new Schema({
	application_id: { type: Schema.Types.ObjectId, ref: 'aplications' },
	token: String
},{
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('authorizations', Authorizations);