'use strict';

const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/exercises', require('./routes/loggedExercises').router);

//The routes we will be using - see for routes for an example
//app.use("/tests", require("./routes/tests"))

//When there's a problem, this is called
app.use((err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		const errors = [ { message: 'unauthorized' } ];

		res.status(401).json({ errors });
	}
});

module.exports = app;
