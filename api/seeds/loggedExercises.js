const { LoggedExercise } = require('../models/LoggedExercise');
const exercises = require('./exercises');
const modifications = require('./modifications');

const loggedExercises = [];

const loggedExercise1 = new LoggedExercise({
	setsPlanned: 4,
	repsPlanned: [ 8, 2, 2, 2 ],
	setsActual: 0,
	repsActual: [],
	exercise: exercises[0],
	modification: modifications[1],
	comments: 'My goodness that was difficult',
	tempo: '1-0-1-0',
	maxWeight: 100
});

loggedExercises.push(loggedExercise1);

const loggedExercise2 = new LoggedExercise({
	setsPlanned: 4,
	repsPlanned: [ 8, 2, 2, 2 ],
	setsActual: 3,
	repsActual: [ { reps: 20, weight: 40 }, { reps: 18, weight: 75 }, { reps: 16, weight: 80 } ],
	exercise: exercises[1],
	modification: modifications[0],
	comments: 'Personal best',
	tempo: '2-1-3-1',
	maxWeight: 200
});

loggedExercises.push(loggedExercise2);

module.exports = loggedExercises;
