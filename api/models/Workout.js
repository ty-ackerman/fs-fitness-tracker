const { model, Schema } = require('mongoose');
const { loggedExerciseSchema } = require('./LoggedExercise');

const workoutSchema = new Schema({
	day: { required: true, type: Number },
	name: { type: String, required: true },
	exercises: [ loggedExerciseSchema ]
});

const Workout = model('Workout', workoutSchema);

module.exports = { Workout, workoutSchema };
