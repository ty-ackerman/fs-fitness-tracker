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

router.get('/:modification_id', async (req, res, next) => {
	try {
		const { modification_id } = req.params;
		const docs = await Modification.findById(modification_id);
		res.status(200).send({ data: docs });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
