const { model, Schema } = require('mongoose');

const exerciseSchema = new Schema({
	name: { type: String, required: true },
	primaryMuscle: { type: String, required: true },
	secondaryMuscle: { type: String, required: false },
	comements: { type: String, required: false }
});

const Exercise = model('Exercise', exerciseSchema);

module.exports = Exercise;
