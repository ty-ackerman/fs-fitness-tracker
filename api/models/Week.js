const { Schema, model } = require('mongoose');
const Workout = require('./Workout');

const weekSchema = new Schema({
	week: { type: Number, required: true },
	days: [ Workout ],
	description: { type: String }
});

const Week = model('Week', weekSchema);

module.exports = Week;
