const { Schema, model } = require('mongoose');

const loggedExerciseSchema = new Schema({
	setsPlanned: { type: Number, min: 1, required: true },
	repsPlanned: { type: Array, required: true },
	setsActual: { type: Number, min: 1 },
	repsActual: { type: Array },
	exercise: {
		ref: 'Exercise',
		type: Schema.Types.ObjectId,
		required: true
	},
	modification: {
		ref: 'Modification',
		type: Schema.Types.ObjectId,
		required: false
	},
	comments: { type: String },
	tempo: { type: Array },
	rest: { default: 60, type: Number, required: true },
	maxWeight: { type: Number }
});

const LoggedExercise = model('LoggedExercise', loggedExerciseSchema);

module.exports = LoggedExercise;
