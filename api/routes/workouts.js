const { Router } = require('express');
const router = Router();
const Workout = require('../models/Workout');

router.get('/', async (req, res, next) => {
	try {
		const docs = await Workout.find();
		res.status(200).send({ data: docs });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
