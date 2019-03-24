const { model, Schema } = require('mongoose');

const workoutSchema = new Schema({
	day: { required: true, type: Number },
	name: { type: String, required: true },
	exercises: {
		type: Array,
		required: true
	}
});

const Workout = model('Workout', workoutSchema);

module.exports = Workout;
