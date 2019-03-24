const Week = require('../models/Week');
const workouts = require('./workouts');

const weeks = [];

const week1 = new Week({
	week: 1,
	days: workouts
});

weeks.push(week1);

const week2 = new Week({
	week: 2,
	days: workouts
});

weeks.push(week2);

const week3 = new Week({
	week: 3,
	days: workouts
});

weeks.push(week3);

module.exports = weeks;
