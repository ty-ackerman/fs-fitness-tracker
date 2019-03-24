const { Router } = require('express');
const router = Router();
const Modification = require('../models/Modification');

router.get('/', async (req, res, next) => {
	try {
		const docs = await Modification.find();
		res.status(200).send({ data: docs });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
