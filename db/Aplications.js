const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Aplications = new Schema({
	name: String
},{
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('aplications', Aplications);