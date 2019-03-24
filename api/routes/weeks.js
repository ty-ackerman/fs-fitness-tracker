const { Router } = require('express');
const router = Router();
const Week = require('../models/Week');

router.get('/', async (req, res, next) => {
	try {
		const docs = await Week.find();
		res.status(200).send({ data: docs });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
