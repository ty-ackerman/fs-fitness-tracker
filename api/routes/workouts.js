const { Router } = require('express');
const router = Router();
const { Workout } = require('../models/Workout');
const { LoggedExercise } = require('../models/LoggedExercise');

router.get('/', async (req, res, next) => {
	try {
		const docs = await Workout.find().populate('exercises.exercise').populate('exercises.modification');
		res.status(200).send({ data: docs });
	} catch (err) {
		next(err);
	}
});

router.get('/:workout_id', async (req, res, next) => {
	try {
		const { workout_id } = req.params;
		const docs = await Workout.findById(workout_id)
			.populate('exercises.exercise')
			.populate('exercises.modification');
		res.status(200).send({ data: docs });
	} catch (err) {
		next(err);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const { day, name, _id } = req.body;
		const doc = new Workout({ day, name, _id });
		await doc.save();
		res.status(200).send({ data: [ doc ] });
		console.log([ doc ]);
	} catch (err) {
		next(err);
	}
});

router.patch('/add-workout/:workout_id', async (req, res, next) => {
	try {
		const { exercises } = req.body;
		const { workout_id } = req.params;
		const doc = await Workout.findByIdAndUpdate(workout_id, { exercises: exercises });
		res.status(200).send({ data: doc });
	} catch (err) {
		next(err);
	}
});

router.patch('/delete-exercise/:workout_id', async (req, res, next) => {
	try {
		const { workout_id } = req.params;
		const { exercises } = req.body;
		const doc = await Workout.findByIdAndUpdate(workout_id, { exercises });
		res.status(200).send({ data: [ doc ] });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
