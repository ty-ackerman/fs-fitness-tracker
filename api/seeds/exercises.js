const Exercise = require('../models/Exercise');

const exercises = [];

const exercise1 = new Exercise({
	name: 'bench press',
	primaryMuscle: 'chest',
	secondaryMuscle: 'triceps',
	comments: 'touch chest'
});

exercises.push(exercise1);

const exercise2 = new Exercise({
	name: 'dumbbell curl',
	primaryMuscle: 'biceps'
});

exercises.push(exercise2);

module.exports = exercises;
