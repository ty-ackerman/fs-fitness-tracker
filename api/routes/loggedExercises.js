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

module.exports = router;
