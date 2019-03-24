const { Workout } = require('../models/Workout');
const loggedExercises = require('./loggedExercises');

const workouts = [];

const workout = new Workout({
	day: 1,
	name: 'Full Body Workout',
	exercises: loggedExercises
});

workouts.push(workout);

module.exports = workouts;
