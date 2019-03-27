const { Router } = require('express');
const router = Router();
const Week = require('../models/Week');
const { Workout } = require('../models/Workout');

router.get('/', async (req, res, next) => {
	try {
		const docs = await Week.find().populate('days.exercises.exercise').populate('days.exercises.modification');
		res.status(200).send({ data: docs });
	} catch (err) {
		next(err);
	}
});

router.get('/:week_id', async (req, res, next) => {
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

router.post('/', async (req, res, next) => {
	try {
		const { week } = req.body;
		const doc = new Week({ week });
		await doc.save();
		res.status(200).send({ data: [ doc ] });
	} catch (err) {
		next(err);
	}
});

router.patch('/:week_id', async (req, res, next) => {
	try {
		const { days, day, name } = req.body;
		const { week_id } = req.params;
		const newDay = new Workout({ day, name });
		days.push(newDay);
		await Week.findByIdAndUpdate(week_id, { days });
		res.status(200).send({ data: newDay });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
