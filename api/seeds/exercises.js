const Exercise = require('../models/Exercise');

const exercises = [];

const exercise1 = new Exercise({
	name: 'Bench Press',
	primaryMuscle: 'Chest',
	secondaryMuscle: 'Triceps',
	comments: 'Touch chest'
});

exercises.push(exercise1);

const exercise2 = new Exercise({
	name: 'Dumbbell Curl',
	primaryMuscle: 'Biceps'
});

exercises.push(exercise2);

module.exports = exercises;
