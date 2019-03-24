const Workout = require('../models/Workout');
const loggedExercises = require('./loggedExercises');

const workout = new Workout({
	day: 1,
	name: 'Full Body Workout',
	exercises: loggedExercises
});

module.exports = workout;
