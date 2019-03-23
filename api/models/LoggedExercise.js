const { Schema, model } = require('mongoose');

const loggedExerciseSchema = new Schema({
	exercise: {
		type: Schema.Types.ObjectId,
		ref: 'Exercise',
		required: true
	},
	sets: { type: Number, min: 1, required: true },
	reps: { type: Array, required: true },
	modification: {
		type: Schema.Types.ObjectId,
		ref: 'Modification',
		required: false
	}
});

LoggedExercise = model('LoggedExercise', loggedExerciseSchema);

module.exports = LoggedExercise;
