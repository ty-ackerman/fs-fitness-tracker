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

router.get('/search/:name', async (req, res, next) => {
	try {
		const {name} = req.params
		console.log(name)
		const docs = await Exercise.find({name: {$regex: name, $options: "i"}})
		res.status(200).send({data: docs})
	} catch (err) {
		next(err)
		
	}
})

router.get('/:exercise_id', async (req, res, next) => {
	try {
		const { exercise_id } = req.params;
		const docs = await Exercise.findById(exercise_id);
		res.status(200).send({ data: docs });
	} catch (error) {
		next(error);
	}
});


router.post('/', async (req, res, next) => {
	try {
		const { name, primaryMuscle, secondaryMuscle, comments } = req.body;
		const newExercise = new Exercise({
			name,
			primaryMuscle,
			secondaryMuscle,
			comments
		});
		await newExercise.save();
		res.status(200).send({ data: newExercise });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
