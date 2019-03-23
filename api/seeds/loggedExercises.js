const LoggedExercise = require('../models/LoggedExercise');
const exercises = require('./exercises');
const modifications = require('./modifications');

const loggedExercises = [];

const loggedExercise1 = new LoggedExercise({
	exercise: exercises[0],
	sets: 4,
	reps: [ 10, 8, 8, 6 ],
	modification: modifications[1]
});

loggedExercises.push(loggedExercise1);

module.exports = loggedExercises;
