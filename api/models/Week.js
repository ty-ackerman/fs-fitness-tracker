const { Schema, model } = require('mongoose');
const { workoutSchema } = require('./Workout');

const weekSchema = new Schema({
	week: { type: Number, required: true },
	days: [ workoutSchema ],
	description: { type: String }
});

const Week = model('Week', weekSchema);

module.exports = Week;
