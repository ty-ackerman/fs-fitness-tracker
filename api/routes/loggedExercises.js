const { Router } = require('express');
const router = Router();
const { LoggedExercise } = require('../models/LoggedExercise');

router.get('/', async (req, res, next) => {
	try {
		const docs = await LoggedExercise.find().populate('exercise').populate('modification');
		res.status(200).send({ data: docs });
	} catch (e) {
		next(e);
	}
});

router.get('/:exercise_id', async (req, res, next) => {
	try {
		const { exercise_id } = req.params;
		const docs = await LoggedExercise.findById(exercise_id).populate('exercise').populate('modification');
		res.status(200).send({ data: docs });
	} catch (err) {
		next(err);
	}
});

router.delete('/:exercise_id', async (req, res, next) => {
	try {
		const { exercise_id } = req.params;
		console.log(exercise_id);
		const doc = await LoggedExercise.findByIdAndRemove(exercise_id);
		res.status(200).send({ data: [ doc ] });
	} catch (error) {
		next(error);
	}
});

router.patch('/log-exercise/:exercise_id', async (req, res, next) => {
	try {
		const { reps, weight } = req.body;
		const { exercise_id } = req.params;
		const doc = LoggedExercise.findByIdAndUpdate(exercise_id, { reps, weight });
		res.status(200).send({ data: [ doc ] });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
