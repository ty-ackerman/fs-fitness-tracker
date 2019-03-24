const { Router } = require('express');
const router = Router();
const Exercise = require('../models/Exercise');

router.get('/', async (req, res, next) => {
	try {
		const docs = await Exercise.find();
		res.status(200).send({ data: docs });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
