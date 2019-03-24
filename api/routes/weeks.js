const { Router } = require('express');
const router = Router();
const Week = require('../models/Week');

router.get('/', async (req, res, next) => {
	try {
		const docs = await Week.find().populate('days.exercises.exercise').populate('days.exercises.modification');
		res.status(200).send({ data: docs });
	} catch (err) {
		next(err);
	}
});

router.get('/week_id', async (req, res, next) => {
	try {
		const { week_id } = req.params;
		const docs = await Week.findById(week_id)
			.populate('days.exercises.exercise')
			.populate('days.exercises.modification');
		res.status(200).send({ data: docs });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
