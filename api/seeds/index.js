//Import all models
const Exercise = require('../models/Exercise');
const Modification = require('../models/Modification');
const LoggedExercise = require('../models/LoggedExercise');

//import created seeds
const exercises = require('./exercises');
const modifications = require('./modifications');
const loggedExercises = require('./loggedExercises');

const mongoose = require('mongoose');

//db-name should match that in constants.js
const uri = 'mongodb://localhost:27017/workout-app';

//Deletes existing seeds
const truncateDatabaseExercise = async () => {
	return Promise.all([ Exercise.deleteMany() ]);
};
const truncateDatabaseModification = async () => {
	return Promise.all([ Modification.deleteMany() ]);
};
const truncateDatabaseLoggedExercise = async () => {
	return Promise.all([ LoggedExercise.deleteMany() ]);
};

//
const makeSeeds = async () => {
	//connect to db
	await mongoose.connect(uri);
	//clear dbs
	await truncateDatabaseExercise();
	await truncateDatabaseModification();
	await truncateDatabaseLoggedExercise();
	//iterate through array of seeds and save
	await Promise.all(exercises.map((exercise) => exercise.save()));
	await Promise.all(modifications.map((modification) => modification.save()));
	await Promise.all(loggedExercises.map((loggedExercise) => loggedExercise.save()));
	//this is commented out, but if you just have on seed to save (no array) use this
	// await exercises.save();
	//disconnect from db
	mongoose.connection.close();
};

makeSeeds();
