const { Workout } = require('../models/Workout');
const loggedExercises = require('./loggedExercises');

const workouts = [];

const workout = new Workout({
	day: 1,
	name: 'Full Body Workout',
	exercises: loggedExercises
});

workouts.push(workout);

const workout2 = new Workout({
	day: 2,
	name: 'Just the legs',
	exercises: loggedExercises
});

workouts.push(workout2);

module.exports = workouts;
