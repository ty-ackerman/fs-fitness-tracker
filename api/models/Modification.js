const { Schema, model } = require('mongoose');

const modificationSchema = new Schema({
	name: { type: String, required: true },
	acronym: { type: String, required: true },
	description: { type: String, required: true }
});

const Modification = model('Modification', modificationSchema);

module.exports = Modification;
