const { Router } = require('express');
const router = Router();
const { Workout } = require('../models/Workout');

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

module.exports = router;
